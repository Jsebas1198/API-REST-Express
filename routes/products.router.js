const express = require('express');
const productsService = require('./../services/product.services');
// const { faker } = require('@faker-js/faker');
const router = express.Router();
const service = new productsService();

//We are going to mange evething on services folder like this

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//instead of this

// router.get('/', (req, res) => {
//   const { size } = req.query;
//   const limit = size || 10;
//   const products = [];
//   for (let i = 0; i < limit; i++) {
//     products.push({
//       name: faker.name.findName(),
//       price: parseInt(faker.finance.amount(), 10),
//       image: faker.image.abstract(),
//     });
//   }
//   res.json(products);
// });

//especific goes before dinamic
router.get('/filter', (req, res) => {
  res.send('soy un endpoint especifico');
});

//this is dinamic
//we  are going to use next parameter to use the next error middleware
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (err) {
    //here we use the error middleware
    next(err);
  }

  // if (id === '999') {
  //   res.status(404).send('Error 404');
  // } else {
  //   res.status(200).json({
  //     id,
  //     name: 'Product 1',
  //     price: 10,
  //   });
  // }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.json(newProduct);
  // res.status(201).json({
  //   message: 'created',
  //   data: body,
  // });
});

//for documentation convention, patch will be the one that updates an specific field of the object
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (err) {
    // res.status(404).json({ error: err.message });
    next(err);
  }

  //   {
  //   message: 'update',
  //   data: body,
  //   id,
  // });
});

//delete will eliminate the object
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const productDelete = await service.delete(id);
  res.json(productDelete);
  //   {
  //   message: 'delete',
  //   id,
  // });
});
module.exports = router;
