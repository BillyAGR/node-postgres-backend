const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {
    this.model = models.Customer;
  }

  async find() {
    return await this.model.findAll({
      include: ['user'],
    });
  }

  async findOne(id) {
    const customer = await this.model.findByPk(id, {
      include: ['user'],
    });

    if (!customer) {
      throw boom.notFound('Customer not found');
    }

    return customer;
  }

  async create(data) {
    return await this.model.create(data, {
      include: ['user'],
    });
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    await customer.update(changes);

    return customer;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();

    return { id, deleted: true };
  }
}

module.exports = CustomerService;
