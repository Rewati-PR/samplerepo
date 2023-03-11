import React, {Component} from "react";
import { Route, Switch } from "react-router-dom";
import NavbarEmp from "./navbarEmp";
import Emps from "./emps";
import Departments from "./departments";
import Designations from "./designations";
import NewEmployee from "./newEmployee";
import DeleteEmp from "./deleteEmp";
class Employee extends Component{
    render(){
        return(
            <div className="container">
                <NavbarEmp />
                <Switch>
                <Route path="/newEmp" component={NewEmployee} />
                <Route path="/employees/:id/delete" component={DeleteEmp} />
                <Route path="/employees/:id/edit" component={NewEmployee} />
                <Route path="/department/:dept" component={Departments} />
                <Route path="/designation/:desig" component={Designations} />
                <Route path="/emps" component={Emps} />
                </Switch>
            </div>
        );
    }
}
export default Employee;