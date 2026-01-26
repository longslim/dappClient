import React from "react"
import "./footer.css"

const Footer = () => {
  const images = [
    { name: "Discord", image: "/discord.svg" },
    { name: "Telegram", image: "/telegram.svg" },
    { name: "Twitter", image: "/twitter.svg" },
    { name: "Github", image: "/github.svg" }
  ]

  return (
    <div className="footer">
      {images.map((item, index) => (
        <div className="footer_item" key={index}>
          <img src={item.image} alt={item.name} />
          <h5>{item.name}</h5>
        </div>
      ))}
    </div>
  )
}

export default Footer
