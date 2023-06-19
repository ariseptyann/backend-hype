import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { Provinces as ProvincesEntity } from 'src/typeorm/Provinces';

@Controller('provinces')
export class ProvincesController {
    constructor(private readonly provincesService: ProvincesService) {}

    @Get()
    async getAllProvinces() {
        const provinces = await this.provincesService.fetchAllProvinces();

        return provinces;
    }

    @Post('send')
    async sendProvince(@Body() province: ProvincesEntity) {
      return await this.provincesService.sendProvince(province);
    }

    @Get('single/:id')
    async fetchById(@Param('id') id: string) {
        const province = await this.provincesService.findOne({ id });
    
        if (!province) {
          throw new BadRequestException([`Province with id: ${id} is not found`]);
        }
    
        return province;
    }

    @Put('update/:id')
    async updateProvince(@Param('id') id: string, @Body() province: ProvincesEntity) {
      /* If province found */
      const data = await this.provincesService.findOne({ id });
      if (!data) {
        throw new BadRequestException([`Province with id: ${id} not found`]);
      }

      await this.provincesService.updateProvince(province, data);

      return { message: 'Province Updated', status: HttpStatus.OK };
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string) {
        const province = await this.provincesService.findOne({ id });
    
        if (!province) {
          throw new BadRequestException(
            `Province with id: ${id} is not found`,
          );
        }
    
        await this.provincesService.removeOne(id);
    
        return { message: 'Delete success', status: HttpStatus.OK };
    }
}
