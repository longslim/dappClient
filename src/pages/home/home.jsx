import React from 'react'
import "./home.css"
import Wallet from '../wallets/wallet'
import Footer from '../../components/footer/footer'

const Home = () => {
  return (
    <div className="home_container">
      <div className="home_header">
        <h4>WalletConnect</h4>
        <h4>Open protocol for connecting Wallets to Dapps</h4>
      </div>

      <div className="home_section">
        <h2>What's WalletConnect?</h2>
        <p>
          WalletConnect is an open source protocol for connecting decentralised
          applications to mobile wallets with QR code <br />
          scanning or deep linking. A user can interact securely with any Dapp
          from their mobile phone, making <br />
          WalletConnect wallets a safer choice compared to desktop or browser
          extension wallets.
        </p>
      </div>

      <div className="home_section">
        <h2>How does it work?</h2>
        <p>
          WalletConnect connects web applications to supported mobile wallets.
          WalletConnect session is started by scanning a QR code (desktop) or by
          clicking an application deep link (mobile).
        </p>
      </div>

      <div className="home_section">
        <h2>Wallets</h2>
        <p>
          Multiple iOS and Android wallets support the WalletConnect protocol.
          Interaction between mobile apps and mobile browsers are supported via
          mobile deep linking.
        </p>
      </div>

      <div className="home_wallets">
        <Wallet />
      </div>

      <div className="home_footer">
        <Footer />
      </div>
    </div>
  )
}


export default Home
