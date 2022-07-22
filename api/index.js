const express = require('express');
const cors = require('cors');

const userController = require('./controllers/user_controller');
const artController = require('./controllers/art_controller');
const globalController = require('./controllers/global_controller');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json("Funciona")
})

app.use("/img", express.static('uploads'));
app.use("/imgArt", express.static('artUploads'));



app.use('/api/user', userController);
app.use('/api/art', artController);
app.use('/api/all', globalController);

const port = 3030
app.listen(port, () => console.log(`Express en puerto ${port}!`))