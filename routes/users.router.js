const express = require('express');
const router = express.Router();
//http://localhost:3000/users/?limit=10&offset=90
router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({ limit, offset });
  } else {
    res.send('No limit and offset');
  }
});
module.exports = router;
