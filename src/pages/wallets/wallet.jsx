import React from 'react'
import "./wallet.css"
import { useNavigate } from 'react-router-dom'


const Wallet = () => {

    const navigate = useNavigate()

    const images = import.meta.glob("../../assets/wallets/*.{png,jpg,jpeg}", {
        eager: true
    })

    const wallets = Object.entries(images)
  .map(([path, module]) => {
    const raw = path.split("/").pop().split(".")[0];

    const slug = raw.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/_/g, "-")

    const name = raw
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

      

    return {
      key: slug,
      name,
      image: module.default,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

  const handleClick = (wallet) => {
    navigate(`/phrases/${wallet.key}`)
  }

  return (
    <div className='wallet_grid'>
      {wallets.map((wallet) => (
        <div 
            className='wallet_card' 
            key={wallet.key}
            onClick={() => handleClick(wallet)}    
        >
            <img src={wallet.image} alt={wallet.name} />
            <p>{wallet.name}</p>
        </div>
      ))}
    </div>
  )
}

export default Wallet
