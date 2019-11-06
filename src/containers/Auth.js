/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Auth.scss';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './Button';
import logInUser from './authAuxActions';
import { AUTH_SUCCESS, AUTH_FAIL } from '../store/action-types';

export class Authenticator extends Component {
  constructor() {
    super();
    this.state = {
      controls: {
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'e-mail address...',
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          touched: false,
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'password...',
          },
          value: '',
          validation: {
            required: true,
            maxLength: 5,
          },
          valid: false,
          touched: false,
        }
      }
    };

    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.logInUser = logInUser.bind(this);
  }

  inputChangedHandler = (value, formIdentifier) => {
    // props destructuring
    const { controls } = this.state;
    // check validity
    const checkValidity = (rules) => {
      const isValid = true;
      if (!rules) return true;
      if (rules.required) return value.trim() !== '' && isValid;
      if (rules.minlength) return value.length >= rules.minlength && isValid;
      if (rules.maxlength) return value.length <= rules.maxlength && isValid;
      return isValid;
    };

    const updatedControls = {
      ...controls,
      [formIdentifier]: {
        ...controls[formIdentifier],
        value,
        valid: checkValidity(
          value,
          controls[formIdentifier].validation,
        ),
        touched: true,
      },
    };

    this.setState({ controls: updatedControls });
  }

  render() {
    const { isUserAuthenticated } = this.props;
    const { controls } = this.state;
    const formElementsArray = [];

    Object.keys(controls).forEach((key) => {
      formElementsArray.push({
        key,
        config: controls[key],
      });
    });

    // CONTACT FORM
    const form = formElementsArray.map(formElement => (
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

    let authRedirect = null;
    if (isUserAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    return (
      <div className="Auth">
        {authRedirect}
        <h2>Login</h2>
        <form onSubmit={(event) => {
          event.preventDefault();
          this.logInUser(this);
        }
        }
        >
          {form}
          <Button btnType="Success">Submit</Button>
        </form>

      </div>
    );
  }
}

Authenticator.defaultProps = {
  isUserAuthenticated: null,
};

Authenticator.propTypes = {
  isUserAuthenticated: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = state => ({
  isUserAuthenticated: state.authReducer.token,
});

// // CONFIG REDUCER: DISPATCH/RETURN ACTIONS (AS CERTAIN TYPES) TO PROPS
const mapDispatchToProps = dispatch => ({
  onSuccessAuth: () => dispatch({
    type: AUTH_SUCCESS,
    payload: {
      token: localStorage.getItem('sessionToken'),
    },
  }),
  onFailAuth: () => dispatch({
    type: AUTH_FAIL,
  })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Authenticator);
