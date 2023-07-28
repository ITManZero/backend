import {Prop, Schema} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {FieldGroupTypes} from "../../constants/field-groups.constants";
import {FieldTypes} from "../../constants/field.constants";

@Schema({_id: false, discriminatorKey: 'group'})
export class FieldEntry {
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
    @Prop({type: mongoose.Schema.Types.Mixed})
    value: any;
}