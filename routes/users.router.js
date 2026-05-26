const express = require('express');

const UserService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');

const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
} = require('../schemas/user.schema');

const router = express.Router();
const service = new UserService();

/**
 * Async wrapper
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Get all users
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await service.find();

    res.json(users);
  })
);

/**
 * Get user by id
 */
router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),

  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await service.findOne(id);

    res.json(user);
  })
);

/**
 * Create user
 */
router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),

  asyncHandler(async (req, res) => {
    const newUser = await service.create(req.body);

    res.status(201).json(newUser);
  })
);

/**
 * Update user
 */
router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),

  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const updatedUser = await service.update(id, req.body);

    res.json(updatedUser);
  })
);

/**
 * Delete user
 */
router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),

  asyncHandler(async (req, res) => {
    const { id } = req.params;

    await service.delete(id);

    res.status(204).send();
  })
);

module.exports = router;
