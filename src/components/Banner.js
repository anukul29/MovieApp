import React, { Component } from 'react'
import {movies} from './Getfilm'

export default class banner extends Component {
  render() {
    let idx = Math.floor(Math.random() * movies.results.length);
    let mov = movies.results[idx]
    return (
        <>
        {
            mov != ' '?
            <div>
                <div className="card banner-card">
                    <img src={`https://image.tmdb.org/t/p/original${mov.backdrop_path}`} alt={mov.title} className="card-img-top banner-img" />
                    <div className='ban-title'>
                        <h5 className="card-title banner-title">{mov.original_title}</h5>
                    </div>

                    
                    {/* <div className="card-body"> */}
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    {/* <a href="#" className="btn btn-primary "></a> */}
                    {/* </div> */}
                </div>
            </div>:
            <div>
                <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="sr-only">Loading...</span>
                </button>
            </div>
        }
        </>
    )
  }
}
