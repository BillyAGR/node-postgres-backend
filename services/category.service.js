const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CategoryService {
    constructor() {

    }
    async create(data) {
        const newCategory = await models.Category.create(data);
        return newCategory;
    }

    async find() {
        const categories = await models.Category.findAll();
        return categories;
    }

    async findOne(id) {
        const category = await models.Category.findByPk(id, {
            include: ['products']
        });
        if (!category) {
            throw boom.notFound('Category not found');
        }
        return category;
    }

    async update (id, changes) {
        const category = await models.Category.findByPk(id);
        if (!category) {
            throw boom.notFound('Category not found');
        }
        await category.update(changes);
        return category;
    }
}

module.exports = CategoryService;
