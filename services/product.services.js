const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
class productsService {
  constructor() {
    this.products = [];
    this.generate();
  }
  async generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        price: parseInt(faker.finance.amount(), 10),
        image: faker.image.abstract(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 2000);
    });
  }
  async findOne(id) {
    // const total = this.getTotal(); this was use to test the error middleware
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.forbidden('Product is blocked');
    }
    return product;
  }
  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      // throw new Error('Product not found');   instead of throwing an error like this
      //we use boom library to create a custom error
      throw boom.notFound('Product not found');
    }
    // this.products[index] = changes; this cahnges all the product
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }
  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      // throw new Error('Product not found');
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = productsService;
