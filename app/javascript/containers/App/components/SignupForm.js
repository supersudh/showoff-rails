import React from 'react'
import { Field, reduxForm } from 'redux-form'

import RenderTextField from '../../../components/RenderTextField';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'first_name',
    'last_name',
    'email',
    'password',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

class SignupForm extends React.Component {
  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <form onSubmit={handleSubmit} style={{ width: '50%' }}>
        <h3>Register</h3>
        <div>
          <Field
            name="first_name"
            component={RenderTextField}
            label="First Name"
          />
        </div>
        <div>
          <Field name="last_name" component={RenderTextField} label="Last Name" />
        </div>
        <div>
          <Field name="email" component={RenderTextField} label="Email" />
        </div>

        <div>
          <Field name="password" component={RenderTextField} label="Password" type="password" />
        </div>

        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'SignupForm',
  validate,
})(SignupForm)