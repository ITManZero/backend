import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseValidation, SimpleRangeValidation} from '../field.schema';

const defaultValues: FileFieldValidation = {
    required: false,
    visable: true,
    range: {min: 1, max: 5},
    allowedFormats: ['pdf'],
    fileSize: {
        min: {
            size: 1,
            unit: 'KB',
        },
        max: {
            size: 1,
            unit: 'MB',
        },
    },
};

@Schema({_id: false})
export class SizeValidation {
    @Prop()
    size: number;
    @Prop()
    unit: 'KB' | 'MB';
}

@Schema({_id: false})
export class FileSizeValidation {
    @Prop({
        type: SizeValidation, default: {
            min: {
                size: 1,
                unit: 'KB',
            },
        },
    })
    min: SizeValidation;
    @Prop({
        type: SizeValidation, default: {
            max: {
                size: 1,
                unit: 'MB',
            },
        },
    })
    max: SizeValidation;
}


@Schema({_id: false})
export class FileFieldValidation extends BaseValidation {
    @Prop()
    allowedFormats: string[];
    @Prop({type: FileSizeValidation})
    fileSize: FileSizeValidation;
    @Prop({type: SimpleRangeValidation})
    range: SimpleRangeValidation;
}

@Schema()
export class FileField {
    @Prop({required: true, default: 'file'})
    group: 'file';
    type: 'file';
    @Prop({
        type: FileFieldValidation,
        default: defaultValues,
    })
    validations: FileFieldValidation;
}

export const FileFieldSchema =
    SchemaFactory.createForClass(FileField);