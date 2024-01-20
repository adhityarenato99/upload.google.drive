const express = require('express')
const app = express();
const port = process.env.PORT || 3000
const cors = require('cors')
// const db = require('./src/models');
// const initRoutes = require('./src/routes/web');

// db.sequelize.sync()
// .then(() => {
//     console.log("Synced db.")
// })

// var corsOptions = {
//     origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

app.use(cors);

// parse requests of content-tyep - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: false
}));

// simple route
// app.get("/", (req, res) => {
//     // res.json({ message: "Welcome to Application"});
//     res.send('Welcome to application')
// });

app.get('/', (req, res) => {
    res.send('API sudah berjalan')
    console.log('API untuk CRUD sudah berjalan')
})



// app.use('/', initRoutes);

// set port, listen for requests
// const PORT = process.env.PORT || 8008;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })

app.listen(port, () => console.log(`Server berjalan pada port ${port}; ` + 'tekan Ctrl-C untuk menghentikan Server...'))