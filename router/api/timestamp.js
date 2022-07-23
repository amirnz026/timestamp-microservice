const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

router.get('/:date', (req, res) => {
  let date_string = req.params.date;

  const unixRegex = /\b\d{13}\b/;
  const dateRegex = /\b\d{4}-\d{2}\-\d{2}\b/;

  const unixIsValid = String(date_string).match(unixRegex);
  const dateIsValid = String(date_string).match(dateRegex);

  if (unixIsValid) {
    date_string = Number(date_string);
    res.json({
      unix: new Date(date_string).getTime(),
      utc: new Date(date_string).toUTCString(),
    });
  } else if (dateIsValid) {
    date_string = String(date_string);
    res.json({
      unix: new Date(date_string).getTime(),
      utc: new Date(date_string).toUTCString(),
    });
  } else {
    res.json({
      error: 'Invalid Date',
    });
  }
});

module.exports = router;
