const path = require('path');
const express = require('express');
const fs = require("fs");
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.listen(8082);
console.log("listing to 8082");