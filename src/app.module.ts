import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';
import {FromModule} from './modules/from.module';

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
        FromModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
