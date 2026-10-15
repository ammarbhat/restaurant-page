import { useMemo, useState } from 'react'
import Footer from './Components/Footer'

const whatsappNumber = '6285741965003'
const dishes = [
  { id: 'samosa', name: 'Samosa', price: 15000, image: '/samosa.jpg', alt: 'Golden samosas ready to serve', tags: ['Vegetarian', 'Snack'], description: 'Crisp pastry filled with spiced potato. Good between classes.' },
  { id: 'pakora', name: 'Pakora', price: 15000, image: '/indian-cuisine-paneer-pakora-cheese-photo.webp', alt: 'Freshly fried pakora', tags: ['Vegetarian', 'Snack'], description: 'Golden vegetable fritters, served hot. Light and easy to share.' },
  { id: 'paneer', name: 'Paneer plate', price: 25000, image: '/shahi-paneer-paneer-kadai_926199-2764613.webp', alt: 'Paneer curry served with rice', tags: ['Vegetarian', 'Main'], description: 'Paneer curry with rice. Pick your spice level below.', spice: true },
  { id: 'combo', name: 'Combo', price: 36000, image: '/i-ate-indian-curry-combo-plate-v0-nw9b7fetegue1.webp', alt: 'Indian curry and rice combo plate', tags: ['Vegetarian', 'Best value'], description: 'One samosa plus a paneer plate. A fuller meal at a student price.', spice: true, orderName: 'Combo (samosa + paneer plate)' },
]

const formatPrice = (amount) => `Rp ${amount.toLocaleString('id-ID')}`

