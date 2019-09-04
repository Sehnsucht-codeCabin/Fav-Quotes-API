import React from "react";
import "./Input.scss";

const input = props => {
  let inputElement = null;

  // set classes of elements
  const inputClasses = ["InputElement"];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push("Invalid");
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          onChange={props.changed}
          className={inputClasses.join(" ")}
          value={props.value}
        />
      );

      break;

    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          onChange={props.changed}
          className={inputClasses.join(" ")}
          value={props.value}
        />
      );

      break;

    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          onChange={props.changed}
          value={props.value}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );

      break;

    default:
      inputElement = (
        <input
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          value={props.value}
        />
      );
  }

  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
