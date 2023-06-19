import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Citys as CitysEntity } from 'src/typeorm/Citys';
import { ProvincesService } from "src/provinces/provinces.service";

@Injectable()
export class CitysService {
    constructor(
        @InjectRepository(CitysEntity)
        private readonly CitysRepo: Repository<CitysEntity>
    ) {}

    async getCitys() {
        const citys = await this.CitysRepo.find({ relations: ['provinces'] });
    
        return citys;
    }

    async createCity(body: CitysEntity) {
        const newCity = {
            name: body.name,
            province: body.province
        }

        return await this.CitysRepo.save(newCity);
    }

    async getOneCityById(id: string) {
        const city = await this.CitysRepo.createQueryBuilder('citys')
          .leftJoinAndSelect('citys.province', 'province')
          .where('citys.id = :cityId', { cityId: id })
          .getOne();
    
        return city;
    }

    async findOne(condition: any) {
        return await this.CitysRepo.findOneBy(condition);
    }

    async updateCity(body: CitysEntity, data: CitysEntity) {
        const dataId = data.id;
        delete data.id;
        const updatedCity = {
            name: body.name,
            province: body.province
        };
    
        return await this.CitysRepo.update(
          { id: dataId },
          { ...updatedCity },
        );
    }

    async removeOne(condition: any) {
        return await this.CitysRepo.delete(condition);
    }
}
