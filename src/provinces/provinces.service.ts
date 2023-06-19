import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provinces as ProvincesEntity } from 'src/typeorm/Provinces';
import { Repository } from 'typeorm';

@Injectable()
export class ProvincesService {
    constructor(
        @InjectRepository(ProvincesEntity)
        private readonly provincesRepository: Repository<ProvincesEntity>,
    ) {}

    async fetchAllProvinces() {
        return this.provincesRepository.find();
    }

    async sendProvince(province: ProvincesEntity) {
        const data = await this.provincesRepository.create({
          ...province
        });
    
        return await this.provincesRepository.save(data);
    }

    async findOne(condition: any) {
        return await this.provincesRepository.findOneBy(condition);
    }

    async updateProvince(province: ProvincesEntity, data: ProvincesEntity) {
        const dataId = data.id;
        delete data.id;
        const updatedProvince = {
          ...province
        };
    
        return await this.provincesRepository.update(
          { id: dataId },
          { ...updatedProvince },
        );
    }
    
    async removeOne(condition: any) {
        return await this.provincesRepository.delete(condition);
    }
}
