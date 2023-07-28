import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseValidation, Field, SimpleRangeValidation} from '../field.schema';
import {CheckBoxFieldValidation} from './checkbox-field.schema';

const defaultValues: CheckBoxFieldValidation = {
    required: false,
    visable: true,
    range: {min: 1, max: 3},
};

@Schema({_id: false})
export class SelectMultipleFieldValidation extends BaseValidation {
    @Prop({type: SimpleRangeValidation})
    range: SimpleRangeValidation;
}

@Schema()
export class SelectMultipleField implements Field {
    @Prop({required: true, default: 'choices'})
    group: 'choices';
    @Prop({required: true, default: ['First Choice', 'Second Choice', 'Third Choice']})
    choices: string[];
    @Prop({
        type: SelectMultipleFieldValidation,
        default: defaultValues,
    })
    validations: SelectMultipleFieldValidation;
    complex: boolean;
    default: string;
    label: string;
    order: number;
    placeholder: string;
    type: string;
}

export const SelectMultipleFieldSchema =
    SchemaFactory.createForClass(SelectMultipleField);

// DateFieldSchema.virtual('group').get(function () {
//   return "choices";
// });