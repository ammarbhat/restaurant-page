import { useMemo, useState } from 'react'
import Footer from './Components/Footer'

const whatsappNumber = '6285741965003'
const dishes = [
  { id: 'samosa', name: ['Samosa', 'Samosa'], price: 15000, image: '/samosa.jpg', alt: ['Golden samosas ready to serve', 'Samosa keemasan siap disajikan'], tags: [0, 1], description: ['Crisp pastry filled with spiced potato. Good between classes.', 'Pastry renyah berisi kentang berbumbu. Cocok untuk camilan di sela kelas.'] },
  { id: 'pakora', name: ['Pakora', 'Pakora'], price: 15000, image: '/indian-cuisine-paneer-pakora-cheese-photo.webp', alt: ['Freshly fried pakora', 'Pakora yang baru digoreng'], tags: [0, 1], description: ['Golden vegetable fritters, served hot. Light and easy to share.', 'Gorengan sayur keemasan, disajikan hangat. Ringan dan pas untuk berbagi.'] },
  { id: 'paneer', name: ['Paneer plate', 'Hidangan paneer'], price: 25000, image: '/shahi-paneer-paneer-kadai_926199-2764613.webp', alt: ['Paneer curry served with rice', 'Kari paneer disajikan dengan nasi'], tags: [0, 2], description: ['Paneer curry with rice. Pick your spice level below.', 'Kari paneer dengan nasi. Pilih tingkat kepedasan di bawah.'], spice: true },
  { id: 'combo', name: ['Combo', 'Paket combo'], price: 36000, image: '/i-ate-indian-curry-combo-plate-v0-nw9b7fetegue1.webp', alt: ['Indian curry and rice combo plate', 'Paket kari India dan nasi'], tags: [0, 3], description: ['One samosa plus a paneer plate. A fuller meal at a student price.', 'Satu samosa dan satu hidangan paneer. Porsi lengkap dengan harga pelajar.'], spice: true },
]

