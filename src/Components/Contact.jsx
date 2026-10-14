import React from 'react'

function Contact() {
  return (
    <div className='flex justify-center mt-10' id="contact"><hr className='line' />
    <div className='w-full text-center border-2 p-5 border-gray-400 bg-gray-300'>
      <h2 className='text-gray-900 text-3xl py-3'>Order on WhatsApp</h2>
      <p className='m-5'>Message us to preorder. Pickup near UII, Yogyakarta.</p>
      <hr />
      <br />
      <a href="https://wa.me/919906630962?text=Hi%2C%20I%27d%20like%20to%20preorder%20food%20for%20pickup%20near%20UII%2C%20Yogyakarta." target="_blank" rel="noreferrer" className='p-3 px-5 bg-green-400 rounded-full font-medium'>WhatsApp (pickup near UII)</a>
      <br />
      <br />
    </div>
    </div>
  )
}

export default Contact
