import {Body, Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {FormEntryService} from "../../services/form-entry.service";
import {FormEntry} from "../../schemas/form/form-entry.schema";
import {CreateFromEntryDto} from "../../dto/create-form-entry.dto";
import {FileValue} from "../../schemas/fields/file-entry.schema";
import {ParseObjectIdPipe} from "@app/common/pipes/parse-objectId.pipe";
import {ProtectGuard} from "@app/common/guards/protect.guard";

@Controller()
@UseGuards(ProtectGuard)
export class FormEntryController {

    constructor(private service: FormEntryService) {
    }

    @Post('form/:id/entry/submit')
    @UseInterceptors(FilesInterceptor('files'))
    async create(@Param('id', ParseObjectIdPipe) id: string,
                 @Body() body: CreateFromEntryDto): Promise<FormEntry> {
        return await this.service.create(body.fields, id);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File): FileValue {
        return this.service.getFileDetails(file);
    }
}
