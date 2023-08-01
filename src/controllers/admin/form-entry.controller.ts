import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {FormEntryService} from "../../services/form-entry.service";
import {FormEntry} from "../../schemas/form/form-entry.schema";
import {ParseObjectIdPipe} from "@app/common/pipes/parse-objectId.pipe";
import {ProtectGuard} from "@app/common/guards/protect.guard";

@Controller("admin/form")
@UseGuards(ProtectGuard)
export class FormEntryController {

    constructor(private service: FormEntryService) {
    }

    @Get(':id/entry')
    async getAllFormEntries(@Param('id', ParseObjectIdPipe) id: string): Promise<FormEntry[]> {
        return this.service.findAllByFormId(id);
    }

    @Get(':id/entry/:entryId')
    async getFormEntry(@Param('id', ParseObjectIdPipe) id: string,
                       @Param('entryId', ParseObjectIdPipe) entryId: string): Promise<FormEntry> {
        return this.service.findById(id, entryId);
    }

    // @Delete(':id/entry/:entryId')
    // async deleteById(@Param('id', ParseObjectIdPipe) id: string,
    //                  @Param('entryId', ParseObjectIdPipe) entryId: string): Promise<void> {
    //     await this.service.deleteById(id, entryId);
    // }
}
