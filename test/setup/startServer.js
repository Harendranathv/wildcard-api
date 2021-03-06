const Hapi = require('hapi');
const Inert = require('inert');

module.exports = startServer;

async function startServer(wildcardApiHolder) {
  const server = Hapi.Server({
    port: 3000,
    debug: {request: ['internal']},
  });

  server.route({
    method: '*',
    path: '/wildcard/{param*}',
    handler: async (request, h) => {
      const {body, statusCode, type} = await wildcardApiHolder.wildcardApi.getApiResponse(request.raw.req);
      const resp = h.response(body);
      resp.code(statusCode);
      resp.type(type);
      return resp;
    }
  });

  await server.register(Inert);
  server.route({
    method: '*',
    path: '/{param*}',
    handler: {
      directory: {
        path: __dirname+'/browser/dist/',
      }
    }
  });

  await server.start();

  return server;
}
