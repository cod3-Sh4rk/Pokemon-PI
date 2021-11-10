import React from 'react';
import {Link} from 'react-router-dom';
import "./LandingPage.css"

export default function LandingPage() {
    return(
        
        
        <div className="landing">
            <h1>PokePI</h1>
            <div className="button">
                

                <Link to='/home'>
                    <button>ingresar</button>

                </Link>
            </div>
        </div>
        
        )
}