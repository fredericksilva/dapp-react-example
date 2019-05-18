import React from "react"
import WalletConnectProvider from "walletconnect-provider/src/index.js"
import Web3 from "web3"

import Header from "./components/header"

class App extends React.Component {
  async connectToWallet() {
    const maticProvider = new WalletConnectProvider({
      host: "https://testnet2.matic.network"
    })

    const web3 = new Web3(maticProvider)
    web3.eth.getAccounts().then(accounts => {
      console.log(accounts)
    })
  }

  render() {
    return (
      <div>
        <Header />
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
      </div>
    )
  }
}

export default App
