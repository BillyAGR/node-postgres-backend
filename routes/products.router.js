const express = require('express');
const ProductsService = require('./../services/products.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('./../schemas/product.schemas')

const router = express.Router();
const service = new ProductsService();

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  });

/*  all specific routes must be before dynamic routes */
router.get('/filter', async (req, res) => {
  res.send('I am a filter');
});

/* dynamic router */
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      if (id === '999') {
        res.status(404).json([
          {
            message: 'Not found'
          }
        ]);
      } else {
        const Product = await service.findOne(id);
        res.json(Product);
      }

    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json({
      message: 'created',
      data: newProduct
    });
  });

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);

      res.json({
        message: 'update',
        data: product,
        id,
      });

    } catch (error) {
      next(error);
    }
  });

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rptId = await service.delete(id);
  res.json({
    message: 'delete',
    rptId,
  });
});


module.exports = router;
