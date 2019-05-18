import React from "react"

class Header extends React.Component {
  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-light">
        <div id="navbarSupportedContent" className="collapse navbar-collapse">
          <ul className="navbar-nav justify-content-end ml-auto">
            <li className="nav-item">
              <a className="nav-link nuxt-link-active" href="#">
                Connect to Wallet
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Header
