import Fastify from "fastify";
import cachedData from "./sentences.json"
import cors from "@fastify/cors"



const app = Fastify({
    logger: true,
});

app.register(cors, {
    // 允许所有域名访问，或者你可以指定具体的域名
    // origin: ["https://your-frontend.com"], 
    origin: true, // 这样写会自动匹配请求方的 Origin
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

