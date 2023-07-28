import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseValidation, SimpleRangeValidation} from '../field.schema';


const defaultValues: EmailTextFieldValidation = {
    required: false,
    visable: true,
    range: {min: 0, max: 255},
    domain: {
        variant: 'allow',
        value: ['gmail.com'],
    },
};

@Schema({_id: false})
export class DomainValidation {
    @Prop()
    variant: 'allow' | 'restrict' | 'all';
    @Prop()
    value: string[];
}

@Schema({_id: false})
export class EmailTextFieldValidation extends BaseValidation {
    @Prop({type: SimpleRangeValidation})
    range: SimpleRangeValidation;
    @Prop()
    domain: DomainValidation;
}

@Schema()
export class EmailTextField {
    @Prop({required: true, default: 'text'})
    group: 'text';
    type: 'email';
    @Prop({default: 'email@gmail.com'})
    placeholder: string;
    @Prop({
        type: EmailTextFieldValidation,
        default: defaultValues,
    })
    validations: EmailTextFieldValidation;
}

export const EmailTextFieldSchema =
    SchemaFactory.createForClass(EmailTextField);