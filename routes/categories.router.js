const express = require('express');

const CategoryService = require('../services/category.service');
const validationHandler = require('../middlewares/validator.handler');

const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

/**
 * Async wrapper
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Get all categories
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const categories = await service.find();

    res.json(categories);
  })
);

/**
 * Get category by id
 */
router.get(
  '/:id',
  validationHandler(getCategorySchema, 'params'),

  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await service.findOne(id);

    res.json(category);
  })
);

/**
 * Create category
 */
router.post(
  '/',
  validationHandler(createCategorySchema, 'body'),

  asyncHandler(async (req, res) => {
    const newCategory = await service.create(req.body);

    res.status(201).json(newCategory);
  })
);

/**
 * Update category
 */
router.patch(
  '/:id',
  validationHandler(getCategorySchema, 'params'),
  validationHandler(updateCategorySchema, 'body'),

  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const updatedCategory = await service.update(id, req.body);

    res.json(updatedCategory);
  })
);

/**
 * Delete category
 */
router.delete(
  '/:id',
  validationHandler(getCategorySchema, 'params'),

  asyncHandler(async (req, res) => {
    const { id } = req.params;

    await service.delete(id);

    res.status(200).json({ id });
  })
);

module.exports = router;
