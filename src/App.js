import React from "react"
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"
import Web3 from "web3"
import Matic from "maticjs"

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

  checkAuth = async () => {
    if (storage && storage.getItem("loggedIn")) {
      await this.connectToWallet()
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

  connectToWallet = async () => {
    const maticJSONData = await fetch(
      "https://wallet.matic.today/addresses.json"
    ).then(res => {
      return res.json()
    })
    const testnetData = maticJSONData["TestnetV2"]

    const maticProvider = new WalletConnectProvider({
      host: testnetData.Matic.RPC,
      callbacks: {
        onConnect: this.onConnect,
        onDisconnect: this.onDisconnect
      }
    })

    const ropstenProvider = new WalletConnectProvider({
      host: testnetData.Main.RPC,
      callbacks: {
        onConnect: this.onConnect,
        onDisconnect: this.onDisconnect
      }
    })

    const maticWeb3 = new Web3(maticProvider)
    const ropstenWeb3 = new Web3(ropstenProvider)
    const maticObj = new Matic({
      maticProvider: maticProvider,
      parentProvider: ropstenProvider,
      rootChainAddress: testnetData.Main.Contracts.RootChain,
      withdrawManagerAddress: testnetData.Main.Contracts.WithdrawManager,
      depositManagerAddress: testnetData.Main.Contracts.DepositManager,
      syncerUrl: testnetData.Matic.SyncerAPI,
      watcherUrl: testnetData.Main.WatcherAPI,
      maticWethAddress: testnetData.Matic.Contracts.ChildWETH
    })

    // fetch accounts
    maticWeb3.eth.getAccounts().then(accounts => {
      // set address
      this.setState({
        testnetData,
        maticWeb3,
        ropstenWeb3,
        maticProvider,
        ropstenProvider,
        maticObj,
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

    this.onDisconnect()
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
    return (
      <div className="container">
        <div class="my-5">Hello</div>
      </div>
    )
  }

  render() {
    const { address, testnetData } = this.state
    return (
      <div>
        <Header
          address={address}
          testnetData={testnetData}
          disconnect={this.disconnect}
        />
        {!address ? this.connectScreen() : this.homeScreen()}
      </div>
    )
  }
}

export default App
