"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_entity_1 = require("./../../core/entities/cliente.entity");
exports.clienteProviders = [
    {
        provide: 'CLIENTE_REPOSITORY',
        useFactory: (connection) => connection.getRepository(cliente_entity_1.Cliente),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=cliente.providers.js.map