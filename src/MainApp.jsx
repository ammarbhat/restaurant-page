import React from 'react'
import Home from "./Components/Home"
import Menu from "./Components/Menu"
import Card from "./Components/Card"
import Data from "./data.jsx"
import Contact from "./Components/Contact"
import { Element } from 'react-scroll'
import Navbar from "./Components/Navbar";
import Footer from './Components/Footer'
function MainApp() {
    const cards = Data.map(item => {
    
        return (
            <Card
                code={item.code}
                img={item.img}
                des={item.des}
                price={item.price}
                name={item.name}
                key={item.code}
            />
        )
    })
  return (
    <>
        <Navbar />
    <Element name="Home">
    <Home />
    </Element>
    <Element name="Menu">
    <Menu /> 
    <div className="flex flex-wrap justify-center">
    {cards}
    </div></Element>
    <Element name="Contact"><Contact /></Element>
    <Footer />
  </>
  )
}

export default MainApp