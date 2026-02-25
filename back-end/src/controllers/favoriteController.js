const Favorite = require('../models/Favorite')

module.exports = {

    async add(req, res) {

        const { pokemonId, pokemonName } = req.body

        const favorite = await Favorite.create({
            pokemonId,
            pokemonName,
            UserId: req.userId
        })

        res.status(201).json(favorite)

    },

    async list(req, res) {

        const favorites = await Favorite.findAll({
            where: {
                UserId: req.userId
            }
        })

        res.json(favorites)

    },

    async remove(req, res){

        const { id } = req.params

        await Favorite.destroy({
            where: {
                id,
                UserId: req.userId
            }
        })

        res.json({ message: "Removido com sucesso" })

    }

}