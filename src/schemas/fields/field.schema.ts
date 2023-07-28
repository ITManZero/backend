import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {FieldTypes} from '../../constants/field.constants';
import {FieldGroupTypes} from "../../constants/field-groups.constants";

@Schema({_id: false})
export class SimpleRangeValidation {
    @Prop()
    min: number;
    @Prop()
    max: number;
}

@Schema({_id: false})
export class BaseValidation {
    @Prop()
    required: boolean;
    @Prop()
    visable: boolean;
}

// export type FieldDocument = HydratedDocument<Field>;

@Schema({timestamps: true, discriminatorKey: 'type'})
export class Field {
    @Prop({required: true})
    label: string;
    @Prop({required: true})
    order: number;
    @Prop({
        type: String,
        required: true,
        enum: FieldGroupTypes,
    })
    group: 'choices' | 'number' | 'file' | 'date' | 'text';

    @Prop({
        type: String,
        required: true,
        enum: FieldTypes,
    })
    type: string;
    @Prop({default: ''})
    placeholder: string;
    @Prop({default: ''})
    default: string;
    @Prop({default: false})
    complex: boolean;

    @Prop({type: {}, default: {}})
    validations: any;
}

export const FieldSchema = SchemaFactory.createForClass(Field);