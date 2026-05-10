import Fastify from "fastify";
import cachedData from "./sentences.json"


const app = Fastify({
    logger: true,
});

const len: number = cachedData.length;

// get
app.get('/', async (_req, reply) => {
    return reply.send(cachedData[Math.floor(Math.random() * len)]);
});

app.get('/favicon.ico',async (_req, reply) => {
    return reply.status(200).send();
});

export default app;