const copy = {
  en: {
    language: 'Bahasa Indonesia', nav: ['Menu', 'How it works', 'Order'], eyebrow: 'Vegetarian · Campus preorder', headline: <>Home-style Indian food, <em>made for student budgets.</em></>, lead: 'Fresh plates from a rented kitchen in Yogyakarta. Pick your items, send one WhatsApp message, and collect near UII.', seeMenu: 'See the menu', how: 'How it works', glance: 'At a glance', facts: [['Snacks from Rp 15.000', 'Samosa and pakora for between classes'], ['Full plates from Rp 25.000', 'Paneer curry with rice, mild to spicy'], ['Pickup near UII', 'Pay by QRIS or cash when you collect'], ['No app needed', 'Order through WhatsApp in under a minute']], cooked: 'COOKED WITH CARE', menu: 'The menu', tags: ['Vegetarian', 'Snack', 'Main', 'Best value'], spice: 'Spice level', mild: 'Mild', medium: 'Medium', spicy: 'Spicy', spiceOptions: ['Mild', 'Medium', 'Spicy'], quantity: 'Quantity', remove: 'Remove one', add: 'Add one', simple: 'SIMPLE AS THAT', stepsTitle: 'How it works', stepsIntro: 'Three steps. No account, no app.', steps: [['Choose your items', 'Add what you want from the menu. Your order total updates as you go.'], ['Send on WhatsApp', 'Tap the order button. Your items, quantities, and spice choices fill the message for you.'], ['Collect near UII', 'Give your pickup time in the chat. Pay by QRIS or cash when you collect.']], fresh: 'MADE FRESH FOR YOU', ready: 'Ready when you are', orderText: 'Add your items above and send the order in one message. Or WhatsApp us directly at', order: 'Order on WhatsApp', items: 'items', item: 'item', clear: 'Clear', yourOrder: 'Your order', greeting: 'Hi Ghar Jogja! I want to order:', ask: 'Hi Ghar Jogja! I would like to ask about the menu.', pickup: 'Pickup time:', name: 'Name:', total: 'Total:',
  },
  id: {
    language: 'English', nav: ['Menu', 'Cara pesan', 'Pesan'], eyebrow: 'Vegetarian · Pesan awal kampus', headline: <>Masakan India rumahan, <em>ramah untuk kantong mahasiswa.</em></>, lead: 'Hidangan segar dari dapur rumahan di Yogyakarta. Pilih menu, kirim satu pesan WhatsApp, lalu ambil pesanan dekat UII.', seeMenu: 'Lihat menu', how: 'Cara pesan', glance: 'Sekilas info', facts: [['Camilan mulai Rp 15.000', 'Samosa dan pakora untuk sela kelas'], ['Menu lengkap mulai Rp 25.000', 'Kari paneer dengan nasi, dari ringan hingga pedas'], ['Ambil dekat UII', 'Bayar dengan QRIS atau tunai saat mengambil'], ['Tidak perlu aplikasi', 'Pesan lewat WhatsApp dalam kurang dari semenit']], cooked: 'DIMASAK DENGAN SEPENUH HATI', menu: 'Menu', tags: ['Vegetarian', 'Camilan', 'Menu utama', 'Paling hemat'], spice: 'Tingkat pedas', mild: 'Ringan', medium: 'Sedang', spicy: 'Pedas', spiceOptions: ['Ringan', 'Sedang', 'Pedas'], quantity: 'Jumlah', remove: 'Kurangi satu', add: 'Tambah satu', simple: 'MUDAH SEKALI', stepsTitle: 'Cara pesan', stepsIntro: 'Tiga langkah. Tanpa akun dan aplikasi.', steps: [['Pilih menu', 'Tambahkan menu yang kamu inginkan. Total pesanan akan diperbarui otomatis.'], ['Kirim lewat WhatsApp', 'Tekan tombol pesan. Menu, jumlah, dan pilihan pedas akan terisi otomatis.'], ['Ambil dekat UII', 'Tentukan waktu pengambilan lewat chat. Bayar dengan QRIS atau tunai.']], fresh: 'DIBUAT SEGAR UNTUKMU', ready: 'Siap kapan saja', orderText: 'Pilih menu di atas lalu kirim pesanan dalam satu pesan. Atau hubungi kami langsung lewat WhatsApp di', order: 'Pesan lewat WhatsApp', items: 'item', item: 'item', clear: 'Kosongkan', yourOrder: 'Pesanan Anda', greeting: 'Halo Ghar Jogja! Saya ingin memesan:', ask: 'Halo Ghar Jogja! Saya ingin bertanya tentang menu.', pickup: 'Waktu pengambilan:', name: 'Nama:', total: 'Total:',
  },
}

const formatPrice = (amount) => `Rp ${amount.toLocaleString('id-ID')}`

