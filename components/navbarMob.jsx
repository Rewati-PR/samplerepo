import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavbarMob extends Component {
  render() {
    let brandNames = ["Samsung", "Xiaomi", "Realme","Apple"];
    let rams = ["3GB", "4GB", "6GB","8GB"];
    let roms = ["32GB", "64GB", "128GB", "256GB"];
    let os = ["Android", "iOS"];
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          MobilePortal
        </Link>
        <div className="">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/mobiles">
                Mobiles
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                Brands
              </a>
              <div className="dropdown-menu">
                {brandNames.map((n1) => (
                  <Link key={n1} className="dropdown-item" to={`/brand/${n1}`}>
                    {n1}
                  </Link>
                ))}
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                RAM
              </a>
              <div className="dropdown-menu">
                {rams.map((n1) => (
                  <Link key={n1} className="dropdown-item" to={`/RAM/${n1}`}>
                    {n1}
                  </Link>
                ))}
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                ROM
              </a>
              <div className="dropdown-menu">
                {roms.map((n1) => (
                  <Link key={n1} className="dropdown-item" to={`/ROM/${n1}`}>
                    {n1}
                  </Link>
                ))}
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                OS
              </a>
              <div className="dropdown-menu">
                {os.map((n1) => (
                  <Link key={n1} className="dropdown-item" to={`/OS/${n1}`}>
                    {n1}
                  </Link>
                ))}
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/newMobile">
                New Mobile
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default NavbarMob;
