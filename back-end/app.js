const express = require('express')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes')

const sequelize = require('./src/config/database')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/user', userRoutes)

//HTTPs
app.get('/', (req, res) => {
    res.json({ message: 'API Pokédex rodando 🚀'})
})

//Connection
sequelize.sync().then( () => {
    app.listen(process.env.PORT, () => {
        console.log(`Servidor rodando na porta ${process.env.PORT}`)
    })
}).catch(err => console.log(err))