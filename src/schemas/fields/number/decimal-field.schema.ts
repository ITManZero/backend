import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseValidation} from '../field.schema';
import {NumberRangeValidation} from './number-field.schema';


const defaultValues: DecimalFieldValidation = {
    required: false,
    visable: true,
    allowNegative: false,
    range: {
        format: 'digits',
        min: 0,
        max: 50,
    },
};

@Schema({_id: false})
export class DecimalFieldValidation extends BaseValidation {
    @Prop({type: NumberRangeValidation})
    range: NumberRangeValidation;
    @Prop()
    allowNegative: boolean;
}

@Schema()
export class DecimalField {
    @Prop({required: true, default: 'number'})
    group: 'number';
    type: 'decimal';

    @Prop({default: '.00'})
    placeholder: string;
    @Prop({
        type: DecimalFieldValidation,
        default: defaultValues,
    })
    validations: DecimalFieldValidation;
}

export const DecimalFieldSchema =
    SchemaFactory.createForClass(DecimalField);