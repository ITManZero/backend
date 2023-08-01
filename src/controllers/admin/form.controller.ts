import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards,} from '@nestjs/common';
import {FormService} from '../../services/form.service';
import {CreateFormDto} from '../../dto/create-form.dto';
import {Form} from '../../schemas/form/form.schema';
import {ProtectGuard} from "@app/common/guards/protect.guard";
import {ParseObjectIdPipe} from "@app/common/pipes/parse-objectId.pipe";

@Controller("admin")
@UseGuards(ProtectGuard)
export class FormController {

    constructor(private service: FormService) {
    }

    @Get('form')
    async getAll(@Query('ids') ids: string): Promise<Form[]> {
        if (ids != null && ids.length > 0) {
            const idsArray = ids.split(',');
            return this.service.findAllByIds(idsArray);
        }
        return this.service.findAll();
    }

    @Get('form/:id')
    async getById(@Param('id', ParseObjectIdPipe) id: string): Promise<Form> {
        return await this.service.findById(id);
    }

    @Post('form')
    async create(@Body() createDto: CreateFormDto): Promise<Form> {
        return await this.service.create(createDto);
    }

    @Put('form/:id')
    async updateById(@Body() updateDto: any, @Param('id', ParseObjectIdPipe) id: string): Promise<Form> {
        return await this.service.updateById(updateDto, id);
    }

    @Delete('form/:id')
    async deleteById(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
        await this.service.deleteById(id);
    }
}
