import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {FileFieldValidation} from './file-field.schema';

const defaultValues: FileFieldValidation = {
    required: false,
    visable: true,
    range: {min: 1, max: 5},
    allowedFormats: ["JPEG", "JPG", "PNG", "GIF", "PDF"],
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


@Schema()
export class ImageField {
    @Prop({required: true, default: 'file'})
    group: 'file';
    type: 'image';
    @Prop({
        type: FileFieldValidation,
        default: defaultValues,
    })
    validations: FileFieldValidation;
}

export const ImageFieldSchema =
    SchemaFactory.createForClass(ImageField);