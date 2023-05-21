class BaseService {
    model;

    constructor(model){
        this.model = model;
    }

    async list(page, limit, where, order, attributes, include, group){
        let offset;
        if(page && limit){
            offset = (page-1)*limit;
        }
        return await this.model.findAndCountAll({
            include,
            where,
            order,
            attributes,
            offset,
            limit,
            group
        })
    }

    async findOne(where, attributes, include){
        return await this.model.findOne({
            include,
            where, 
            attributes
        })
    }

    async getById(id, attributes, include){
        return await this.model.findByPk(id, {attributes, include});
    }

    async create(data){
        return await this.model.create(data);
    }

    async bulkCreate(data){
        return await this.model.bulkCreate(data);
    }

    async update(id, data){
        await this.model.update(data, {
            where:{
                id
            }
        })
        return this.getById(id);
    }

    async updateMany(data, where){
        return await this.model.update(data, {
            where
        })
    }

    async delete(id){
        return await this.model.destroy({
            where: {
                id: id
            }
        })
    }

    async deleteMany(where){
        return await this.model.destroy({
            where
        })
    }

    async createOrUpdate(data){
        let response;
        if(!data.id){
            response = await this.create(data);
        }else{
            response = await this.update(data.id, data);
        }
        return response;
    }
}

module.exports = BaseService;