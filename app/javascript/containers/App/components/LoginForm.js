import React from 'react'
import { Field, reduxForm } from 'redux-form'

import RenderTextField from '../../../components/RenderTextField';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'username',
    'password',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  return errors
}

class LoginForm extends React.Component {
  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <form onSubmit={handleSubmit} style={{ width: '50%' }}>
        <h3>Login</h3>
        <div>
          <Field name="username" component={RenderTextField} label="Username or Email" />
        </div>

        <div>
          <Field name="password" component={RenderTextField} label="Password" type="password" />
        </div>

        <div>
          <button type="submit" disabled={pristine || submitting}>
            Login
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'LoginForm',
  validate,
})(LoginForm)