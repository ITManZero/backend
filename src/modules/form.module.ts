import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {FormController as UserFormController} from '../controllers/user/form.controller';
import {FormController as AdminFormController} from '../controllers/admin/form.controller';
import {FormService} from '../services/form.service';
import {FieldService} from '../services/field.service';
import {Form, FormSchema} from '../schemas/form/form.schema';
import {FormEntry, FormEntrySchema} from "../schemas/form/form-entry.schema";
import {FormEntryController as AdminFormEntryController} from "../controllers/admin/form-entry.controller";
import {FormEntryController as UserFormEntryController} from "../controllers/user/form-entry.controller";
import {FormEntryService} from "../services/form-entry.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {FieldController} from "../controllers/admin/field.controller";
import {AuthService} from "@app/common/services/auth.service";

@Module({
    imports: [MongooseModule.forFeature([
            {name: Form.name, schema: FormSchema},
            {name: FormEntry.name, schema: FormEntrySchema},
        ]
    ), JwtModule.register({
        signOptions: {expiresIn: '60s'},
    })],
    controllers: [
        UserFormController,
        AdminFormController,
        FieldController,
        AdminFormEntryController,
        UserFormEntryController
    ],
    providers: [FormService, FieldService, FormEntryService, AuthService, JwtService],
})
export class FormModule {
}
