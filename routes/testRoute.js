export default async function testRoutes(fastify, options) {
    fastify.get('/', async (req, reply) => {
      return { message: 'A API está funcionando corretamente!' };
    });
  }
  
//module.exports = testRoutes;
  