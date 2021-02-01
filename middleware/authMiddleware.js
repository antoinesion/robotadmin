const AdminUser = require('../models/AdminUser');
const jwt = require('jsonwebtoken');

const loginRequired = async (req, res, next) => {
  // check if an bearer token is provided
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).send({ message: 'Login required' });
  }

  try {
    // get the access token
    const accessToken = bearerToken.split(' ')[1];

    // check if the access token is valid
    const userID = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)._id;

    // get the corresponding user
    const user = await AdminUser.findById(userID);

    // send user information
    req.user = {
      _id: user._id,
      username: user.username,
      scope: user.scope,
    };

    next();
  } catch (err) {
    res.status(401).send({ message: 'Invalid access token' });
  }
};

const adminRequired = (req, res, next) => {
  if (req.user.scope != 'admin')
    return res
      .status(403)
      .send({ message: 'You must be an admin to perform this action' });
  next();
};

module.exports = { loginRequired, adminRequired };