function MainApp() {
  const [quantities, setQuantities] = useState({})
  const [spices, setSpices] = useState({})
  const selectedItems = useMemo(() => dishes.filter((dish) => quantities[dish.id] > 0), [quantities])
  const count = selectedItems.reduce((sum, dish) => sum + quantities[dish.id], 0)
  const total = selectedItems.reduce((sum, dish) => sum + dish.price * quantities[dish.id], 0)

  const changeQuantity = (id, amount) => {
    setQuantities((current) => ({ ...current, [id]: Math.max(0, Math.min(10, (current[id] || 0) + amount)) }))
  }

  const sendOrder = () => {
    const lines = selectedItems.length
      ? ["Hi Ghar Jogja! I want to order:", ...selectedItems.map((dish) => {
        const spice = dish.spice ? ` (${spices[dish.id] || 'Medium'})` : ''
        const qty = quantities[dish.id]
        return `- ${dish.orderName || dish.name}${spice} x${qty} = ${formatPrice(qty * dish.price)}`
      }), `Total: ${formatPrice(total)}`, 'Pickup time: ', 'Name: ']
      : ['Hi Ghar Jogja! I would like to ask about the menu.']
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <a className="logo" href="#top"><span className="logo-dot" aria-hidden="true" />Ghar Jogja</a>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#menu">Menu</a><a href="#how">How it works</a><a className="nav-order" href="#order">Order</a>
          </nav>
        </div>
      </header>

      <main id="top" className="page-shell">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow"><span aria-hidden="true">✦</span> Vegetarian · Campus preorder </span>
            <h1>Home-style Indian food, <em>made for student budgets.</em></h1>
            <p className="lead">Fresh plates from a rented kitchen in Yogyakarta. Pick your items, send one WhatsApp message, and collect near UII.</p>
            <div className="hero-actions"><a className="button button-primary" href="#menu">See the menu <span aria-hidden="true">↓</span></a><a className="button button-outline" href="#how">How it works</a></div>
          </div>
          <aside className="hero-card" aria-label="At a glance">
            <h2>At a glance</h2>
            <ul className="facts">
              <li><span className="fact-icon">🥟</span><span>Snacks from Rp 15.000<small>Samosa and pakora for between classes</small></span></li>
              <li><span className="fact-icon">🍛</span><span>Full plates from Rp 25.000<small>Paneer curry with rice, mild to spicy</small></span></li>
              <li><span className="fact-icon">⌖</span><span>Pickup near UII<small>Pay by QRIS or cash when you collect</small></span></li>
              <li><span className="fact-icon">↗</span><span>No app needed<small>Order through WhatsApp in under a minute</small></span></li>
            </ul>
          </aside>
        </section>

        <section className="content-section" id="menu">
          <div className="section-head"><div><span className="section-kicker">COOKED WITH CARE</span><h2>The menu</h2></div></div>
          <div className="menu-grid">
            {dishes.map((dish) => {
              const quantity = quantities[dish.id] || 0
              return <article className="dish-card" key={dish.id}>
                <img className="dish-image" src={dish.image} alt={dish.alt} loading="lazy" />
                <div className="dish-content">
                  <div className="dish-heading"><h3>{dish.name}</h3><span className="price">{formatPrice(dish.price)}</span></div>
                  <div className="tags">{dish.tags.map((tag, index) => <span className={`tag ${index ? 'tag-warm' : ''}`} key={tag}>{tag}</span>)}</div>
                  <p className="dish-description">{dish.description}</p>
                  {dish.spice && <label className="spice-select">Spice level<select value={spices[dish.id] || 'Medium'} onChange={(event) => setSpices((current) => ({ ...current, [dish.id]: event.target.value }))}><option>Mild</option><option>Medium</option><option>Spicy</option></select></label>}
                  <div className="dish-foot"><span className="quantity-label">Quantity</span><div className="stepper" aria-label={`${dish.name} quantity`}><button type="button" onClick={() => changeQuantity(dish.id, -1)} aria-label={`Remove one ${dish.name}`} disabled={quantity === 0}>−</button><output aria-live="polite">{quantity}</output><button type="button" onClick={() => changeQuantity(dish.id, 1)} aria-label={`Add one ${dish.name}`} disabled={quantity === 10}>+</button></div></div>
                </div>
              </article>
            })}
          </div>
        
        </section>

        <section className="content-section how-section" id="how">
          <div className="section-head"><div><span className="section-kicker">SIMPLE AS THAT</span><h2>How it works</h2></div><p>Three steps. No account, no app.</p></div>
          <div className="steps">
            <article className="step-card"><span className="step-number">01</span><h3>Choose your items</h3><p>Add what you want from the menu. Your order total updates as you go.</p></article>
            <article className="step-card"><span className="step-number">02</span><h3>Send on WhatsApp</h3><p>Tap the order button. Your items, quantities, and spice choices fill the message for you.</p></article>
            <article className="step-card"><span className="step-number">03</span><h3>Collect near UII</h3><p>Give your pickup time in the chat. Pay by QRIS or cash when you collect.</p></article>
          </div>
        </section>

        <section id="order" className="order-section"><div className="order-panel"><span className="section-kicker">MADE FRESH FOR YOU</span><h2>Ready when you are</h2><p>Add your items above and send the order in one message. Or WhatsApp us directly at <a href="https://wa.me/6285741965003" target="_blank" rel="noreferrer">+62 857-4196-5003</a>.</p><button className="button button-light" type="button" onClick={sendOrder}>Order on WhatsApp <span aria-hidden="true">↗</span></button></div></section>
      </main>
      <Footer />
      <div className={`cart-bar ${count > 0 ? 'cart-visible' : ''}`} role="region" aria-label="Your order" aria-live="polite" aria-hidden={count === 0}>
        <div className="cart-inner"><div className="cart-info"><span>{count} {count === 1 ? 'item' : 'items'}</span><strong>{formatPrice(total)}</strong></div><div className="cart-actions"><button className="cart-clear" type="button" onClick={() => setQuantities({})}>Clear</button><button className="button cart-send" type="button" onClick={sendOrder}>Order on WhatsApp <span aria-hidden="true">↗</span></button></div></div>
      </div>
    </>
  )
}

export default MainApp
