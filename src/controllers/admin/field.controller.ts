import {Body, Controller, Delete, Param, Post, Put, UseGuards,} from '@nestjs/common';
import {FormService} from '../../services/form.service';
import {CreateFieldDto} from '../../dto/create-field.dto';
import {Form} from '../../schemas/form/form.schema';
import {ParseObjectIdPipe} from "@app/common/pipes/parse-objectId.pipe";
import {ProtectGuard} from "@app/common/guards/protect.guard";

@Controller("admin/form/:formId/fields/")
@UseGuards(ProtectGuard)
export class FieldController {

    constructor(private service: FormService) {
    }

    @Post()
    async addField(@Body() createDto: CreateFieldDto,
                   @Param('formId', ParseObjectIdPipe) id: string): Promise<Form> {
        return await this.service.addField(id, createDto);
    }

    @Delete(':fieldId')
    async deleteField(@Param('formId', ParseObjectIdPipe) formId: string,
                      @Param('fieldId', ParseObjectIdPipe) fieldId: string): Promise<Form> {
        return await this.service.deleteFieldById(formId, fieldId);

    }

    @Put(':fieldId')
    async updateField(@Body() updateFieldDto: CreateFieldDto,
                      @Param('formId', ParseObjectIdPipe) formId: string,
                      @Param('fieldId', ParseObjectIdPipe) fieldId: string): Promise<Form> {
        return await this.service.updateAdvancedFieldById(formId, fieldId, updateFieldDto);
    }
}
