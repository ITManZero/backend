import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';
import {FormModule} from './modules/form.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb+srv://cluster0.likj3kp.mongodb.net', {
        user: "bakermeslbm",
        pass: "ykRp56ufj1ql9KU1",
        dbName: 'nest',
        w: 'majority',
        retryWrites: true
    }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        FormModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
