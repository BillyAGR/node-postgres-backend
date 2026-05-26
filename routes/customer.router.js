const express = require('express');

const CustomerService = require('../services/customers.service');
const validationHandler = require('../middlewares/validator.handler');

const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

/**
 * Async wrapper
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Get all customers
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const customers = await service.find();

    res.json(customers);
  })
);

/**
 * Create customer
 */
router.post(
  '/',
  validationHandler(createCustomerSchema, 'body'),

  asyncHandler(async (req, res) => {
    const newCustomer = await service.create(req.body);

    res.status(201).json(newCustomer);
  })
);

/**
 * Update customer
 */
router.patch(
  '/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),

  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const updatedCustomer = await service.update(id, req.body);

    res.json(updatedCustomer);
  })
);

/**
 * Delete customer
 */
router.delete(
  '/:id',
  validationHandler(getCustomerSchema, 'params'),

  asyncHandler(async (req, res) => {
    const { id } = req.params;

    await service.delete(id);

    res.status(204).send();
  })
);

module.exports = router;
