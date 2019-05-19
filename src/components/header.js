import React from "react"

class Header extends React.Component {
  render() {
    const { address, disconnect } = this.props
    return (
      <div className="navbar navbar-expand-lg navbar-light">
        <div id="navbarSupportedContent" className="collapse navbar-collapse">
          <ul className="navbar-nav justify-content-end ml-auto">
            <li className="nav-item">
              {address ? (
                <div className="small">
                  <div className="text-muted">{address}</div>
                  <div
                    className="cursor-pointer text-right"
                    onClick={disconnect}
                  >
                    {address ? "Disconnect" : null}
                  </div>
                </div>
              ) : (
                <div className="nav-link text-muted small">
                  No wallet connected
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Header
