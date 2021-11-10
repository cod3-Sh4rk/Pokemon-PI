import React from 'react'

export default function Paginado ({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumbers = []

    for (let i=0; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i+1)
    }

    return (
        <div className= 'pagination'>
            <label>Pages:</label>
            { pageNumbers &&
                pageNumbers.map(number => (
                    <button onClick={()=>paginado(number)} className='number'>{number}</button>
                ))
            }
        </div>
    )
}