/* eslint-disable react/jsx-filename-extension */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./Auth.scss";
import { Redirect } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import * as actions from "../store/authActions";
import * as auxActions from "./authAuxActions";

export class Authenticator extends Component {

  constructor() {
    super();

    this.state = {
      controls: {
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Mail Address"
          },
          value: "",
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        },
        password: {
          elementType: "input",
          elementConfig: {
            type: "password",
            placeholder: "Password"
          },
          value: "",
          validation: {
            required: true,
            maxLength: 5
          },
          valid: false,
          touched: false
        }
      }
    }

    this.inputChangedHandler = auxActions.inputChangedHandler.bind(this);
    //this.swithToSignInHandler = auxActions.swithToSignInHandler.bind(this);

  }

  submitForm = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };;

  render() {
    // generate forms element array
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        key: key,
        config: this.state.controls[key]
      });
    }

    // CONTACT FORM
    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.key}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={event => this.inputChangedHandler(event.target.value, formElement.key, this)}
        shouldValidate={formElement.config.validation}
        invalid={!formElement.config.valid}
        touched={formElement.config.touched}
      />
    ));

    // // checking if we've had an error
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isUserAuthenticated) {
      authRedirect = <Redirect to={this.props.redirectpath} />;
    }

    return (
      <div className="Auth">
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitForm}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    isUserAuthenticated: state.authReducer.token !== null,
    redirectpath: state.authReducer.authRedirectPath
  };
};

// // CONFIG REDUCER: DISPATCH/RETURN ACTIONS (AS CERTAIN TYPES) TO PROPS
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => {
      dispatch(actions.logInUser(email, password));
    },
    // defineAuthRedirectPath: () => {
    //   dispatch(this.props.buildingBurguer);
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Authenticator);