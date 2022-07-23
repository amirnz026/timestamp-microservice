const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

router.get('/:date', (req, res) => {
  const str = req.params.date;

  const unixRegex = /\b\d{13}\b/;
  const dateRegex = /\b\d{4}-\d{2}\-\d{2}\b/;

  const unixIsValid = String(str).match(unixRegex);
  const dateIsValid = String(str).match(dateRegex);

  if (unixIsValid) {
    res.json({
      unix: new Date(Number(req.params.date)).getTime(),
      utc: new Date(Number(req.params.date)).toUTCString(),
    });
  } else if (dateIsValid) {
    res.json({
      unix: new Date(String(req.params.date)).getTime(),
      utc: new Date(String(req.params.date)).toUTCString(),
    });
  } else {
    res.json({
      error: 'Invalid Date',
    });
  }
});

module.exports = router;
