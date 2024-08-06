import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(process.cwd(), 'public')))

app.listen(8080, () => {
    console.log('listenning on http://localhost:8080')
})

