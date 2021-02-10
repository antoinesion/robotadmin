const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const AdminUser = require('../models/AdminUser');

dotenv.config();

// connect to database
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to database');
    const superAdmins = await AdminUser.find({ scope: 'admin' });
    if (superAdmins.length == 0) {
      console.log('No super admin found, creating one');
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password', salt);

      // create new admin user
      const adminUser = new AdminUser({
        username: 'admin',
        password: hashedPassword,
        scope: ['admin', 'super-admin'],
      });
      try {
        // save new admin user
        await adminUser.save();
        console.log(
          'Successfully created user:\n  username: admin\n  password: password'
        );
      } catch (err) {
        console.log(`Something went wrong:\n${err}`);
      }
    }
  })
  .catch((err) => console.log(`Something went wrong:\n${err}`));

// middleware
app.use(express.json());

// routes
const auth = require('./routes/auth');
app.use('/auth', auth);
const logs = require('./routes/logs');
app.use('/logs', logs);
const adminUsers = require('./routes/users');
app.use('/admin-users', adminUsers);
const employees = require('./routes/employees');
app.use('/employees', employees);

module.exports = app;
