import {Injectable, NotAcceptableException} from '@nestjs/common';
import {Field} from '../schemas/fields/field.schema';
import {CreateFieldDto} from '../dto/create-field.dto';
import {FieldTypes} from '../constants/field.constants';
import {
    BigTextField,
    CheckBoxField,
    CurrencyField,
    DateField,
    DateTimeField,
    DecimalField,
    EmailTextField,
    FileField,
    ImageField,
    NumberField,
    PhoneNumberField,
    RadioField,
    SelectMultipleField,
    SelectOneField,
    SmallTextField,
    TimeField,
} from '../schemas/form/form.schema';
import {SelectOneField as SelectOne} from '../schemas/fields/choices/select-one-field.schema';
import {SelectMultipleField as SelectMultiple} from '../schemas/fields/choices/select-multiple-field.schema';
import {CheckBoxField as CheckBox} from '../schemas/fields/choices/checkbox-field.schema';
import {RadioField as Radio} from '../schemas/fields/choices/radio-field.schema';

@Injectable()
export class FieldService {

    async update(origin: Field,
                 createFieldDto: CreateFieldDto & any): Promise<Field> {
        if (origin.type !== createFieldDto.type)
            throw new NotAcceptableException();
        origin.validations.required = createFieldDto.required;
        origin.validations.visable = createFieldDto.visable;
        origin.placeholder = createFieldDto.placeholder;
        origin.label = createFieldDto.label;
        origin.default = createFieldDto.default;
        origin.order = createFieldDto.order;
        if (origin.group === 'choices') {
            if (origin.type === 'select-one') {
                (origin as SelectOne).choices = createFieldDto.choices;
            } else if (origin.type === 'select-multiple') {
                (origin as SelectMultiple).choices = createFieldDto.choices;
                origin.validations.range.min = createFieldDto.validations.range.min;
                origin.validations.range.max = createFieldDto.validations.range.max;
            } else if (origin.type === 'checkbox') {
                (origin as CheckBox).choices = createFieldDto.choices;
                origin.validations.range.min = createFieldDto.validations.range.min;
                origin.validations.range.max = createFieldDto.validations.range.max;
            } else if (origin.type === 'radio') {
                (origin as Radio).choices = createFieldDto.choices;
            }
        } else if (origin.group === 'text') {
            if (origin.type === 'small') {
                origin.validations.input = createFieldDto.validations.input;
                origin.validations.range.min = createFieldDto.validations.range.min;
                origin.validations.range.max = createFieldDto.validations.range.max;
                origin.validations.range.format = createFieldDto.validations.range.format;
                origin.validations.range.showCount = createFieldDto.validations.range.showCount;
            } else if (origin.type === 'big') {
                origin.validations.input = createFieldDto.validations.input;
                origin.validations.range.min = createFieldDto.validations.range.min;
                origin.validations.range.max = createFieldDto.validations.range.max;
                origin.validations.range.format = createFieldDto.validations.range.format;
                origin.validations.range.showCount = createFieldDto.validations.range.showCount;
            } else if (origin.type === 'email') {
                origin.validations.range.min = createFieldDto.validations.range.min;
                origin.validations.range.max = createFieldDto.validations.range.max;
                origin.validations.domain.variant = createFieldDto.validations.domain.variant;
                origin.validations.domain.value = createFieldDto.validations.domain.value;
            }
        } else if (origin.group === 'number') {
            if (origin.type === 'decimal') {
                origin.validations.range.min = createFieldDto.validations.range.min;
                origin.validations.range.max = createFieldDto.validations.range.max;
                origin.validations.range.format = createFieldDto.validations.range.format;
                origin.validations.allowNegative = createFieldDto.validations.allowNegative;
            } else if (origin.type === 'currency') {
                // origin.currency = createFieldDto.currency;
                origin.validations.range.min = createFieldDto.validations.range.min;
                origin.validations.range.max = createFieldDto.validations.range.max;
                origin.validations.range.format = createFieldDto.validations.range.format;
                origin.validations.allowNegative = createFieldDto.validations.allowNegative;
                origin.validations.displayAs = createFieldDto.validations.displayAs;
                origin.validations.suffixUnit = createFieldDto.validations.suffixUnit;
            } else if (origin.type === 'phone') {
                origin.validations.range.min = createFieldDto.validations.range.min;
                origin.validations.range.max = createFieldDto.validations.range.max;
                origin.validations.includeCountry = createFieldDto.validations.includeCountry;
            } else if (origin.type === 'number') {
                origin.validations.range.min = createFieldDto.validations.range.min;
                origin.validations.range.max = createFieldDto.validations.range.max;
                origin.validations.range.format = createFieldDto.validations.range.format;
                origin.validations.allowNegative = createFieldDto.validations.allowNegative;
            }
        } else if (origin.group === 'file') {
            if (origin.type === 'file') {
                origin.validations.range.min = createFieldDto.validations.range.min;
                origin.validations.range.max = createFieldDto.validations.range.max;
                origin.validations.allowedFormats = createFieldDto.validations.allowedFormats;
                origin.validations.fileSize.min.size = createFieldDto.validations.fileSize.min.size;
                origin.validations.fileSize.min.unit = createFieldDto.validations.fileSize.min.unit;
                origin.validations.fileSize.max.size = createFieldDto.validations.fileSize.max.size;
                origin.validations.fileSize.max.unit = createFieldDto.validations.fileSize.max.unit;
            } else if (origin.type === 'image') {
                origin.validations.range.min = createFieldDto.validations.range.min;
                origin.validations.range.max = createFieldDto.validations.range.max;
                origin.validations.allowedFormats = createFieldDto.validations.allowedFormats;
                origin.validations.fileSize.min.size = createFieldDto.validations.fileSize.min.size;
                origin.validations.fileSize.min.unit = createFieldDto.validations.fileSize.min.unit;
                origin.validations.fileSize.max.size = createFieldDto.validations.fileSize.max.size;
                origin.validations.fileSize.max.unit = createFieldDto.validations.fileSize.max.unit;
            }
        } else if (origin.group === 'date') {
            if (origin.type === 'date') {
                origin.validations.allowedDays = createFieldDto.validations.allowedDays;
                origin.validations.allowedDates.type = createFieldDto.validations.allowedDates.type;
                origin.validations.allowedDates.from = createFieldDto.validations.allowedDates.from;
                origin.validations.allowedDates.to = createFieldDto.validations.allowedDates.to;
            } else if (origin.type === 'date-time') {
                origin.validations.allowedDates.type = createFieldDto.validations.allowedDates.type;
                origin.validations.allowedDates.from = createFieldDto.validations.allowedDates.from;
                origin.validations.allowedDates.to = createFieldDto.validations.allowedDates.to;
                origin.validations.format = createFieldDto.validations.format;
            } else if (origin.type === 'time') {
                origin.validations.format = createFieldDto.validations.format;
            }
        }
        return origin;
    }

