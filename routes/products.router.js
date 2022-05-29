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
  if (id === '999') {
    res.status(404).send('Error 404');
  } else {
    res.status(200).json({
      id,
      name: 'Product 1',
      price: 10,
    });
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body,
  });
});
//for domentation convention patch will be the one that updates an specific field of the object
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});

//delete will eliminate the object
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'delete',
    id,
  });
});
module.exports = router;
