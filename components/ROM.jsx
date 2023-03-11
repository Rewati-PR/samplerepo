import React, { Component } from "react";
import http from "./httpService";
class ROM extends Component {
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
  

  render() {
    const { mobile} = this.state;
    const {rom} = this.props.match.params;
    const mobile1 = mobile.filter((m)=>m.ROM===rom);
    return (
        <div className="container">
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
        {mobile1.map((m) => (
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
    );
  }
}
export default ROM;
