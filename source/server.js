import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import express from 'express';
const app = express();
const port = 3001;
app.use(cors());
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'mock-data.json'));
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
