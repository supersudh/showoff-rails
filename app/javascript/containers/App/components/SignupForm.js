import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField';

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

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <TextField
      helperText={label}
      label={error ? error : label}
      error={touched && !!error}
      {...input}
      {...custom}
      style={{ width: '100%' }}
    />
  );
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
            component={renderTextField}
            label="First Name"
          />
        </div>
        <div>
          <Field name="last_name" component={renderTextField} label="Last Name" />
        </div>
        <div>
          <Field name="email" component={renderTextField} label="Email" />
        </div>

        <div>
          <Field name="password" component={renderTextField} label="Password" type="password" />
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