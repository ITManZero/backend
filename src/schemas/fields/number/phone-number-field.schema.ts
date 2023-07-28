import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseValidation, SimpleRangeValidation} from '../field.schema';

const defaultValues: PhoneFieldValidation = {
    required: false,
    visable: true,
    range: {
        min: 5,
        max: 15,
    },
    includeCountry: false,
};

@Schema({_id: false})
export class PhoneFieldValidation extends BaseValidation {
    @Prop({type: SimpleRangeValidation})
    range: SimpleRangeValidation;
    @Prop()
    includeCountry: boolean;
}

@Schema()
export class PhoneNumberField {
    @Prop({required: true, default: 'number'})
    group: 'number';
    type: 'phone';
    @Prop()
    complex: true;

    @Prop({default: '936118788'})
    placeholder: string;
    // @Prop()
    // elements: any;
    @Prop({
        type: PhoneFieldValidation,
        default: defaultValues,
    })
    validations: PhoneFieldValidation;
}

export const PhoneNumberFieldSchema =
    SchemaFactory.createForClass(PhoneNumberField);