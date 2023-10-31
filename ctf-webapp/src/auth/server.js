// Use express
import express from 'express';
import cors from 'cors';
const app = express();

const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get('/api/hello', (req, res) => {
    res.json({hello:"world"}).status(200)
});
app.post('/login/', (req, res) => {
    
    // console.log(req);
    const { username, password } = req.body;
    console.log(req.body);
    
    // console.log(username, password);

    res.status(200).send(JSON.stringify({"username": username, "password": password}));
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

