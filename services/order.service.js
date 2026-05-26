const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {
    this.model = models.Order;
    this.orderProductModel = models.OrderProduct;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async addItem(data) {
    return await this.orderProductModel.create(data);
  }

  async find() {
    return await this.model.findAll({
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
  }

  async findOne(id) {
    const order = await this._getById(id);
    return order;
  }

  async update(id, changes) {
    const order = await this._getById(id);
    await order.update(changes);
    return order;
  }

  async delete(id) {
    const order = await this._getById(id);
    await order.destroy();

    return { id, deleted: true };
  }

  async _getById(id) {
    const order = await this.model.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });

    if (!order) {
      throw boom.notFound('Order not found');
    }

    return order;
  }
}

module.exports = OrderService;
