const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/listacasamento-front'));

app.get('/*',  (req, res) => {
    res.sendFile(__dirname + '/dist/listacasamento-front/index.html');
});

app.listen(PORT, () => {
    console.log('Servidor inciado, porta ' + PORT);
})
