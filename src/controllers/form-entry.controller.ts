import {Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ParseObjectIdPipe} from '../pipes/object-id.pipe';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {FormEntryService} from "../services/form-entry.service";
import {FormEntry} from "../schemas/form/form-entry.schema";
import {CreateFromEntryDto} from "../dto/create-form-entry.dto";
import {FileValue} from "../schemas/fields/file-entry.schema";

@Controller()
export class FormEntryController {

    constructor(private service: FormEntryService) {
    }

    @Get('admin/form/:id/entry')
    async getAllFormEntries(@Param('id', ParseObjectIdPipe) id: string): Promise<FormEntry[]> {
        return this.service.findAllByFormId(id);
    }

    @Get('admin/form/:id/entry/:entryId')
    async getFormEntry(@Param('id', ParseObjectIdPipe) id: string,
                       @Param('entryId', ParseObjectIdPipe) entryId: string): Promise<FormEntry> {
        return this.service.findById(id, entryId);
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

    // @Delete('admin/form/:id/entry/:entryId')
    // async deleteById(@Param('id', ParseObjectIdPipe) id: string,
    //                  @Param('entryId', ParseObjectIdPipe) entryId: string): Promise<void> {
    //     await this.service.deleteById(id, entryId);
    // }
}
