import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {FormController} from '../controllers/form.controller';
import {FormService} from '../services/form.service';
import {FieldService} from '../services/field.service';
import {Form, FormSchema} from '../schemas/form/form.schema';
import {FormEntry, FormEntrySchema} from "../schemas/form/form-entry.schema";
import {FormEntryController} from "../controllers/form-entry.controller";
import {FormEntryService} from "../services/form-entry.service";

@Module({
    imports: [MongooseModule.forFeature([
            {name: Form.name, schema: FormSchema},
            {name: FormEntry.name, schema: FormEntrySchema},
        ]
    )],
    controllers: [FormController, FormEntryController],
    providers: [FormService, FieldService, FormEntryService],
})
export class FromModule {
}
