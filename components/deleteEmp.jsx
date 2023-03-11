import React, { Component } from "react";
import http from "./httpService";
class DeleteEmp extends Component{
   async componentDidMount(){
    const {id} = this.props.match.params;
    let response = await http.deleteApi(`/svr/employees/${id}`);
    this.props.history.push("/emps");
   }
   render(){
    return "";
   }
 }
export default DeleteEmp;