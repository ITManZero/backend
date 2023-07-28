import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsString} from "class-validator";

@Schema({_id: false})
export class StringValue {
    @IsString()
    @Prop({required: true})
    text: string;
}

@Schema({_id: false})
export class StringEntry {
    @Prop({required: true, type: StringValue})
    value: StringValue;
}

export const StringEntrySchema = SchemaFactory.createForClass(StringEntry);
