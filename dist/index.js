"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const query_string_1 = require("query-string");
const url = __importStar(require("url"));
const fs_1 = require("fs");
// const hostname = '127.0.0.1';
const port = 3000;
const server = (0, http_1.createServer)((request, response) => {
    var resposta;
    const urlparse = url.parse(request.url ? request.url : '', true);
    const params = (0, query_string_1.parse)(urlparse.search ? urlparse.search : '');
    // Criar usuario
    // http://localhost:3000/criar-atualizar-usuario?nome=allan&idade=36&id=1
    if (urlparse.pathname == '/criar-atualizar-usuario') {
        (0, fs_1.writeFile)('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
            if (err)
                throw err;
            console.log('Criado!');
            resposta = 'Usuario criado/atualizado com sucesso!';
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');
            // res.setHeader('Content-Type', 'application/json');
            response.end(resposta);
        });
    }
    // response.end("Hello World");
});
server.listen(port, () => {
    console.log(`Server running on port ${port}/`);
});
