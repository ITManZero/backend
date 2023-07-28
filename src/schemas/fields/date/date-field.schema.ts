import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseValidation} from '../field.schema';


const defaultValues: DateFieldValidation = {
    required: false,
    visable: true,
    allowedDates: {
        type: 'range',
        from: '12/10/2022',
        to: '12/10/2022',
    },
    allowedDays: ['all days'],
};

@Schema({_id: false})
export class DateValidation {
    @Prop()
    type: string;
    @Prop()
    from: string;
    @Prop()
    to: string;
}

@Schema({_id: false})
export class DateFieldValidation extends BaseValidation {
    @Prop()
    allowedDates: DateValidation;
    @Prop()
    allowedDays: string[];
}

@Schema()
export class DateField {
    @Prop({required: true, default: 'date'})
    group: 'date';
    type: 'date';
    @Prop({
        type: DateFieldValidation,
        default: defaultValues,
    })
    validations: DateFieldValidation;
}

export const DateFieldSchema =
    SchemaFactory.createForClass(DateField);