const express = require('express')
const app = express();
const port = process.env.PORT || 8080
const cors = require('cors')

const db = require('./src/models');

db.sequelize.sync().then(() => {
    console.log("Synced db")
})

const uploadRouter = require("./src/routes/web");

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
// app.use(cors());
// app.use(cors({ credentials: true }))

//Add the client URL to the CORS policy
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

// app.get('/', (req, res) => {
//     res.send('API sudah berjalan')
//     console.log('API untuk CRUD sudah berjalan')
// })

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.use('/', uploadRouter)


app.listen(port, () => console.log(`Server berjalan pada port ${port}; ` + 'tekan Ctrl-C untuk menghentikan Server...'))