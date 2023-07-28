import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseValidation, Field} from '../field.schema';

const defaultValues: BaseValidation = {
    required: false,
    visable: true,
};

@Schema()
export class RadioField implements Field {
    @Prop({required: true, default: 'choices'})
    group: 'choices';
    @Prop({required: true, default: ['First Choice', 'Second Choice', 'Third Choice']})
    choices: string[];
    @Prop({
        type: BaseValidation,
        default: defaultValues,
    })
    validations: BaseValidation;
    complex: boolean;
    default: string;
    label: string;
    order: number;
    placeholder: string;
    type: string;
}

export const RadioFieldSchema = SchemaFactory.createForClass(RadioField);