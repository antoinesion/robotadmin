const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AdminUser = require('../../models/AdminUser');
const {
  registerValidator,
  loginValidator,
  changePasswordValidator,
} = require('../../validators/authValidators');
const {
  loginRequired,
  adminRequired,
} = require('../../middleware/authMiddleware');

// generate access and refresh tokens
const generateTokens = (userID) => {
  const accessToken = jwt.sign(
    { _id: userID },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRATION_TIME),
    }
  );
  const refreshToken = jwt.sign(
    { _id: userID },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRATION_TIME),
    }
  );
  return { access_token: accessToken, refresh_token: refreshToken };
};

// REGISTER
router.post('/register', [loginRequired, adminRequired], async (req, res) => {
  // validate login data
  const { error } = registerValidator(req.body);
  if (error) {
    return res.status(400).send({
      path: error.details[0].path,
      message: error.details[0].message,
    });
  }

  // checking if the username already exists
  const usernameExists = await AdminUser.findOne({
    username: req.body.username,
  });
  if (usernameExists) {
    return res
      .status(400)
      .send({ path: ['username'], message: 'Username already exists' });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new admin user
  const adminUser = new AdminUser({
    username: req.body.username,
    password: hashedPassword,
    scope: req.body.scope || 'user',
  });
  try {
    // save new admin user
    await adminUser.save();
  } catch (err) {
    res.status(500).send({ path: [], message: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  // validate login data
  const { error } = loginValidator(req.body);
  if (error) {
    return res.status(400).send({
      path: error.details[0].path,
      message: error.details[0].message,
    });
  }

  // checking if the username exists
  const user = await AdminUser.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send({
      path: ['username', 'password'],
      message: 'Your username or password is incorrect',
    });
  }

  // compare passwords
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send({
      path: ['username', 'password'],
      message: 'Your username or password is incorrect',
    });
  }

  // generate access and refresh tokens
  const newTokens = generateTokens(user._id);

  // send tokens
  res.send(newTokens);
});

// REFRESH
router.post('/refresh', async (req, res) => {
  // check if a refresh token is provided
  const refreshToken = req.body.refresh_token;
  if (!refreshToken) {
    return res
      .status(400)
      .send({ path: ['refreshToken'], message: 'Refresh token is missing' });
  }

  try {
    // check is the refresh token is valid
    const userID = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )._id;

    // generate new access and refresh tokens
    const newTokens = generateTokens(userID);

    // send new tokens
    res.send(newTokens);
  } catch (err) {
    return res
      .status(400)
      .send({ path: ['refreshToken'], message: 'Invalid refresh token' });
  }
});

// USER
router.get('/user', loginRequired, async (req, res) => {
  res.send(req.user);
});

// CHANGE PASSWORD
router.post('/change-password', loginRequired, async (req, res) => {
  // validate change password data
  const { error } = changePasswordValidator(req.body);
  if (error) {
    return res.status(400).send({
      path: error.details[0].path,
      message: error.details[0].message,
    });
  }

  // get user in db
  const user = await AdminUser.findById(req.user._id);

  // checking if the current password is correct
  const validPassword = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );
  if (!validPassword) {
    return res.status(400).send({
      path: ['currentPassword'],
      message: 'Current password is incorrect',
    });
  }

  // hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

  // modify password
  user.password = hashedPassword;
  try {
    // save admin user
    await user.save();
    res.status(200).send('Password has been changed');
  } catch (err) {
    res.status(500).send({ path: [], message: err.message });
  }
});

module.exports = router;
