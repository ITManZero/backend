import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseValidation} from '../field.schema';


const defaultValues: NumberFieldValidation = {
    required: false,
    visable: true,
    allowNegative: false,
    range: {
        format: 'digits',
        min: 0,
        max: 18,
    },
};

@Schema({_id: false})
export class NumberRangeValidation {
    @Prop()
    format: 'digits' | 'value';
    @Prop()
    min: number;
    @Prop()
    max: number;
}

@Schema({_id: false})
export class NumberFieldValidation extends BaseValidation {
    @Prop({type: NumberRangeValidation})
    range: NumberRangeValidation;
    @Prop()
    allowNegative: boolean;
}

@Schema()
export class NumberField {
    @Prop({required: true, default: 'number'})
    group: 'number';

    @Prop({default: '123'})
    placeholder: string;

    @Prop({
        type: NumberFieldValidation,
        default: defaultValues,
    })
    validations: NumberFieldValidation;
}

export const NumberFieldSchema =
    SchemaFactory.createForClass(NumberField);