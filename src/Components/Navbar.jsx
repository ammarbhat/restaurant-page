import React from 'react'
import { Link } from 'react-scroll'
function Navbar() {
  return (
    <>
    
        <nav className='py-10 mt-20 sm:mt-24'>
            <ul className='flex justify-around'>
            <Link to="Home" smooth={true} duration={500}> <li className='border-2 border-gray-400 sm:px-8 rounded-full p-2 px-5'>Home</li></Link> 
            <Link to="Menu" smooth={true} duration={500}>  <li className='border-2 border-gray-400 sm:px-8 rounded-full p-2 px-5'>Menu</li></Link> 
            <Link to="Contact" smooth={true} duration={500}>   <li className='border-2 border-gray-400 sm:px-8 rounded-full p-2 px-5'>Contact</li></Link> 
            </ul>
        </nav>
        
        </>
  )
}
export default Navbar