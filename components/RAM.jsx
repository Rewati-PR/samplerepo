import React, { Component } from "react";
import http from "./httpService";
import queryString from "query-string";
import OptionsMob from "./optionsMob";

class RAM extends Component {
state = {
    mobile: [],
    brandOpt :  ["Samsung", "Xiaomi", "Realme","Apple"],
    ramOpt : ["3GB", "4GB", "6GB","8GB"],
    romOpt : ["32GB", "64GB", "128GB", "256GB"],

  };
  async fetchData() {
    let response = await http.get("/svr/mobiles");
    let { data } = response;
    console.log(data);
    this.setState({ mobile: data });
  }
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }
  handleEdit(id){
    this.props.history.push(`/mobiles/${id}/edit`);
   }
  handleDelete(id){
    this.props.history.push(`/mobiles/${id}/delete`);
  }
  handleOptionChange = (options) => {
    this.callURL("/mobiles", options);
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
      let { brand,RAM,ROM} = options;
      let searchStr = "";
      searchStr = this.addToQueryString(searchStr, "brand",brand);
      searchStr = this.addToQueryString(searchStr, "RAM", RAM);
      searchStr = this.addToQueryString(searchStr, "ROM", ROM);
      return searchStr;
    };
    addToQueryString = (str, paramName, paramValue) =>
      paramValue
        ? str
          ? `${str}&${paramName}=${paramValue}`
          : `${paramName}=${paramValue}`
        : str;
  

  render() {
    const { mobile,brandOpt,ramOpt,romOpt} = this.state;
    const {ram} = this.props.match.params;
    const mobile1 = mobile.filter((m)=>m.RAM===ram);
    let queryParams = queryString.parse(this.props.location.search);
    let mobile2 = queryParams.brand ? mobile1.filter((e)=>e.brand===queryParams.brand) : mobile1;
    let mobile3 = queryParams.RAM ? mobile2.filter((e)=>e.RAM===queryParams.RAM) : mobile2;
    let mobile4 = queryParams.ROM ? mobile3.filter((e)=>e.ROM===queryParams.ROM) : mobile3;
 
    return (
        <div className="container">
            <div className="row">
          <div className="col-2">
            <OptionsMob
              options={queryParams}
              brandOpt={brandOpt}
              ramOpt={ramOpt}
              romOpt={romOpt}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-10">
        
        <div className="row bg-info text-center">
         <div className="col-1 border">Id</div>
          <div className="col-2 border">Name</div>
          <div className="col-2 border">Price</div>
          <div className="col-2 border">Brand</div>
          <div className="col-1 border">RAM</div>
          <div className="col-1 border">ROM</div>
          <div className="col-1 border">OS</div>
          <div className="col-1 border"></div>
          <div className="col-1 border"></div>
        </div>
        {mobile4.map((m) => (
          <div className="row text-center" key={m.id}>
            <div className="col-1 border">{m.id}</div>
           <div className="col-2 border">{m.name}</div>
           <div className="col-2 border">{m.price}</div>
           <div className="col-2 border">{m.brand}</div>
           <div className="col-1 border">{m.RAM}</div>
           <div className="col-1 border">{m.ROM}</div>
           <div className="col-1 border">{m.OS}</div>
           <div className="col-1 border"><button className="btn btn-warning btn-sm" onClick={()=>this.handleEdit(m.id)}>Edit</button></div>
           <div className="col-1 border"><button className="btn btn-danger btn-sm" onClick={()=>this.handleDelete(m.id)}>Delete</button></div>
          </div>
        ))}
        </div>
        </div>
        </div>
    );
  }
}
export default RAM;
