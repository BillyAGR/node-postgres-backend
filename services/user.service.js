const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UserService {
  constructor() {
    this.model = models.User;
  }

  async create(data) {
    const exists = await this.model.findOne({
      where: { email: data.email },
    });

    if (exists) {
      throw boom.conflict('The email is already registered.');
    }

    return await this.model.create(data);
  }

  async find() {
    return await this.model.findAll({
      include: ['customer'],
    });
  }

  async findOne(id) {
    return await this._getById(id);
  }

  async update(id, changes) {
    const user = await this._getById(id);
    await user.update(changes);
    return user;
  }

  async delete(id) {
    const user = await this._getById(id);
    await user.destroy();

    return { id, deleted: true };
  }

  async _getById(id) {
    const user = await this.model.findByPk(id, {
      include: ['customer'],
    });

    if (!user) {
      throw boom.notFound('User not found');
    }

    return user;
  }
}

module.exports = UserService;
