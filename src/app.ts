import Fastify from "fastify";
import cachedData from "./sentences.json"
import cors from "@fastify/cors"



const app = Fastify({
    logger: true,
});

app.register(cors, {
    origin: true
});

const len: number = cachedData.length;

// get
app.get('/', async (_req, reply) => {
    return reply.send(cachedData[Math.floor(Math.random() * len)]);
});

app.get('/favicon.ico', async (_req, reply) => {
    return reply.status(200).send();
});

export default app;

