import React from "react"
import WalletConnectProvider from "walletconnect-provider/src/index.js"
import Web3 from "web3"

import Header from "./components/header"

let storage = null
if (typeof window.localStorage !== "undefined") {
  storage = window.localStorage
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: null }
    this.checkAuth()
  }

  checkAuth = () => {
    if (storage && storage.getItem("loggedIn")) {
      this.connectToWallet()
    }
  }

  onConnect = () => {
    if (storage) {
      storage.setItem("loggedIn", true)
    }
  }

  onDisconnect = () => {
    this.setState({
      address: null
    })

    if (storage) {
      storage.removeItem("loggedIn")
    }
  }

  connectToWallet = () => {
    const maticProvider = new WalletConnectProvider({
      host: "https://testnet2.matic.network",
      callbacks: {
        onConnect: this.onConnect,
        onDisconnect: this.onDisconnect
      }
    })

    const ropstenProvider = new WalletConnectProvider({
      host: "https://testnet2.matic.network",
      callbacks: {
        onConnect: this.onConnect,
        onDisconnect: this.onDisconnect
      }
    })

    const maticWeb3 = new Web3(maticProvider)
    const ropstenWeb3 = new Web3(ropstenProvider)

    // fetch accounts
    maticWeb3.eth.getAccounts().then(accounts => {
      // set address
      this.setState({
        maticWeb3,
        ropstenWeb3,
        maticProvider,
        ropstenProvider,
        address: accounts[0]
      })
    })
  }

  disconnect = () => {
    const { maticProvider, ropstenProvider } = this.state
    if (maticProvider) {
      maticProvider.disconnect()
    }

    if (ropstenProvider) {
      ropstenProvider.disconnect()
    }
  }

  connectScreen() {
    return (
      <div className="screen-middle-container d-flex justify-content-center">
        <div className="align-self-center">
          <button
            className="btn btn-primary btn-lg"
            onClick={this.connectToWallet}
          >
            Connect to Wallet
          </button>
        </div>
      </div>
    )
  }

  homeScreen() {
    return <div className="container">Hello</div>
  }

  render() {
    const { address } = this.state
    return (
      <div>
        <Header address={address} disconnect={this.disconnect} />
        {!address ? this.connectScreen() : this.homeScreen()}
      </div>
    )
  }
}

export default App
