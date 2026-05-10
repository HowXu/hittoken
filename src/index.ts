import Fastify from "fastify"; import { readFile } from "fs/promises";
import path from "path";

async function returnSentence(data: Sentence[]) {
    return data[Math.floor(Math.random() * len)];
}

interface Sentence {
    "hitokoto": string,
    "from": string,
};

const app = Fastify({
    logger: true,
});

let cachedData: Sentence[];
let len: number;
const file = path.join(process.cwd(), 'sentences.json');

app.addHook('onReady', async () => {
    try {
        const rawData = await readFile(file, 'utf-8');
        cachedData = JSON.parse(rawData);
        len = cachedData.length;
        console.log("Loaded Json Data");
    } catch (error) {
        console.error("Load Json Data failed", error);
    }
});

// get
app.get('/', async (_req, reply) => {
    if (!cachedData) {
        return reply.status(500).send({ error: "Process Data" });
    }
    // randomly select a sentence and return
    const rt = await returnSentence(cachedData);
    // console.log(rt);
    return reply.send(rt);
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

