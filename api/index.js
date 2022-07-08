const express = require('express');
const cors = require('cors');

const userController = require('./controllers/user_controller');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json("Funciona")
})

app.use("/img", express.static('uploads'));


app.use('/api/user', userController);

const port = 3030
app.listen(port, () => console.log(`Express en puerto ${port}!`))