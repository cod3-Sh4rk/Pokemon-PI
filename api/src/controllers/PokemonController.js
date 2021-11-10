const axios = require ('axios');
const { Pokemon, Type } = require('../db');


const getPokemonApi = async () => {
    const pokemonFirst = await axios.get("https://pokeapi.co/api/v2/pokemon")
    const pokemonSecond = await axios.get(pokemonFirst.data.next)
    const totalPokemon = pokemonFirst.data.results.concat(pokemonSecond.data.results)
    
    try {
        const infoUrl = totalPokemon.map(e => axios.get(e.url))
        let infoPokemon = Promise.all(infoUrl)
        .then (e => {
            let pokemon = e.map(e => e.data)
            let info  = []
            pokemon.map(e => {
                info.push({
                    id: e.id,
                    name: e.name,
                    hp: e.stats[0].base_stat,
                    attack: e.stats[1].base_stat,
                    defense: e.stats[2].base_stat,
                    speed: e.stats[5].base_stat,
                    height: e.height,
                    weight: e.weight,
                    sprite: e.sprites.front_default,
                    types: e.types.length < 2 ? [{name: e.types[0].type.name}] : [{name: e.types[0].type.name}, {name: e.types[1].type.name}]    
                }); 
            })
            return info;
           
        })
        return infoPokemon;
    }catch (error) {
        console.log(error)
    }
}

const getPokemonDb = async () => {
    try {
        return await Pokemon.findAll({
            include :{
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const getAllPokemon = async () => {
    const apiInfo = await getPokemonApi();
    const dbInfo = await getPokemonDb();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}


module.exports = {
    getAllPokemon,
    getPokemonDb
}