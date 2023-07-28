import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Schema as MongooseSchema} from 'mongoose';
import {SelectOneFieldSchema} from '../fields/choices/select-one-field.schema';
import {SelectMultipleFieldSchema} from '../fields/choices/select-multiple-field.schema';
import {CheckBoxFieldSchema} from '../fields/choices/checkbox-field.schema';
import {RadioFieldSchema} from '../fields/choices/radio-field.schema';
import {DateFieldSchema} from '../fields/date/date-field.schema';
import {DateTimeFieldSchema} from '../fields/date/date-time-field.schema';
import {TimeFieldSchema} from '../fields/date/time-field.schema';
import {ImageFieldSchema} from '../fields/file/image-field.schema';
import {NumberFieldSchema} from '../fields/number/number-field.schema';
import {PhoneNumberFieldSchema} from '../fields/number/phone-number-field.schema';
import {CurrencyFieldSchema} from '../fields/number/currency-field.schema';
import {DecimalFieldSchema} from '../fields/number/decimal-field.schema';
import {SmallTextFieldSchema} from '../fields/text/small-text-field.schema';
import {BigTextFieldSchema} from '../fields/text/big-text-field.schema';
import {EmailTextFieldSchema} from '../fields/text/email-text-field.schema';
import {FileFieldSchema} from '../fields/file/file-field.schema';
import {Field} from '../fields/field.schema';
import {FieldTypes} from '../../constants/field.constants';
import {FormStatus} from '../../constants/form-status.constants';

export type FormDocument = HydratedDocument<Form>;

@Schema({timestamps: true})
export class Form {
    @Prop({required: true})
    name: string;
    @Prop({
        type: String,
        required: true,
        enum: FormStatus,
        default: FormStatus.ACTIVE,
    })
    active: string;

    @Prop()
    description: string;

    @Prop([{type: Field}])
    fields: [Field];
}

export const FormSchema = SchemaFactory.createForClass(Form);
const fieldsArraySchema = FormSchema.path('fields') as MongooseSchema.Types.DocumentArray;
// choices
export const SelectOneField = fieldsArraySchema.discriminator(FieldTypes.SELECT_ONE, SelectOneFieldSchema);
export const SelectMultipleField = fieldsArraySchema.discriminator(FieldTypes.SELECT_MULTIPLE, SelectMultipleFieldSchema);
export const CheckBoxField = fieldsArraySchema.discriminator(FieldTypes.CHECKBOX, CheckBoxFieldSchema);
export const RadioField = fieldsArraySchema.discriminator(FieldTypes.RADIO, RadioFieldSchema);
// date
export const DateField = fieldsArraySchema.discriminator(FieldTypes.DATE, DateFieldSchema);
export const DateTimeField = fieldsArraySchema.discriminator(FieldTypes.DATE_TIME, DateTimeFieldSchema);
export const TimeField = fieldsArraySchema.discriminator(FieldTypes.TIME, TimeFieldSchema);
// file
export const FileField = fieldsArraySchema.discriminator(FieldTypes.FILE, FileFieldSchema);
export const ImageField = fieldsArraySchema.discriminator(FieldTypes.IMAGE, ImageFieldSchema);
// number
export const NumberField = fieldsArraySchema.discriminator(FieldTypes.NUMBER, NumberFieldSchema);
export const PhoneNumberField = fieldsArraySchema.discriminator(FieldTypes.PHONE_NUMBER, PhoneNumberFieldSchema);
export const CurrencyField = fieldsArraySchema.discriminator(FieldTypes.CURRENCY, CurrencyFieldSchema);
export const DecimalField = fieldsArraySchema.discriminator(FieldTypes.DECIMAL, DecimalFieldSchema);
// text
export const SmallTextField = fieldsArraySchema.discriminator(FieldTypes.SMALL_TEXT, SmallTextFieldSchema);
export const BigTextField = fieldsArraySchema.discriminator(FieldTypes.BIG_TEXT, BigTextFieldSchema);
export const EmailTextField = fieldsArraySchema.discriminator(FieldTypes.EMAIL_TEXT, EmailTextFieldSchema);