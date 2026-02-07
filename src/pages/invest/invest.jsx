import React, { useState } from 'react'
import "./invest.css"

const financePlans = [
    { title: "Stake USDT", apy: "12% APY", desc: "Stable investment with guaranteed rewards." },
    { title: "Stake ETH", apy: "9% APY", desc: "Earn rewards by staking Ethereum securely." },
    { title: "BTC Liquidity Pool", apy: "18% APR", desc: "High yield farming pool for BTC holders." },
];
  
const transactions = [
    { type: "Deposit", asset: "USDT", amount: "$500", status: "Success" },
    { type: "Stake", asset: "ETH", amount: "0.2 ETH", status: "Pending" },
    { type: "Withdraw", asset: "BTC", amount: "0.01 BTC", status: "Success" },
];
  
const nftItems = [
    { name: "Cyber Ape #103", price: "0.45 ETH", img: "https://i.seadn.io/gae/bk0bG6hV9n5g6vTQF3zX7a2P5nW1uVd7g2ZK6j4g?auto=format&dpr=1&w=500" },
    { name: "Meta Samurai #22", price: "0.78 ETH", img: "https://i.seadn.io/gae/1lq5rPzZQy3gZPqZ6c2bD9v2B0Vx8kQ?auto=format&dpr=1&w=500" },
    { name: "Pixel Dragon #88", price: "0.32 ETH", img: "https://i.seadn.io/gae/zHcT6qkTz4yZ2gXf9yRZbXQ?auto=format&dpr=1&w=500" },
    { name: "Crypto Queen #09", price: "1.05 ETH", img: "https://i.seadn.io/gae/nm9e4gTqXQd1u3yYq9Gv?auto=format&dpr=1&w=500" },
];

const Invest = () => {

    cont [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="investment_layout">

      
      {sidebarOpen && <div className="sidebar_overlay" onClick={() => setSidebarOpen(false)}></div>}

      
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="sidebar_logo">
          Dapp<span>X</span>
        </h2>

        <ul className="sidebar_links">
          <li><a href="#finance" onClick={() => setSidebarOpen(false)}>Finance</a></li>
          <li><a href="#staking" onClick={() => setSidebarOpen(false)}>Staking</a></li>
          <li><a href="#marketplace" onClick={() => setSidebarOpen(false)}>NFT Marketplace</a></li>
          <li><a href="#transactions" onClick={() => setSidebarOpen(false)}>Transactions</a></li>
        </ul>

        <button className="sidebar_btn">Connect Wallet</button>
      </aside>

      
      <main className="main_content">

        
        <header className="top_nav">
          <button className="menu_btn" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>

          <h3 className="top_title">Investment Dashboard</h3>

          <button className="connect_btn">Connect</button>
        </header>

        
        <section className="hero">
          <div className="hero_text">
            <h1>
              Invest Smarter in <span>DeFi</span> & <span>NFTs</span>
            </h1>
            <p>
              Earn rewards from staking, liquidity pools and explore exclusive NFT
              collections — all in one platform.
            </p>

            <div className="hero_buttons">
              <button className="primary_btn">Start Investing</button>
              <button className="secondary_btn">Explore NFTs</button>
            </div>
          </div>

          <div className="hero_stats">
            <div className="stat_card">
              <h3>$12,450</h3>
              <p>Total Portfolio</p>
            </div>
            <div className="stat_card">
              <h3>+ $1,240</h3>
              <p>Total Earnings</p>
            </div>
            <div className="stat_card">
              <h3>18%</h3>
              <p>Highest APR</p>
            </div>
          </div>
        </section>

        
        <section id="finance" className="finance_section">
          <div className="section_title">
            <h2>Finance Session (DeFi)</h2>
            <p>Choose your best investment plan and earn daily rewards.</p>
          </div>

          <div className="finance_cards">
            {financePlans.map((plan, index) => (
              <div className="finance_card" key={index}>
                <h3>{plan.title}</h3>
                <h4>{plan.apy}</h4>
                <p>{plan.desc}</p>

                <div className="card_buttons">
                  <button className="primary_btn small">Deposit</button>
                  <button className="secondary_btn small">Withdraw</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        
        <section id="staking" className="staking_section">
          <div className="section_title">
            <h2>Staking Dashboard</h2>
            <p>Track your staking activity and investment history.</p>
          </div>

          <div className="staking_grid">
            <div className="staking_box">
              <h3>Active Staking</h3>
              <p className="big_text">$4,500</p>
              <span className="badge green">+12% APY</span>
            </div>

            <div className="staking_box">
              <h3>Locked Assets</h3>
              <p className="big_text">$2,300</p>
              <span className="badge blue">30 Days Lock</span>
            </div>

            <div className="staking_box">
              <h3>Rewards Earned</h3>
              <p className="big_text">$890</p>
              <span className="badge gold">Claimable</span>
            </div>
          </div>

          
          <div id="transactions" className="transaction_box">
            <h3>Recent Transactions</h3>

            <div className="transaction_table">
              {transactions.map((t, index) => (
                <div className="transaction_row" key={index}>
                  <p>{t.type}</p>
                  <p>{t.asset}</p>
                  <p>{t.amount}</p>
                  <p className={t.status === "Success" ? "success" : "pending"}>
                    {t.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        <section id="marketplace" className="nft_section">
          <div className="section_title">
            <h2>NFT Marketplace</h2>
            <p>Discover rare NFTs and purchase instantly.</p>
          </div>

          <div className="nft_grid">
            {nftItems.map((nft, index) => (
              <div className="nft_card" key={index}>
                <img src={nft.img} alt={nft.name} />
                <div className="nft_info">
                  <h3>{nft.name}</h3>
                  <p>{nft.price}</p>
                  <button className="primary_btn small">Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        
        <footer className="investment_footer">
          <p>Dapp Finance. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}

export default Invest
