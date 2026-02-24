const Favorite = require('../models/Favorite')

exports.addFavorite = async (req, res) => {

    try{

        const {pokemonId, pokemonName} = req.body

        const favorite = await Favorite.create({
            pokemonId,
            pokemonName,
            UserId: req.userId
        })

        res.status(201).json(favorite)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao salvar favorito'})
    }
}

exports.getFavorites = async (req, res) => {

    try{
        const favorites = await Favorite.findAll({

            where: {UserId: req.userId}

        })

        res.json(favorites)

    } catch {
        res.status(500).json({ error: 'Erro ao buscar favoritos'})
    }
}