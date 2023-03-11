import React, { Component } from "react";
import http from "./httpService";
class DeleteMob extends Component{
   async componentDidMount(){
    const {id} = this.props.match.params;
    let response = await http.deleteApi(`/svr/mobiles/${id}`);
    this.props.history.push("/mobiles");
   }
   render(){
    return "";
   }
 }
export default DeleteMob;