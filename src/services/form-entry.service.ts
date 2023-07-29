import {Injectable, NotFoundException} from '@nestjs/common';
import {Model, Types} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {FormEntry} from "../schemas/form/form-entry.schema";
import {CreateFieldEntryDto} from "../dto/create-field-entry.dto";
import {FileValue} from "../schemas/fields/file-entry.schema";
import {FormService} from "./form.service";
import {Form} from "../schemas/form/form.schema";

@Injectable()
export class FormEntryService {

    constructor(@InjectModel(FormEntry.name) private formModel: Model<FormEntry>,
                private formService: FormService) {
    }

    async findAllByFormId(formId: string): Promise<FormEntry[]> {
        return this.formModel.find({formId: new Types.ObjectId(formId)})
            .select('-fields').lean();
    }


    public async findById(id: string, entryId: string): Promise<FormEntry> {
        const document = await this.formModel
            .find({_id: entryId, formId: id})
            .populate('fields')
            .lean();
        if (document.length == 0)
            throw new NotFoundException('entry not found !');
        return document[0];
    }

    private async findDocById(id: string): Promise<FormEntry> {
        const document = await this.formModel
            .findById(id)
            .populate('fields');
        if (!document)
            throw new NotFoundException('form not found !');
        return document;
    }

    async create(fields: CreateFieldEntryDto[], formId: string): Promise<FormEntry> {
        const form: Form = await this.formService.findById(formId);
        const formEntry = new this.formModel({
            formId,
            name: form.name,
            description: form.description,
            fields
        });
        return await formEntry.save();
    }

    getFileDetails(file: Express.Multer.File): FileValue {
        const value = new FileValue();
        value.filename = file.originalname;
        value.filesize = file.size;
        value.mimetype = file.mimetype;
        const dotIndex = file.originalname.lastIndexOf('.');
        value.extension = dotIndex !== -1 ? file.originalname.substring(dotIndex + 1).toLowerCase() : 'bin';
        return value;
    }

    async deleteById(id: string, entryId: string): Promise<void> {
        const ack = await this.formModel.deleteOne({_id: entryId, formId: id});
        if (ack.deletedCount == 0)
            throw new NotFoundException('entity not found !');
    }
}
