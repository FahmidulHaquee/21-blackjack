import express, { Request, Response } from 'express';
import exampleRoute from './routes/exampleRoute';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/example', exampleRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
