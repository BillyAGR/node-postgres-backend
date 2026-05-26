const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class CategoryService {
  constructor() {
    this.model = models.Category;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async find() {
    return await this.model.findAll();
  }

  async findOne(id) {
    const category = await this._getById(id);
    return category;
  }

  async update(id, changes) {
    const category = await this._getById(id);
    await category.update(changes);
    return category;
  }

  async _getById(id) {
    const category = await this.model.findByPk(id, {
      include: ['products'],
    });

    if (!category) {
      throw boom.notFound('Category not found');
    }

    return category;
  }
}

module.exports = CategoryService;
