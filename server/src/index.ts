import express from 'express';
import { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || '8080';

app.get('/', (req: Request, res: Response) => res.send('Hello!') );
app.get('/hello/:name', (req: Request, res: Response) => res.send(`Hello ${req.params.name}`) );

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});