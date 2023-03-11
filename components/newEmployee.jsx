import React, { Component } from "react";
import http from "./httpService";
class NewEmployee extends Component {
  state = {
    emp: {empCode: "", name: "", department: "", designation: "", salary:"",gender:"" },
    deptOpt : ["Finance", "HR", "Technology","Marketing"],
    desigOpt :  ["VP", "Manager", "Trainee"],
    errors : {},
    edit:false,
  };
  async componentDidMount(){
    this.fetchData();
  }
  async componentDidUpdate(prevProps,prevState){
   if(prevProps !== this.props) this.fetchData();
  }
  async fetchData(){
    const {id} = this.props.match.params;
    if(id){
      let response = await http.get(`/svr/employees/${id}`);
      let {data} = response;
      this.setState({emp : data, edit:true});
    }
    else{
     let  emp = { empCode: "", name: "", department: "", designation: "", salary:"",gender:"" };
     this.setState ({ emp:emp, edit:false});
    }
  }


 handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.emp[input.name] = input.value;
    this.handleValidate(e);
    this.setState(s1);
  };
 async postData(url, obj) {
    let response = await http.post(url, obj);
    let {data} = response;
    console.log(data);
    this.props.history.push("/emps");
  }
  async putData(url, obj) {
    let response = await http.put(url, obj);
    let {data} = response;
    console.log(data);
    this.props.history.push("/emps");
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    let errors = this.validateAll();
    if(this.isValid(errors)){
        let {emp,edit} = this.state;
        edit ? this.putData(`/svr/employees/${emp.id}`,emp) : this.postData("/svr/employees", emp);
    }
    else{
        let s1={...this.state};
        s1.errors = errors ;
         this.setState(s1);
    }
 };

 handleValidate=(e) =>{
  let {currentTarget: input} = e;
  let s1 = {...this.state};
  switch(input.name) {
    case "empCode" : s1.errors.empCode = this.validateCode(input.value); break;
    case "name" : s1.errors.name = this.validateName(input.value); break;
    case "department" : s1.errors.department = this.validateDept(input.value); break;
    case "designation" : s1.errors.designation = this.validateDesig(input.value); break;
    case "salary" : s1.errors.salary = this.validateSalary(input.value); break;
    default: break;
  }
  this.setState(s1);
 };

 isValid=(errors)=>{
  let keys = Object.keys(errors);
  let count = keys.reduce((acc,curr)=> errors[curr] ? acc+1 : acc ,0);
  return count===0;
 };
isFormValid=() =>{
let errors = this.validateAll();
return this.isValid(errors);
};

 validateAll = () =>{
 let { empCode,name,department,designation,salary} = this.state.emp;
 let errors = {};
 errors.empCode = this.validateCode(empCode);
 errors.name = this.validateName(name);
 errors.department = this.validateDept(department);
 errors.designation = this.validateDesig(designation);
 errors.salary = this.validateSalary(salary);
 return errors;
 };

 validateCode = (empCode) => !empCode ? "Code must be entered" : "";
 validateName = (name) => !name ? "Name must be entered" : "";
 validateDept = (department) => !department ? "Department must be selected" : "";
 validateDesig = (designation) => !designation ? "Designation must be selected" : "";
 validateSalary = (salary) => !salary ? "Salary must be entered" : "";



  render() {
    let { empCode,name,department,designation,salary,gender } = this.state.emp;
    const { deptOpt,desigOpt,errors} = this.state;
    return (
      <div className="container">
         <div className="form-group mt-2">
          <label>Employee Code</label>
          <input
            type="text"
            className="form-control"
            id="empCode"
            name="empCode"
            placeholder="Enter Code"
            value={empCode}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
          />
          {errors.empCode ? <span className="text-danger">{errors.empCode}</span> : ""}
        </div>
        <br/>
        <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Enter Name"
          value={name}
          onChange={this.handleChange}
          onBlur={this.handleValidate}
        />
        {errors.name ? <span className="text-danger">{errors.name}</span> : ""}
      </div><br/>
        <div className="form-group">
        <label>Department</label>
          <select
            className="form-control"
            id="department"
            name="department"
            value={department}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
          >
            <option disabled value="">Select Department</option>
            {deptOpt.map((opt) => (
              <option>{opt}</option>
            ))}
          </select>
          {errors.department ? <span className="text-danger">{errors.department}</span> : ""}
          <br />
        </div>
        <div className="form-group">
        <label>Designation</label>
          <select
            className="form-control"
            id="designation"
            name="designation"
            value={designation}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
          >
            <option disabled value="">Select Designation</option>
            {desigOpt.map((opt) => (
              <option>{opt}</option>
            ))}
          </select>
          {errors.designation ? <span className="text-danger">{errors.designation}</span> : ""}
          <br />
        </div>
        <div className="form-group">
        <label>Salary</label>
        <input
          type="text"
          className="form-control"
          id="salary"
          name="salary"
          placeholder="Enter Salary"
          value={salary}
          onChange={this.handleChange}
          onBlur={this.handleValidate}
        />
        {errors.salary ? <span className="text-danger">{errors.salary}</span> : ""}
      </div><br/>
      <div className="form-check form-check-inline">
            <input type="radio" className="form-check-input" name="gender"  value="Male" checked={gender==="Male"}  onChange={this.handleChange} />
            <label className="form-check-label">Male</label>
        </div>
        <div className="form-check form-check-inline">
            <input type="radio" className="form-check-input" name="gender"  value="Female" checked={gender==="Female"}  onChange={this.handleChange} />
            <label className="form-check-label">Female</label>
        </div><br/>
          
        <button className="btn btn-primary mt-2" disabled={!this.isFormValid()} onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default NewEmployee;
