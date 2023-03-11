import React, { Component } from "react";
import http from "./httpService";
import queryString from "query-string";
import OptionsEmp from "./optionsEmp";
class Emps extends Component {
state = {
    emp : [],
    deptOpt : ["Finance", "HR", "Technology","Marketing"],
    desigOpt :  ["VP", "Manager", "Trainee"],
    genderOpt : ["Male", "Female"],
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
  handleEdit(id){
    this.props.history.push(`/employees/${id}/edit`);
   }
  handleDelete(id){
    this.props.history.push(`/employees/${id}/delete`);
  }
  handleOptionChange = (options) => {
    this.callURL("/emps", options);
  };
  
    callURL = (url, options) => {
      let searchString = this.makeSearchString(options);
      console.log(searchString);
      this.props.history.push({
        pathname: url,
        search: searchString,
      });
    };
  
    makeSearchString = (options) => {
      let { department,designation,gender} = options;
      let searchStr = "";
      searchStr = this.addToQueryString(searchStr, "department", department);
      searchStr = this.addToQueryString(searchStr, "designation", designation);
      searchStr = this.addToQueryString(searchStr, "gender", gender);
      return searchStr;
    };
    addToQueryString = (str, paramName, paramValue) =>
      paramValue
        ? str
          ? `${str}&${paramName}=${paramValue}`
          : `${paramName}=${paramValue}`
        : str;
  

  render() {
    const { emp, deptOpt, desigOpt, genderOpt} = this.state;
    let queryParams = queryString.parse(this.props.location.search);
    console.log(queryParams);
    let emp1 = queryParams.department ? emp.filter((e)=>e.department===queryParams.department) : emp;
    let emp2 = queryParams.designation ? emp1.filter((e)=>e.designation===queryParams.designation) : emp1;
    let emp3 = queryParams.gender ? emp2.filter((e)=>e.gender===queryParams.gender) : emp2;
    return (
      <div className="container">
        <div className="row">
          <div className="col-2">
            <OptionsEmp
              options={queryParams}
              deptOpt={deptOpt}
              desigOpt={desigOpt}
              genderOpt={genderOpt}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-10">
        <div className="row bg-info text-center">
          <div className="col-1 border">Id</div>
          <div className="col-1 border">EmpCode</div>
          <div className="col-2 border">Name</div>
          <div className="col-2 border">Department</div>
          <div className="col-2 border">Designation</div>
          <div className="col-1 border">Salary</div>
          <div className="col-1 border">Gender</div>
          <div className="col-1 border"></div>
          <div className="col-1 border"></div>
        </div>
        {emp3.map((e) => (
          <div className="row text-center" key={e.id}>
            <div className="col-1 border">{e.id}</div>
           <div className="col-1 border">{e.empCode}</div>
           <div className="col-2 border">{e.name}</div>
           <div className="col-2 border">{e.department}</div>
           <div className="col-2 border">{e.designation}</div>
           <div className="col-1 border">{e.salary}</div>
           <div className="col-1 border">{e.gender}</div>
           <div className="col-1 border"><button className="btn btn-warning btn-sm" onClick={()=>this.handleEdit(e.id)}>Edit</button></div>
           <div className="col-1 border"><button className="btn btn-danger btn-sm" onClick={()=>this.handleDelete(e.id)}>Delete</button></div>
          </div>
        ))}
        </div>
        </div></div>
    );
  }
}
export default Emps;
