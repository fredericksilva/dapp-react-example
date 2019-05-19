import React from "react"

class Header extends React.Component {
  render() {
    const { address, testnetData, disconnect } = this.props
    return (
      <div className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <div id="navbarSupportedContent" className="collapse navbar-collapse">
            <ul className="navbar-nav justify-content-start">
              <li className="nav-item">
                {address ? (
                  <div className="small">
                    <div className="text-muted small">Connected</div>
                    <div>{testnetData.Matic.NetworkName}</div>
                  </div>
                ) : null}
              </li>
            </ul>
            <ul className="navbar-nav justify-content-end ml-auto">
              <li className="nav-item">
                {address ? (
                  <div className="small">
                    <div className="text-muted small">{address}</div>
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
      </div>
    )
  }
}

export default Header
