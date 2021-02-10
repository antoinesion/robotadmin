const router = require('express').Router();
const Log = require('../../models/Log');
const { loginRequired } = require('../../middleware/authMiddleware');

// FETCH
router.get('/fetch', [loginRequired], async (req, res) => {
  const logs = await Log.find({}).sort('-date');
  res.send(
    logs.map((log) => {
      return {
        _id: log._id,
        content: log.content,
        type: log.type,
        date: log.date,
      };
    })
  );
});

module.exports = router;
