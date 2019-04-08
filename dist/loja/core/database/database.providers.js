"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require('dotenv').config();
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: () => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.createConnection({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: 5432,
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_USER,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
            });
        }),
    },
];
//# sourceMappingURL=database.providers.js.map