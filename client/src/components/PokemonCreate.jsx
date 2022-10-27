import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postPokemon, getTypes } from '../actions/index.js';
import { useDispatch, useSelector } from 'react-redux';

function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Name is required';
    } else if (!/^[A-Z]+$/i.test(input.name.replaceAll(' ', ''))) {
      errors.name = 'Only alphabetical characters';
    }
    /* if (!input.hp ) {
        errors.hp = 'hp is required'
    }
   if (!input.attack) {
        errors.attack = 'attack is required'
   }
    if (!input.defense) {
        errors.defense = 'defense is required'
    }
    if (!input.speed) {
        errors.speed = 'speed is required'
    }
    if (!input.height) {
        errors.height = 'height is required'
    }
    if (!input.weight) {
        errors.weight = 'weight is required'
    } */
    var prop=['hp', 'attack','defense', 'speed', 'height', 'weight' ]
    var prop1=['hp', 'attack','defense', 'speed', 'height', 'weight' ]
    prop.forEach((property,index ) =>{
        if (!input[property]) {
            errors[property] = ' Required to continue ' +prop1[index];
        }else if (!/^[0-9]*$/.test(input[property])) {
            errors[property] = prop1[index].charAt(0).toUpperCase() + prop1[index].slice(1)+ 'only numbers'
        }
    })
    return errors;
}

export default function PokemonCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const {types} = useSelector((state) => state)
    const [errors, setErrors] = useState({});

    const [input,setInput] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        sprite: "",
        types: []
    })

    function handleChange(e) {
        var s=['name','hp','attack','defense','speed','height','weight'].filter(el=>el===e.target.name)
        if (s.length>0)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
       
    }

    function handleCheck(e) {
        if(e.target.checked){
            setInput({
                ...input,
                status: e.target.value
            })
        }
    }

    function handleSelect(e) {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
        dispatch(postPokemon(input))
        
        setInput({
            name: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            sprite: "",
            types: []
        })
        history.push('/home')
    }

    function handleDelete(e) {
        setInput({
            ...input,
            types: input.types.filter(el => el !== e)
        })
    }

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);
    

    const handleTypes = (g)=>{
        if(input.types.includes(g.target.value)){
           let tempType = input.types.filter(g => g !== g.target.value)
            setInput({
                ...input,
               types: tempType,
               
            })
            console.log(input)
        }else{
            setInput({
                ...input,
                types: [...input.types, g.target.value]
            })
        }
    }

    return (
        <div>
            <Link to= '/home'><button>Return</button></Link>
            <h1>Create your own pokémon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                    type= "text" 
                    value= {input.name}
                    name= "name" required
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Hp:</label>
                    <input
                    type= "text"
                    value= {input.hp}
                    name= "hp" required
                    onChange={(e) => handleChange(e)}
                    
                    />
                </div>
                {errors.hp && (
                        <p className='error'>{errors.hp}</p>
                    )}
                <div>
                    <label>Attack:</label>
                    <input
                    type= "text"
                    value= {input.attack}
                    name= "attack" required
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                {errors.attack && (
                        <p className='error'>{errors.attack}</p>
                    )}
                <div>
                    <label>Defense:</label>
                    <input
                    type= "text"
                    value= {input.defense}
                    name= "defense" required 
                    onChange={(e) => handleChange(e)}
                    />
                </div>{errors.defense && (
                        <p className='error'>{errors.defense}</p>
                        )}
                
                <div>
                    <label>Speed:</label>
                    <input
                    type= "text"
                    value= {input.speed}
                    name= "speed" required
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                {errors.speed && (
                        <p className='error'>{errors.speed}</p>
                )}
                <div>
                    <label>Height:</label>
                    <input
                    type= "text"
                    value= {input.height}
                    name= "height" required
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                {errors.height && (
                        <p className='error'>{errors.height}</p>
                )}
                <div>
                    <label>Weight:</label>
                    <input
                    type= "text"
                    value= {input.weight}
                    name= "weight" required
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                {errors.weight && (
                        <p className='error'>{errors.weight}</p>
                )}
                <div>
                    <label>Sprite:</label>
                    <input
                    type= "text"
                    value= {input.sprite}
                    name= "sprite"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Types:</label>
                    <select name='types' onChange={handleTypes}  required >
                    <optgroup label="Types"/>
                    {types.map((g) => { return <option key={g.id} value= {g.name}>{g.name}</option>})}
                     </select>
                     
                    <ul>
                        <li>{input.types.map(e => e + ", ")}</li>
                    </ul>

                    <button type='submit' >Create pokemon</button>
                    
                </div>    
            </form>
            {input.types.map(e =>
                <div className='divTypes'>
                    <p>{e}</p>
                    <button className='botonX' onClick={() => handleDelete(e)}>x</button>
                </div>      
            )}
        </div>
    )
}

//types = [{name:grass, id:1}]

//e=1