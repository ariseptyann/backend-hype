import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CitysService } from './citys.service';
import { Citys as CitysEntity } from 'src/typeorm/Citys';

@Controller('citys')
export class CitysController {
    constructor(private readonly citysService: CitysService) {}

    @Get()
    async getCitys() {
        return await this.citysService.getCitys();
    }

    @Post('send')
    async createCity(@Body() body) {
        return await this.citysService.createCity(body);
    }

    @Get('single/:id')
    async getOneCityById(@Param('id') id: string) {
        return await this.citysService.getOneCityById(id);
    }

    @Put('update/:id')
    async updateCity(@Param('id') id: string, @Body() body) {
      /* If city found */
      const data = await this.citysService.findOne({ id });
      if (!data) {
        throw new BadRequestException([`City with id: ${id} not found`]);
      }

      await this.citysService.updateCity(body, data);

      return { message: 'City Updated', status: HttpStatus.OK };
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string) {
        const city = await this.citysService.findOne({ id });
    
        if (!city) {
          throw new BadRequestException(
            `City with id: ${id} is not found`,
          );
        }
    
        await this.citysService.removeOne(id);
    
        return { message: 'Delete success', status: HttpStatus.OK };
    }
}
