const express = require('express');
const router = express.Router();

router.get('/categories', (req, res) => {
  res.send('Hello World!');
});

router.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

module.exports = router;
