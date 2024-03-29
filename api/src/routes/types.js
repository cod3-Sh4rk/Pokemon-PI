const { Router } = require('express');
const axios = require('axios');
const router = Router();
const { Type } = require('../db');

router.get('/', async (req, res) => {
    const typeNormal = await Type.findOne({where: {name:'normal'}});
  
    if(!typeNormal) {
        try {
            const types = await axios.get("https://pokeapi.co/api/v2/type");
            const typesTotal = types.data.results.map(e => e.name);
            const typesCreate = typesTotal.map(async e => await Type.create({ name: e }));
            res.status(200).send(typesCreate); console.log(typesCreate)
        } catch (error) {
            res.status(404).send('error');
            
        };
    } else {
        const types = await Type.findAll();
        
        return res.status(200).send(types);
    };
})

module.exports = router;