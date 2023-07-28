import {Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FormService} from '../services/form.service';
import {CreateFormDto} from '../dto/create-form.dto';
import {CreateFieldDto} from '../dto/create-field.dto';
import {ParseObjectIdPipe} from '../pipes/object-id.pipe';
import {FileInterceptor} from '@nestjs/platform-express';
import {FieldTypes} from '../constants/field.constants';
import {FieldGroupTypes} from '../constants/field-groups.constants';
import {Form} from '../schemas/form/form.schema';

@Controller()
export class FormController {

    constructor(private service: FormService) {
    }

    @Get('admin/form')
    async getAll(@Query('ids') ids: string): Promise<Form[]> {
        if (ids != null && ids.length > 0) {
            const idsArray = ids.split(',');
            return this.service.findAllByIds(idsArray);
        }
        return this.service.findAll();
    }

    @Get('form')
    async getAllActive(): Promise<Form[]> {
        return this.service.findAllActive();
    }

    @Get('form/:id')
    async getById(@Param('id', ParseObjectIdPipe) id: string): Promise<Form> {
        return await this.service.findById(id);
    }

    @Post('form')
    async create(@Body() createDto: CreateFormDto): Promise<Form> {
        return await this.service.create(createDto);
    }

    @Post('form/:id/fields')
    async addField(@Body() createDto: CreateFieldDto,
                   @Param('id', ParseObjectIdPipe) id: string): Promise<Form> {
        return await this.service.addField(id, createDto);
    }

    @Delete('form/:formId/fields/:fieldId')
    async deleteField(@Param('formId', ParseObjectIdPipe) formId: string,
                      @Param('fieldId', ParseObjectIdPipe) fieldId: string): Promise<Form> {
        return await this.service.deleteFieldById(formId, fieldId);
    }

    @Put('form/:formId/fields/:fieldId')
    async updateField(@Body() updateFieldDto: CreateFieldDto,
                      @Param('formId', ParseObjectIdPipe) formId: string,
                      @Param('fieldId', ParseObjectIdPipe) fieldId: string): Promise<Form> {
        return await this.service.updateAdvancedFieldById(formId, fieldId, updateFieldDto);
    }

    @Put('form/:id')
    async updateById(@Body() updateDto: any, @Param('id', ParseObjectIdPipe) id: string): Promise<Form> {
        return await this.service.updateById(updateDto, id);
    }

    @Delete('form/:id')
    async deleteById(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
        await this.service.deleteById(id);
    }

    @Post('form/submit')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: { type: FieldTypes, group: FieldGroupTypes } & any) {
        console.log(file);
        return {filename: file ? file.fieldname : null, body};
    }

}
