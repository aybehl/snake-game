const express = require('express');
const gameRoutes = require('./routes/index.js');
const app = express();
const PORT = 8000;

app.use(express.static('public'));

app.use('/', gameRoutes);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
