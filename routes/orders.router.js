const express = require('express');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');

const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

/**
 * Async wrapper
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Get order by id
 */
router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),

  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const order = await service.findOne(id);

    res.json(order);
  })
);

/**
 * Create order
 */
router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),

  asyncHandler(async (req, res) => {
    const newOrder = await service.create(req.body);

    res.status(201).json(newOrder);
  })
);

/**
 * Add item to order
 */
router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),

  asyncHandler(async (req, res) => {
    const newItem = await service.addItem(req.body);

    res.status(201).json(newItem);
  })
);

module.exports = router;
