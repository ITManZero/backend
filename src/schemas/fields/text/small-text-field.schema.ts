import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseValidation, SimpleRangeValidation} from '../field.schema';


const defaultValues: SmallTextFieldValidation = {
    required: false,
    visable: true,
    input: 'Any Character',
    range: {min: 0, max: 255},
};

@Schema({_id: false})
export class SmallTextFieldValidation extends BaseValidation {
    @Prop({type: SimpleRangeValidation})
    range: SimpleRangeValidation;
    @Prop()
    input: "Any Character" | "Letters Only" | "Character And Letters";
}

@Schema()
export class SmallTextField {
    @Prop({required: true, default: 'text'})
    group: 'text';
    type: 'small';

    @Prop({default: 'Small Text'})
    placeholder: string;
    @Prop({
        type: SmallTextFieldValidation,
        default: defaultValues,
    })
    validations: SmallTextFieldValidation;
}

export const SmallTextFieldSchema =
    SchemaFactory.createForClass(SmallTextField);