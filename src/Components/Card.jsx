import React from 'react'
import { Link } from "react-scroll"
function Card(props) {
  return (
   
        <div className='w-96 flex h-64 border-2 sm:w-1/3 border-gray-400 rounded-lg m-7 sm:m-10 hover:shadow-xl shadow-xl shadow-gray-400 hover:shadow-gray-500'>
        <img src={props.img} className="w-32 md:w-32 sm:w-40 rounded-lg border-r-2 border-gray-400 object-cover" />
        <div className='text-center'> 
        <h2 className='mt-2 mb-2 text-2xl font-medium text-gray-800'>{props.name}</h2>
        <div className='card-details'>
        <p className='text-sm md:text-sm sm:text-base'>{props.des}</p>
        <hr />
        <h4 className='font-medium'>Price: ₹{props.price} only.</h4>
        <h4 className='font-medium'>Menu code:<span className='font-bold'> {props.code}</span></h4>
        </div>
        <Link to="Contact" smooth={true} duration={500}><button className='sm:p-1 p-2 px-5 rounded-full mb-0 font-medium bg-green-400'>ORDER</button></Link> 
        </div>
  
    </div>
  )
}

export default Card