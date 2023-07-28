import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseValidation} from '../field.schema';
import {NumberRangeValidation} from './number-field.schema';


const defaultValues: CurrencyFieldValidation = {
    required: false,
    visable: true,
    allowNegative: false,
    displayAs: 'symbol',
    suffixUnit: '',
    range: {
        format: 'digits',
        min: 0,
        max: 50,
    },
};

@Schema({_id: false})
export class CurrencyFieldValidation extends BaseValidation {
    @Prop({type: NumberRangeValidation})
    range: NumberRangeValidation;
    @Prop()
    allowNegative: boolean;
    @Prop({default: 'code'})
    displayAs: 'code' | 'symbol';
    @Prop()
    suffixUnit: string;
}

@Schema({_id: false})
export class CurrencyField {
    @Prop({required: true, default: 'number'})
    group: 'number';
    type: 'currency';
    @Prop({default: 'USD'})
    currency: string;

    @Prop({default: '10'})
    placeholder: string;
    @Prop({
        type: CurrencyFieldValidation,
        default: defaultValues,
    })
    validations: CurrencyFieldValidation;
}

export const CurrencyFieldSchema =
    SchemaFactory.createForClass(CurrencyField);