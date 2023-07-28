import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseValidation} from '../field.schema';


const defaultValues: BigTextFieldValidation = {
    required: false,
    visable: true,
    input: 'Any Character',
    range: {
        format: 'Character',
        min: 0,
        max: 65535,
        showCount: true,
    },
};

@Schema({_id: false})
export class BigTextRangeValidation {
    @Prop()
    format: 'Character' | 'Word';
    @Prop()
    min: number;
    @Prop()
    max: number;
    @Prop()
    showCount: boolean;
}

@Schema({_id: false})
export class BigTextFieldValidation extends BaseValidation {
    @Prop({type: BigTextRangeValidation})
    range: BigTextRangeValidation;
    @Prop()
    input: 'Any Character' | 'Letters Only' | 'Character And Letters';
}

@Schema()
export class BigTextField {
    @Prop({required: true, default: 'text'})
    group: 'text';
    type: 'big';
    @Prop({default: 'Big Text'})
    placeholder: string;
    @Prop({
        type: BigTextFieldValidation,
        default: defaultValues,
    })
    validations: BigTextFieldValidation;
}

export const BigTextFieldSchema =
    SchemaFactory.createForClass(BigTextField);