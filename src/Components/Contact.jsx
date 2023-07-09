import React from 'react'

function Contact() {
  return (
    <div className='flex justify-center mt-10' id="contact"><hr className='line' />
    <div className='w-full text-center border-2 p-5 border-gray-400 bg-gray-300'>
      <h2 className='text-gray-900 text-3xl py-3'>Order your food here!</h2>
      <p className='m-5'>Please order your foods according to their respective code numbers</p>
      <hr />
      <br />
      <a href="tel:+918899155524" className='p-3 px-5 bg-green-400 rounded-full font-medium'>Order Now!</a>
      <br />
      <br />
      <p className='select-text'>Our Email: alamfooods@gareebmail.com</p>
    </div>
    </div>
  )
}

export default Contact