import React, {Component} from "react";
import { Route, Switch } from "react-router-dom";
import Brand from "./brand";
import Mobiles from "./mobiles";
import OS from "./OS";
import RAM from "./RAM";
import ROM from "./ROM";
import NavbarMob from "./navbarMob";
import NewMobile from "./newMobile";
import DeleteMob from "./deleteMob";
class MainMobile extends Component{
    render(){
        return(
            <div className="container">
                <NavbarMob />
                <Switch>
                <Route path="/newMobile" component={NewMobile} />
                <Route path="/mobiles/:id/delete" component={DeleteMob} />
                <Route path="/mobiles/:id/edit" component={NewMobile} />
                <Route path="/OS/:os" component={OS} />
                <Route path="/ROM/:rom" component={ROM} />
                <Route path="/RAM/:ram" component={RAM} />
                <Route path="/brand/:brand" component={Brand} />
                <Route path="/mobiles" component={Mobiles} />
                </Switch>
            </div>
        );
    }
}
export default MainMobile;