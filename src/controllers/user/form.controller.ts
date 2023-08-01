import {Controller, Get, Param, UseGuards,} from '@nestjs/common';
import {FormService} from '../../services/form.service';
import {Form} from '../../schemas/form/form.schema';
import {ParseObjectIdPipe} from "@app/common/pipes/parse-objectId.pipe";
import {ProtectGuard} from "@app/common/guards/protect.guard";

@Controller()
@UseGuards(ProtectGuard)
export class FormController {

    constructor(private service: FormService) {
    }

    @Get('form')
    async getAllActive(): Promise<Form[]> {
        return this.service.findAllActive();
    }

    @Get('form/:id')
    async getActiveById(@Param('id', ParseObjectIdPipe) id: string): Promise<Form> {
        return await this.service.findActiveById(id);
    }
}
