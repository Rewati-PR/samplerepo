import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavbarEmp extends Component {
  render() {
    let deptNames = ["Finance", "HR", "Technology","Marketing"];
    let desig = ["VP", "Manager", "Trainee"];
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          EmpPrtal
        </Link>
        <div className="">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/emps">
                Employees
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                Departments
              </a>
              <div className="dropdown-menu">
                {deptNames.map((n1) => (
                  <Link key={n1} className="dropdown-item" to={`/department/${n1}`}>
                    {n1}
                  </Link>
                ))}
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                Designations
              </a>
              <div className="dropdown-menu">
                {desig.map((n1) => (
                  <Link key={n1} className="dropdown-item" to={`/designation/${n1}`}>
                    {n1}
                  </Link>
                ))}
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/newEmp">
                New Employee
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default NavbarEmp;