    public async createDefaultField(createDto: CreateFieldDto): Promise<any> {
        if (createDto.type === FieldTypes.BIG_TEXT) {
            return new BigTextField(createDto);
        } else if (createDto.type === FieldTypes.SMALL_TEXT) {
            return new SmallTextField(createDto);
        } else if (createDto.type === FieldTypes.EMAIL_TEXT) {
            return new EmailTextField(createDto);
        } else if (createDto.type === FieldTypes.NUMBER) {
            return new NumberField(createDto);
        } else if (createDto.type === FieldTypes.PHONE_NUMBER) {
            return new PhoneNumberField(createDto);
        } else if (createDto.type === FieldTypes.CURRENCY) {
            return new CurrencyField(createDto);
        } else if (createDto.type === FieldTypes.DECIMAL) {
            return new DecimalField(createDto);
        } else if (createDto.type === FieldTypes.DATE) {
            return new DateField(createDto);
        } else if (createDto.type === FieldTypes.TIME) {
            return new TimeField(createDto);
        } else if (createDto.type === FieldTypes.DATE_TIME) {
            return new DateTimeField(createDto);
        } else if (createDto.type === FieldTypes.FILE) {
            return new FileField(createDto);
        } else if (createDto.type === FieldTypes.IMAGE) {
            return new ImageField(createDto);
        } else if (createDto.type === FieldTypes.SELECT_ONE) {
            return new SelectOneField(createDto);
        } else if (createDto.type === FieldTypes.SELECT_MULTIPLE) {
            return new SelectMultipleField(createDto);
        } else if (createDto.type === FieldTypes.CHECKBOX) {
            return new CheckBoxField(createDto);
        } else if (createDto.type === FieldTypes.RADIO) {
            return new RadioField(createDto);
        }
        throw new NotAcceptableException('this type is not supported');
    }

    // async startTransaction() {
    //   const session = await this.connection.startSession();
    //   session.startTransaction();
    //   return session;
    // }
}
