import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

const renderInput = field => (
  <div>
    <input {...field.input} type={field.type} className="form-control"/>
    {field.meta.touched &&
     field.meta.error &&
     <span className="error">{field.meta.error}</span>}
  </div>
);

class Signup extends Component {

  handleFormSubmit({ email, password }) {
    console.log(email, password);
    // Need to log user in
    this.props.signUpUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      console.log(this.props.errorMessage);
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field
            name="email"
            type="text"
            component={renderInput}
            />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field
            name="password"
            type="password"
            component={renderInput}
            />
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <Field
            name="passwordConfirm"
            type="password"
            component={renderInput}
            />
        </fieldset>
        { this.renderAlert() }
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = 'Please enter an email';
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if ( values.password !== values.passwordConfirm ) {
    errors.password = 'Passwords must match!';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  validate
})(connect(mapStateToProps, actions)(Signup));
