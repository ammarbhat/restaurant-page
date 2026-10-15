/* eslint-disable react/prop-types */
import { useState } from 'react'

function Card(props) {
  const [quantity, setQuantity] = useState(1)
  const unitPrice = Number(props.price.replace(/\D/g, ''))
  const totalPrice = new Intl.NumberFormat('id-ID').format(unitPrice * quantity)
  const orderMessage = `Hi, I'd like to preorder:\n${quantity} x ${props.name}\nUnit price: ${props.price}\nTotal: Rp ${totalPrice}\nPickup: near UII, Yogyakarta.`
  const orderUrl = `https://wa.me/6285741965003?text=${encodeURIComponent(orderMessage)}`

  return (
    <article className='flex min-h-64 w-[calc(100%-1.5rem)] max-w-md border-2 border-gray-400 rounded-lg m-3 sm:m-7 sm:w-1/3 shadow-lg shadow-gray-300'>
      <img src={props.img} alt={props.name} className="w-32 md:w-32 sm:w-40 rounded-lg border-r-2 border-gray-400 object-cover" />
      <div className='flex flex-1 flex-col items-center px-3 text-center'>
        <h2 className='mt-2 mb-2 text-2xl font-medium text-gray-800'>{props.name}</h2>
        <p className='text-sm md:text-sm sm:text-base'>{props.des}</p>
        <h4 className='py-2 font-semibold'>{props.price} each</h4>
        <label htmlFor={`quantity-${props.code}`} className='mb-2 flex items-center gap-2 text-sm font-medium text-gray-800'>
          Quantity
          <select
            id={`quantity-${props.code}`}
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            className='rounded-md border border-gray-500 bg-white px-2 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
          >
            {Array.from({ length: 10 }, (_, index) => index + 1).map((amount) => (
              <option key={amount} value={amount}>{amount}</option>
            ))}
          </select>
        </label>
        <p className='mb-3 text-sm font-semibold text-gray-800'>Total: Rp {totalPrice}</p>
        <a href={orderUrl} target="_blank" rel="noreferrer" className='mb-3 rounded-full bg-green-400 px-5 py-2 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'>
          Order on WhatsApp
        </a>
      </div>
    </article>
  )
}

export default Card
