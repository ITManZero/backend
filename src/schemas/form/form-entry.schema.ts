import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Schema as MongooseSchema} from 'mongoose';
import {Form} from './form.schema';
import {FieldEntry} from "../fields/field-entry.schema";
import {FieldGroupTypes} from "../../constants/field-groups.constants";
import {StringEntrySchema} from "../fields/string-entry.schema";
import {FileEntrySchema} from "../fields/file-entry.schema";
import {ChoicesEntrySchema} from "../fields/choices-entry.schema";

export type FormDocument = HydratedDocument<FormEntry>;

@Schema({timestamps: true})
export class FormEntry {
    @Prop({type: MongooseSchema.Types.ObjectId})
    formId: Form;
    @Prop({required: true})
    name: string;
    @Prop({required: true})
    description: string;

    @Prop([{type: FieldEntry}])
    fields: [FieldEntry];
}

export const FormEntrySchema = SchemaFactory.createForClass(FormEntry);
const fieldsArraySchema = FormEntrySchema.path('fields') as MongooseSchema.Types.DocumentArray;
// number
export const NumberFieldEntry = fieldsArraySchema.discriminator(FieldGroupTypes.NUMBER, StringEntrySchema);
// date
export const DateFieldEntry = fieldsArraySchema.discriminator(FieldGroupTypes.DATE, StringEntrySchema);
// text
export const TextFieldEntry = fieldsArraySchema.discriminator(FieldGroupTypes.TEXT, StringEntrySchema);
// file
export const FileFieldEntry = fieldsArraySchema.discriminator(FieldGroupTypes.FILE, FileEntrySchema);
// choices
export const choicesFieldEntry = fieldsArraySchema.discriminator(FieldGroupTypes.CHOICES, ChoicesEntrySchema);