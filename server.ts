import {
  Application,
  Router,
  Context,
} from 'https://deno.land/x/oak@v11.1.0/mod.ts';

// Se ejecuta el servidor con: deno run --allow-net server.ts
const app = new Application();
const router = new Router();

router.get('/', (ctx: Context) => {
  let texto = ctx.request.url.searchParams.get('texto');
  let response = '';
  if (texto) {
    const arregloFrase = texto.split(' ');
    const arregloRespuesta = [];
    for (let i = arregloFrase.length - 1; i >= 0; i--) {
      arregloRespuesta.push(arregloFrase[i]);
    }
    response = arregloRespuesta.join(' ');
  } else {
    texto = 'aqui no hay nada';
  }

  ctx.response.status = 200;
  ctx.response.body = `
  <!DOCTYPE html>
  <html>
    <body style="">
      <h1>
        texto original: <p>
        ${texto}</p></h1>
      <h1>
        texto invertido: <p>
        ${response}</p></h1>
    </body>
  </html>
  `;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
console.log('Servidor escuchando en http://127.0.0.1:8080');
