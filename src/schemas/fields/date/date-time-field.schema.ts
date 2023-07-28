import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseValidation} from '../field.schema';
import {DateValidation} from './date-field.schema';


const defaultValues: DateTimeFieldValidation = {
    required: false,
    visable: true,
    allowedDates: {
        type: 'range',
        from: '12/10/2022',
        to: '12/10/2022',
    },
    allowedDays: ['all days'],
    format: '24',
};

@Schema({_id: false})
export class DateTimeFieldValidation extends BaseValidation {
    @Prop()
    allowedDates: DateValidation;
    @Prop()
    format: '24' | '12';
    @Prop()
    allowedDays: string[];
}

@Schema()
export class DateTimeField {
    @Prop({required: true, default: 'date'})
    group: 'date';
    type: 'date-time';

    @Prop({
        type: DateTimeFieldValidation,
        default: defaultValues,
    })
    validations: DateTimeFieldValidation;
}

export const DateTimeFieldSchema =
    SchemaFactory.createForClass(DateTimeField);