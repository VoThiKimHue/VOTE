const express = require("express");
const bodyParser = require('body-parser');
const voterouter = require('./routes/voterouter');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', voterouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
} );