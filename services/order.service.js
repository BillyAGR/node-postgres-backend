const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor() {
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    return [];
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: ['user'],
      },
        'items'
      ]
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, changes) {
    const order = await models.Order.findByPk(id);
    if (!order) {
      throw boom.notFound('Order not found');
    }
    const updatedOrder = await order.update(changes);
    return updatedOrder;
  }

  async delete(id) {
    const order = await models.Order.findByPk(id);
    if (!order) {
      throw boom.notFound('Order not found');
    }
    await order.destroy();
    return { id };
  }
}

module.exports = OrderService;
