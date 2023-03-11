import React, { Component } from "react";
import http from "./httpService";
class NewMobile extends Component {
  state = {
    mobile: { name: "", price: "", brand: "", RAM:"", ROM:"", OS:"" },
    brandOpt :  ["Samsung", "Xiaomi", "Realme","Apple"],
    ramOpt : ["3GB", "4GB", "6GB","8GB"],
    romOpt : ["32GB", "64GB", "128GB", "256GB"],
    osOpt : ["Android", "iOS"],
    edit:false,
    errors:{},
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
      let response = await http.get(`/svr/mobiles/${id}`);
      let {data} = response;
      this.setState({mobile : data, edit:true});
    }
    else{
     let  mobile = { name: "", price: "", brand: "", RAM:"",ROM:"",OS:"" };
     this.setState ({ mobile : mobile, edit:false});
    }
  }


 handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.mobile[input.name] = input.value;
    this.handleValidate(e);
    this.setState(s1);
  };
 async postData(url, obj) {
    let response = await http.post(url, obj);
    let {data} = response;
    console.log(data);
    this.props.history.push("/mobiles");
  }

  async putData(url, obj) {
    let response = await http.put(url, obj);
    let {data} = response;
    console.log(data);
    this.props.history.push("/mobiles");
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    let errors = this.validateAll();
    if(this.isValid(errors)){
        let {mobile,edit} = this.state;
        edit ? this.putData(`/svr/mobiles/${mobile.id}`,mobile) : this.postData("/svr/mobiles", mobile);
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
    case "name" : s1.errors.name = this.validateName(input.value); break;
    case "price" : s1.errors.price = this.validatePrice(input.value); break;
    case "brand" : s1.errors.brand = this.validateBrand(input.value); break;
    case "RAM" : s1.errors.RAM = this.validateRAM(input.value); break;
    case "ROM" : s1.errors.ROM = this.validateROM(input.value); break;
    case "OS" : s1.errors.OS = this.validateOS(input.value); break;
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
 let { name,price,brand,RAM,ROM,OS} = this.state.mobile;
 let errors = {};
 errors.name = this.validateName(name);
 errors.price = this.validatePrice(price);
 errors.brand = this.validateBrand(brand);
 errors.RAM = this.validateRAM(RAM);
 errors.ROM = this.validateROM(ROM);
 errors.OS = this.validateOS(OS);
 return errors;
 };
 validateName = (name) => !name ? "Name must be entered" : "";
 validatePrice = (price) => !price ? "Price must be entered" : "";
 validateBrand = (brand) => !brand ? "Brand must be selected" : "";
 validateRAM = (RAM) => !RAM ? "RAM must be selected" : "";
 validateROM = (ROM) => !ROM ? "ROM must be selected" : "";
 validateOS = (OS) => !OS ? "OS must be entered" : "";

 render() {
    let { name,price,brand,RAM,ROM,OS } = this.state.mobile;
    const { brandOpt,ramOpt,romOpt,osOpt,errors} = this.state;
    return (
      <div className="container">
         <div className="form-group mt-2">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter Name"
            value={name}
            onBlur={this.handleValidate}
            onChange={this.handleChange}
         />
        {errors.name ? <span className="text-danger">{errors.name}</span> : ""}
        </div>
        <br/>
        <div className="form-group">
        <label>Price</label>
        <input
          type="text"
          className="form-control"
          id="price"
          name="price"
          placeholder="Enter Price"
          value={price}
          onChange={this.handleChange}
          onBlur={this.handleValidate}
        />
        {errors.price ? <span className="text-danger">{errors.price}</span> : ""}
      </div><br/>
        <div className="form-group">
        <label>Brand</label>
          <select
            className="form-control"
            id="brand"
            name="brand"
            value={brand}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
          >
            <option disabled value="">Select Brand</option>
            {brandOpt.map((opt) => (
              <option>{opt}</option>
            ))}
          </select>
          {errors.brand ? <span className="text-danger">{errors.brand}</span> : ""}
          <br />
        </div>
        <div className="form-group">
        <label>RAM</label>
          <select
            className="form-control"
            id="RAM"
            name="RAM"
            value={RAM}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
          >
            <option disabled value="">Select RAM</option>
            {ramOpt.map((opt) => (
              <option>{opt}</option>
            ))}
          </select>
          {errors.RAM ? <span className="text-danger">{errors.RAM}</span> : ""}
          <br />
        </div>
        <div className="form-group">
        <label>ROM</label>
          <select
            className="form-control"
            id="ROM"
            name="ROM"
            value={ROM}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
          >
            <option disabled value="">Select ROM</option>
            {romOpt.map((opt) => (
              <option>{opt}</option>
            ))}
          </select>
          {errors.ROM ? <span className="text-danger">{errors.ROM}</span> : ""}
          <br />
        </div>
        <div className="form-group">
        <label>OS</label>
          <select
            className="form-control"
            id="OS"
            name="OS"
            value={OS}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
          >
            <option disabled value="">Select OS</option>
            {osOpt.map((opt) => (
              <option>{opt}</option>
            ))}
          </select>
          {errors.OS ? <span className="text-danger">{errors.OS}</span> : ""}
          <br />
        </div>
          
        <button className="btn btn-primary mt-2" disabled={!this.isFormValid()} onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default NewMobile;
