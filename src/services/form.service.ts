import {Injectable, NotFoundException} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {CreateFormDto} from '../dto/create-form.dto';
import {FieldService} from './field.service';
import {CreateFieldDto} from '../dto/create-field.dto';
import {Form, FormDocument} from '../schemas/form/form.schema';

@Injectable()
export class FormService {

    constructor(@InjectModel(Form.name) private formModel: Model<Form>,
                private fieldService: FieldService) {
    }

    async findAll(): Promise<Form[]> {
        return this.formModel.find().select('-fields').lean();
    }

    async findAllByIds(ids: string[]): Promise<Form[]> {
        return this.formModel.find({_id: {$in: ids}}).select('-fields').lean();
    }

    async findAllActive(): Promise<Form[]> {
        return this.formModel.find({active: "active"}).select('-fields').lean();
    }


    public async findById(id: string): Promise<Form> {
        const document = await this.formModel
            .findById(id)
            .populate('fields')
            .lean();
        if (!document)
            throw new NotFoundException('form not found !');
        return document;
    }

    private async findDocById(id: string): Promise<FormDocument> {
        const document = await this.formModel
            .findById(id)
            .populate('fields');
        if (!document)
            throw new NotFoundException('form not found !');
        return document;
    }

    async create(createDto: CreateFormDto): Promise<Form> {
        const form = new this.formModel(createDto);
        return await form.save();
    }

    async addField(formId: string, createDto: CreateFieldDto): Promise<Form> {
        const form = await this.findDocById(formId);
        const field = await this.fieldService.createDefaultField(createDto);
        form.fields.push(field);
        return await form.save();
    }

    deleteFieldById(formId: string,
                    fieldId: string): Promise<Form> {
        const form = this.formModel.findOneAndUpdate(
            {_id: formId},
            {
                $pull: {
                    fields: {
                        _id: fieldId,
                    },
                },
            },
            {new: true}).lean();
        if (!form)
            throw new NotFoundException('form not found !');
        return form;
    }

    async updateFieldById(formId: string,
                          fieldId: string,
                          createFieldDto: CreateFieldDto): Promise<Form> {
        const form = this.formModel.findOneAndUpdate(
            {_id: formId, 'fields._id': fieldId},
            {
                $set: {
                    'fields.$.label': createFieldDto.label,
                    'fields.$.order': createFieldDto.order,
                    'fields.$.type': createFieldDto.type,
                    // Add more properties you want to update
                },
            },
            {new: true},
        ).lean();
        if (!form)
            throw new NotFoundException('form not found !');
        return form;
    }

    async updateAdvancedFieldById(formId: string,
                                  fieldId: string,
                                  createFieldDto: CreateFieldDto): Promise<Form> {
        const form = await this.formModel.findOne({_id: formId, 'fields._id': fieldId});
        if (form == null || form.fields.length <= 0) {
            throw new NotFoundException('form or field not found !');
        }
        await this.fieldService.update(form.fields.filter(field => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return (field._id as string) == fieldId;
        })[0], createFieldDto);
        return await form.save();
    }

    async updateById(dto: CreateFormDto, id: string): Promise<Form> {
        const form = await this.findDocById(id);
        form.name = dto.name;
        form.active = dto.active;
        form.description = dto.description;
        return await form.save();
    }

    async deleteById(id: string): Promise<void> {
        const ack = await this.formModel.deleteOne({_id: id});
        if (ack.deletedCount == 0)
            throw new NotFoundException('entity not found !');
    }
}
