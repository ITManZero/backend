import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseValidation, Field, SimpleRangeValidation} from '../field.schema';


const defaultValues: CheckBoxFieldValidation = {
    required: false,
    visable: true,
    range: {min: 1, max: 3},
};

@Schema({_id: false})
export class CheckBoxFieldValidation extends BaseValidation {
    @Prop({type: SimpleRangeValidation})
    range: SimpleRangeValidation;
}

@Schema()
export class CheckBoxField implements Field {
    @Prop({required: true, default: 'choices'})
    group: 'choices';
    @Prop({required: true, default: ['First Choice', 'Second Choice', 'Third Choice']})
    choices: string[];
    @Prop({
        type: CheckBoxFieldValidation,
        default: defaultValues,
    })
    validations: CheckBoxFieldValidation;
    complex: boolean;
    default: string;
    label: string;
    order: number;
    placeholder: string;
    type: string;
}

export const CheckBoxFieldSchema =
    SchemaFactory.createForClass(CheckBoxField);