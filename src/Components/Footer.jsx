function Footer({ language = 'en' }) {
  const caption = language === 'id'
    ? 'Pesan awal kampus · Yogyakarta · Masakan India vegetarian untuk mahasiswa'
    : 'Campus preorder · Yogyakarta · Vegetarian Indian food for students'
  return (
    <footer className="site-footer">
      <strong>Ghar Jogja</strong><br />
      {caption}
    </footer>
  )
}

export default Footer
