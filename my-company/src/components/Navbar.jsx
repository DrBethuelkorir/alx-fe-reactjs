import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const mystyles = {
    display: "flex",
    gap: "50px",
    padding: "20px",
    marginTop : "10px" ,
    listStyle : 'none' ,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : 'white'
  }
  return (
    <div>
        <ul style={mystyles}>
           <Link to="/"><li>Home</li></Link> 
            <Link to="/about"><li>About</li></Link>
            <Link to= "/services"><li>Services</li></Link> 
            <Link to="/contact"><li>Contact</li></Link>
        </ul>
    </div>
  )
}

export default Navbar