function MainApp() {
  const [quantities, setQuantities] = useState({})
  const [spices, setSpices] = useState({})
  const [language, setLanguage] = useState('en')
  const t = copy[language]
  const selectedItems = useMemo(() => dishes.filter((dish) => quantities[dish.id] > 0), [quantities])
  const count = selectedItems.reduce((sum, dish) => sum + quantities[dish.id], 0)
  const total = selectedItems.reduce((sum, dish) => sum + dish.price * quantities[dish.id], 0)

  const changeQuantity = (id, amount) => {
    setQuantities((current) => ({ ...current, [id]: Math.max(0, Math.min(10, (current[id] || 0) + amount)) }))
  }

  const sendOrder = () => {
    const lines = selectedItems.length
      ? [t.greeting, ...selectedItems.map((dish) => {
        const spice = dish.spice ? ` (${t.spiceOptions[['Mild', 'Medium', 'Spicy'].indexOf(spices[dish.id] || 'Medium')]})` : ''
        const name = dish.name[language === 'en' ? 0 : 1]
        const qty = quantities[dish.id]
        return `- ${name}${spice} x${qty} = ${formatPrice(qty * dish.price)}`
      }), `${t.total} ${formatPrice(total)}`, `${t.pickup} `, `${t.name} `]
      : [t.ask]
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <a className="logo" href="#top"><span className="logo-dot" aria-hidden="true" />Ghar Jogja</a>
          <nav className="nav-links" aria-label={language === 'en' ? 'Main navigation' : 'Navigasi utama'}>
            <a href="#menu">{t.nav[0]}</a><a href="#how">{t.nav[1]}</a><a className="nav-order" href="#order">{t.nav[2]}</a>
          </nav>
        </div>
      </header>

      <main id="top" className="page-shell">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow"><span aria-hidden="true">✦</span> {t.eyebrow}<button className="language-toggle" type="button" onClick={() => setLanguage(language === 'en' ? 'id' : 'en')} aria-label={`Switch language to ${t.language}`}>{t.language}</button></span>
            <h1>{t.headline}</h1>
            <p className="lead">{t.lead}</p>
            <div className="hero-actions"><a className="button button-primary" href="#menu">{t.seeMenu} <span aria-hidden="true">↓</span></a><a className="button button-outline" href="#how">{t.how}</a></div>
          </div>
          <aside className="hero-card" aria-label={t.glance}>
            <h2>{t.glance}</h2>
            <ul className="facts">
              {['🥟', '🍛', '⌖', '↗'].map((icon, index) => <li key={t.facts[index][0]}><span className="fact-icon">{icon}</span><span>{t.facts[index][0]}<small>{t.facts[index][1]}</small></span></li>)}
            </ul>
          </aside>
        </section>

        <section className="content-section" id="menu">
          <div className="section-head"><div><span className="section-kicker">{t.cooked}</span><h2>{t.menu}</h2></div></div>
          <div className="menu-grid">
            {dishes.map((dish) => {
              const quantity = quantities[dish.id] || 0
              const name = dish.name[language === 'en' ? 0 : 1]
              return <article className="dish-card" key={dish.id}>
                <img className="dish-image" src={dish.image} alt={dish.alt[language === 'en' ? 0 : 1]} loading="lazy" />
                <div className="dish-content">
                  <div className="dish-heading"><h3>{name}</h3><span className="price">{formatPrice(dish.price)}</span></div>
                  <div className="tags">{dish.tags.map((tag) => <span className={`tag ${tag ? 'tag-warm' : ''}`} key={tag}>{t.tags[tag]}</span>)}</div>
                  <p className="dish-description">{dish.description[language === 'en' ? 0 : 1]}</p>
                  {dish.spice && <label className="spice-select">{t.spice}<select value={spices[dish.id] || 'Medium'} onChange={(event) => setSpices((current) => ({ ...current, [dish.id]: event.target.value }))}>{['Mild', 'Medium', 'Spicy'].map((value, index) => <option value={value} key={value}>{t.spiceOptions[index]}</option>)}</select></label>}
                  <div className="dish-foot"><span className="quantity-label">{t.quantity}</span><div className="stepper" aria-label={`${name} · ${t.quantity}`}><button type="button" onClick={() => changeQuantity(dish.id, -1)} aria-label={`${t.remove} ${name}`} disabled={quantity === 0}>−</button><output aria-live="polite">{quantity}</output><button type="button" onClick={() => changeQuantity(dish.id, 1)} aria-label={`${t.add} ${name}`} disabled={quantity === 10}>+</button></div></div>
                </div>
              </article>
            })}
          </div>
        </section>

        <section className="content-section how-section" id="how">
          <div className="section-head"><div><span className="section-kicker">{t.simple}</span><h2>{t.stepsTitle}</h2></div><p>{t.stepsIntro}</p></div>
          <div className="steps">{t.steps.map(([title, text], index) => <article className="step-card" key={title}><span className="step-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section id="order" className="order-section"><div className="order-panel"><span className="section-kicker">{t.fresh}</span><h2>{t.ready}</h2><p>{t.orderText} <a href="https://wa.me/6285741965003" target="_blank" rel="noreferrer">+62 857-4196-5003</a>.</p><button className="button button-light" type="button" onClick={sendOrder}>{t.order} <span aria-hidden="true">↗</span></button></div></section>
      </main>
      <Footer language={language} />
      <div className={`cart-bar ${count > 0 ? 'cart-visible' : ''}`} role="region" aria-label={t.yourOrder} aria-live="polite" aria-hidden={count === 0}>
        <div className="cart-inner"><div className="cart-info"><span>{count} {count === 1 ? t.item : t.items}</span><strong>{formatPrice(total)}</strong></div><div className="cart-actions"><button className="cart-clear" type="button" onClick={() => setQuantities({})}>{t.clear}</button><button className="button cart-send" type="button" onClick={sendOrder}>{t.order} <span aria-hidden="true">↗</span></button></div></div>
      </div>
    </>
  )
}

export default MainApp
