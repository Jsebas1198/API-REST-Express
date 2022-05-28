const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();
router.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const products = [];
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.name.findName(),
      price: parseInt(faker.finance.amount(), 10),
      image: faker.image.abstract(),
    });
  }
  res.json(products);
});
//todo lo que sea especifico va antes de los dinamico
router.get('/filter', (req, res) => {
  res.send('soy un endpoint especifico');
});
//esto es dinamico
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 1',
    price: 10,
  });
});

module.exports = router;
