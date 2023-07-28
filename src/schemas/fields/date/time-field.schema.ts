import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseValidation} from '../field.schema';


const defaultValues: TimeFieldValidation = {
    required: false,
    visable: true,
    format: '24',
};

@Schema({_id: false})
export class TimeFieldValidation extends BaseValidation {
    @Prop()
    format: '24' | '12';
}

@Schema()
export class TimeField {
    @Prop({required: true, default: 'date'})
    group: 'date';
    type: 'time';
    @Prop({
        type: TimeFieldValidation,
        default: defaultValues,
    })
    validations: TimeFieldValidation;
}

export const TimeFieldSchema =
    SchemaFactory.createForClass(TimeField);