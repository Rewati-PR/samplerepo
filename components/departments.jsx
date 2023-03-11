import React, { Component } from "react";
import http from "./httpService";
class Departments extends Component {
state = {
    emp: [],
  };
  async fetchData() {
    let response = await http.get("/svr/employees");
    let { data } = response;
    console.log(data);
    this.setState({ emp: data });
  }
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }
  

  render() {
    const { emp} = this.state;
    const {dept} = this.props.match.params;
    const emp1 = emp.filter((e)=>e.department===dept);
    return (
      <div className="container">
        <div className="row bg-info text-center">
          <div className="col-1 border">Id</div>
          <div className="col-2 border">EmpCode</div>
          <div className="col-2 border">Name</div>
          <div className="col-2 border">Department</div>
          <div className="col-2 border">Designation</div>
          <div className="col-1 border">Salary</div>
          <div className="col-2 border">Gender</div>
        </div>
        {emp1.map((e) => (
          <div className="row text-center" key={e.id}>
            <div className="col-1 border">{e.id}</div>
           <div className="col-2 border">{e.empCode}</div>
           <div className="col-2 border">{e.name}</div>
           <div className="col-2 border">{e.department}</div>
           <div className="col-2 border">{e.designation}</div>
           <div className="col-1 border">{e.salary}</div>
           <div className="col-2 border">{e.gender}</div>
          </div>
        ))}
        </div>
    );
  }
}
export default Departments;
