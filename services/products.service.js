const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {
    this.model = models.Product;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async find(query = {}) {
    const options = {
      include: ['category'],
      where: {},
      order: [],
    };

    const limit = query.limit ? Number(query.limit) : undefined;
    const offset = query.offset ? Number(query.offset) : undefined;

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    if (query.price) {
      options.where.price = Number(query.price);
    }

    if (query.price_min && query.price_max) {
      options.where.price = {
        [Op.between]: [Number(query.price_min), Number(query.price_max)],
      };

      options.order.push(['price', 'ASC']);
    }

    return await this.model.findAll(options);
  }

  async findOne(id) {
    const product = await this._getById(id);
    return product;
  }

  async update(id, changes) {
    const product = await this._getById(id);
    await product.update(changes);
    return product;
  }

  async delete(id) {
    const product = await this._getById(id);
    await product.destroy();

    return { id, deleted: true };
  }

  async _getById(id) {
    const product = await this.model.findByPk(id, {
      include: ['category'],
    });

    if (!product) {
      throw boom.notFound('Product not found');
    }

    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }

    return product;
  }
}

module.exports = ProductsService;
