import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class navbar extends Component {
  render() {
    return (
      <div className="navbar">
          <Link to='/' style={{textDecoration:'none', color:'black'}}><h1>Movies Path</h1></Link>
          <Link to='/favourites' style={{textDecoration:'none', color:'black'}}><h1>Favourites</h1></Link>

      </div>
    )
  }
}
