const express = require('express');

const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');

const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('../schemas/product.schemas');

const router = express.Router();
const service = new ProductsService();

/**
 * Async wrapper
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Get all products
 */
router.get(
  '/',
  validatorHandler(queryProductSchema, 'query'),

  asyncHandler(async (req, res) => {
    const products = await service.find(req.query);

    res.json(products);
  })
);

/**
 * Static routes
 * Must be declared before dynamic routes
 */
router.get('/filter', (req, res) => {
  res.json({
    message: 'Filter route',
  });
});

/**
 * Get product by id
 */
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),

  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await service.findOne(id);

    res.json(product);
  })
);

/**
 * Create product
 */
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),

  asyncHandler(async (req, res) => {
    const newProduct = await service.create(req.body);

    res.status(201).json(newProduct);
  })
);

/**
 * Update product
 */
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),

  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const updatedProduct = await service.update(id, req.body);

    res.json(updatedProduct);
  })
);

/**
 * Delete product
 */
router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),

  asyncHandler(async (req, res) => {
    const { id } = req.params;

    await service.delete(id);

    res.status(204).send();
  })
);

module.exports = router;
