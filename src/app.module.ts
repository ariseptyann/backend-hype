import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ProvincesModule } from './provinces/provinces.module';
import { CitysModule } from './citys/citys.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ProvincesModule, 
    CitysModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
