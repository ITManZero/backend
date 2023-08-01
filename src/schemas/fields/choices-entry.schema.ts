import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ArrayMinSize, IsArray} from "class-validator";
import {Type} from "class-transformer";

@Schema({_id: false})
export class ChoicesValue {
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => String)
    @Prop({required: true})
    choices: string[];
}

@Schema({_id: false})
export class ChoicesEntry {
    @Prop({required: true})
    choices: string[];
    @Prop({required: true, type: ChoicesValue})
    value: ChoicesValue;
}

export const ChoicesEntrySchema = SchemaFactory.createForClass(ChoicesEntry);
