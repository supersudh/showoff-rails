import React from 'react'
import { Field, reduxForm } from 'redux-form'

import RenderTextField from '../../../components/RenderTextField';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  return errors
}

class ForgotPasswordForm extends React.Component {
  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <form onSubmit={handleSubmit} style={{ width: '50%' }}>
        <h3>Forgot Password</h3>
        <div>
          <Field name="email" component={RenderTextField} label="Username or Email" />
        </div>

        <div>
          <button type="submit" disabled={pristine || submitting}>
            Send Email
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'ForgotPasswordForm',
  validate,
})(ForgotPasswordForm)