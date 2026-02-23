const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Código para a pagina do cadastramento do usuário
exports.register = async (req, res) => {
    try{
        const {name, email, password} = req.body //pegar informacoes do body
    
        const userExists = await User.findOne({ where: {email}})//verifica se email ja existe

        if(userExists){
            return res.status(400).json({error: 'Email ja cadastrado'})
        }

        const hashedPassword = await bcrypt.hash(password, 10) //criptografa a senha 

        await User.create({ //cria no banco
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({message: 'Usuário criado com sucesso'}) //sucesso!
    
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro no servidor'})
    }
}

//Pagina do login
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body //resgata informacoes do body

        const user = await User.findOne({ where: {email}})
        if(!user){
            return res.status(400).json({ error: 'Usuário nao encontrado'})
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch) {
            return res.status(400).json({error: 'Senha incorreta!'})
        }

        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET, //pega la do .env a variavel que contem o valor da senha do jwt
            { expiresIn: '1d'}
        )

        res.json({token})

    } catch (error) {
        console.log("ERRO LOGIN:", error)
        res.status(500).json({ error: 'Problema no servidor'})
    }
}
