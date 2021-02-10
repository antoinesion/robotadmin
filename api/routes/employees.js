const router = require('express').Router();
const Employee = require('../../models/Employee');
const employeeValidator = require('../../validators/employeeValidator');
const { loginRequired } = require('../../middleware/authMiddleware');
const { io } = require('../../server/io');

// FETCH
router.get('/fetch', [loginRequired], async (req, res) => {
  const employees = await Employee.find({});
  res.send(
    employees.map((employee) => {
      return {
        _id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        id: employee.id,
      };
    })
  );
});

// REGISTER
router.post('/register', [loginRequired], async (req, res) => {
  // validate register data
  const { error } = employeeValidator(req.body);
  if (error) {
    return res.status(400).send({
      path: error.details[0].path,
      message: error.details[0].message,
    });
  }

  // checking if the ID already exists
  const idExists = await Employee.findOne({
    id: req.body.id,
  });
  if (idExists) {
    return res.status(400).send({ path: ['id'], message: 'ID already exists' });
  }

  // create new employee
  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    id: req.body.id,
  });
  try {
    // save new employee
    await employee.save();
    return res.status(200).send('Employee has been created');
  } catch (err) {
    return res.status(500).send({ path: [], message: err.message });
  }
});

// MODIFY
router.put('/modify', [loginRequired], async (req, res) => {
  try {
    const employee = await Employee.findById(req.body._id);
    if (employee) {
      for (const [key, value] of Object.entries(req.body)) {
        if (!key.includes('_')) {
          if (key in employee) {
            employee[key] = value;
          }
        }
      }

      const { error } = employeeValidator({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        id: employee.id,
      });
      if (error) {
        return res.status(400).send({
          path: error.details[0].path,
          message: error.details[0].message,
        });
      }

      await employee.save();
      return res.status(200).send('Employee has been updated.');
    } else {
      return res
        .status(404)
        .send({ path: '_id', message: 'Wrong employee _id' });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

// DELETE
router.delete('/delete', [loginRequired], async (req, res) => {
  try {
    const employee = await Employee.findById(req.body._id);
    if (employee) {
      await employee.remove();
      return res.status(200).send('Employee has been deleted');
    } else {
      return res
        .status(404)
        .send({ path: '_id', message: 'Wrong employee _id' });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

// VERIFY
router.post('/verify', async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  if (!id) {
    return res
      .status(400)
      .send({ path: ['id'], message: 'Employee id is missing' });
  }

  try {
    const employee = await Employee.findOne({ id: req.body.id });
    console.log(employee);
    if (employee) {
      console.log('identified');
      io.emit('identified');
      return res.status(200).send({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
      });
    } else {
      return res.status(404).send({ path: 'id', message: 'Wrong employee id' });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
