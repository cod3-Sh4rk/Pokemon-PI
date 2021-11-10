

const { Router } = require('express');
const router = Router();
const {getAllPokemon} = require('../controllers/PokemonController')
const { Pokemon, Type } = require('../db');


router.get('/pokemons', async (req, res) => {
    const name = req.query.name
    
        const pokemonsTotal = await getAllPokemon();
        if(name) {
            let pokemonName =  await pokemonsTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
             pokemonName.length? //hay algo?
            res.status(200).send(pokemonName) :
            res.status(404).send('Pokemon no encontrado')
        } else {
            res.status(200).send(pokemonsTotal);
        }
    
})


router.get('/pokemons/:id', async (req, res) => {
    const {id} = req.params;
    const allPokemons = await getAllPokemon();
    if(id) {
        const pokemonId = await allPokemons.filter(e => e.id == id);
        pokemonId.length ?
        res.status(200).json(pokemonId) :
        res.status(404).send('Pokemon no encontrado')
    }
})


router.post('/pokecre', (req, res,next) => {
    let {name, hp, attack, defense, speed, height, weight, sprite, createdInDb, types} = req.body;
  
        console.log(types)
        let createdPokemon = {
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            sprite,
            type: types.map(e=>e.name),
            createdInDb
        };
        console.log (createdPokemon.type)
        Pokemon.create({...createdPokemon})
        .then((e)=>{e.addType({name:createdPokemon.type})})
        .then((created)=>{return res.json(created).send(created)})
        .catch((error)=> next(error))
})
module.exports = router;