import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Citys as CitysEntity } from 'src/typeorm/Citys';
import { Provinces as ProvincesEntity } from 'src/typeorm/Provinces';
import { CitysController } from './citys.controller';
import { CitysService } from './citys.service';

@Module({
  imports: [TypeOrmModule.forFeature([CitysEntity, ProvincesEntity])],
  controllers: [CitysController],
  providers: [CitysService]
})
export class CitysModule {}
