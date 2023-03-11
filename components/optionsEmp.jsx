import React, { Component } from "react";
class OptionsEmp extends Component {
handleChange = (e) => {
    let { currentTarget: input } = e;
    let options = { ...this.props.options };
    options[input.name] = input.value;
    this.props.onOptionChange(options);
};
makeRadios = (arr, values, name, label) => (
    <React.Fragment>
      <label className="form-check-label">{label}</label>
      {arr.map((opt, index) => (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
            value={opt}
            type="radio"
            name={name}
            checked={values=== opt}
            onChange={this.handleChange}
          />
          <label className="form-check-label">{opt}</label>
        </div>
      ))}
    </React.Fragment>
  );
  render() {
    let {department = "", designation= "", gender=""} = this.props.options;
    let { deptOpt=[],desigOpt=[],genderOpt=[]} = this.props;
    return (
      <div className="row border bg-light">
      <div className="col-12">
        {this.makeRadios(
          deptOpt,
          department,
          "department",
          "Department"
        )}<br/>
        {this.makeRadios(
          desigOpt,
          designation,
          "designation",
          "Designation"
        )}<br/>
        {this.makeRadios(
          genderOpt,
          gender,
          "gender",
          "Gender"
        )}
      </div>
    </div>
    );
  }
}
export default OptionsEmp;
