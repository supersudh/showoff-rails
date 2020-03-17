import React from 'react'
import { Field, reduxForm } from 'redux-form'

import RenderTextField from '../../../components/RenderTextField';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'current_password',
    'new_password',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  return errors
}

class ChangePasswordForm extends React.Component {
  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <form onSubmit={handleSubmit} style={{ width: '50%' }}>
        <h3>Change Password</h3>
        <div>
          <Field name="current_password" component={RenderTextField} label="Current Password" type="password" />
        </div>

        <div>
          <Field name="new_password" component={RenderTextField} label="New Password" type="password" />
        </div>

        <div>
          <button type="submit" disabled={pristine || submitting}>
            Change Password
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'ChangePasswordForm',
  validate,
})(ChangePasswordForm)