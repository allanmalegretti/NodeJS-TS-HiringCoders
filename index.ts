import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'query-string';
import * as url from 'url';
import { writeFile } from 'fs';

// const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((request: IncomingMessage, response: ServerResponse) => {

    var resposta;
    const urlparse = url.parse(request.url ? request.url : '', true)
    const params = parse(urlparse.search ? urlparse.search : '');

    // Criar usuario
    // http://localhost:3000/criar-atualizar-usuario?nome=allan&idade=36&id=1
    if (urlparse.pathname == '/criar-atualizar-usuario') {
        writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err: any) {
            if (err) throw err;
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