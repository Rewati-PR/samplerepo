import React, { Component } from "react";
class OptionsMob extends Component {
    handleChange = (e) => {
        let { currentTarget: input } = e;
        let options = { ...this.props.options };
        options[input.name] = this.updateCBs(
          options[input.name],
          input.checked,
          input.value
        );
        this.props.onOptionChange(options);
    };
    updateCBs = (inputValue, checked, value) => {
       let inpArr = inputValue ? inputValue.split(",") : [];
        if (checked) inpArr.push(value); 
        else {
          let index = inpArr.findIndex((ele) => ele === value);
          if (index >= 0) inpArr.splice(index, 1);
        }
        return inpArr.join(",");
    };
    
    makeCheckboxes = (arr, values, name, label) => (
       <React.Fragment>
          <label className="form-check-label">{label}</label>
          {arr.map((opt, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                value={opt}
                type="checkbox"
                name={name}
                checked={values.findIndex((val) => val === opt) >= 0}
                onChange={this.handleChange}
              />
              <label className="form-check-label">{opt}</label>
            </div>
          ))}
        </React.Fragment>
      );
    
  render() {
    let {brand = "", RAM= "", ROM=""} = this.props.options;
    let { brandOpt=[],ramOpt=[],romOpt=[]} = this.props;
    return (
      <div className="row border bg-light">
      <div className="col-12">
      {this.makeCheckboxes(
            brandOpt,
            brand.split(","),
            "brand",
            "Brand"
          )}<br/>
        {this.makeCheckboxes(
            ramOpt,
            RAM.split(","),
            "RAM",
            "RAM"
          )}<br/>
         {this.makeCheckboxes(
            romOpt,
            ROM.split(","),
            "ROM",
            "ROM"
          )}
      </div>
    </div>
    );
  }
}
export default OptionsMob;
