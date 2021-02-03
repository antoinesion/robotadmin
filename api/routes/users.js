const router = require('express').Router();
const bcrypt = require('bcrypt');
const AdminUser = require('../../models/AdminUser');
const registerValidator = require('../../validators/registerValidator');
const {
  loginRequired,
  adminRequired,
} = require('../../middleware/authMiddleware');

router.use([loginRequired, adminRequired]);

// FETCH
router.get('/fetch', async (req, res) => {
  const adminUsers = await AdminUser.find({});
  res.send(
    adminUsers.map((user) => {
      return {
        _id: user._id,
        username: user.username,
        isSuperAdmin: user.scope.includes('super-admin'),
      };
    })
  );
});

// REGISTER
router.post('/register', async (req, res) => {
  console.log(req.body);
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
    scope: req.body.isSuperAdmin ? ['admin', 'super-admin'] : ['admin'],
  });
  try {
    // save new admin user
    await adminUser.save();
    return res.status(200).send('Admin user has been created');
  } catch (err) {
    console.error(err);
    return res.status(500).send({ path: [], message: err.message });
  }
});

// MODIFY
router.put('/modify', async (req, res) => {
  try {
    const user = await AdminUser.findById(req.body._id);
    if (user) {
      if ('isSuperAdmin' in req.body) {
        user.scope = req.body.isSuperAdmin
          ? ['admin', 'super-admin']
          : ['admin'];
        await user.save();
        return res.status(200).send('Admin user has been updated');
      } else {
        return res.status(400).send({
          path: 'isSuperAdmin',
          message: 'isSuperAdmin field is missing',
        });
      }
    } else {
      return res
        .status(404)
        .send({ path: '_id', message: 'Wrong admin user ID' });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

// DELETE
router.delete('/delete', async (req, res) => {
  try {
    const user = await AdminUser.findById(req.body._id);
    if (user) {
      await user.remove();
      return res.status(200).send('Admin user has been deleted');
    } else {
      return res
        .status(404)
        .send({ path: '_id', message: 'Wrong admin user ID' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = router;
