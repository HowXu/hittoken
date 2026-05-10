import Fastify from "fastify";
import cachedData from "./sentences.json"


const app = Fastify({
    logger: true,
});

const len: number = cachedData.length;

// get
app.get('/', async (_req, reply) => {
    const idx = Math.floor(Math.random() * len);
    return reply.send(cachedData[idx]);
});

app.get('/favicon.ico', (_req, res) =>
    res.status(200).send()
);

const isVercel = process.env.VERCEL === '1';

if (!isVercel) {
    const start = async () => {
        try {
            await app.ready();
            const port = 3000;
            await app.listen({ port, host: '0.0.0.0' });
        } catch (err) {
            console.error('Launch failed:', err);
            process.exit(1);
        }
    };
    start();
}

export default app;

