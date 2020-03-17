import React from 'react'
import { Field, reduxForm } from 'redux-form'
import DatePicker from 'react-datepicker';

import RenderTextField from '../../../components/RenderTextField';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'first_name',
    'last_name',
    'date_of_birth'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  return errors
}

class SettingsForm extends React.Component {
  onChangeDate = date => {
    this.props.change('date_of_birth', Date.parse(date));
  }

  getFormattedDate = () => {
    if (this.props.formValues) {
      if (this.props.formValues.SettingsForm) {
        if (this.props.formValues.SettingsForm.values) {
          return new Date(this.props.formValues.SettingsForm.values.date_of_birth);
        }
      }
    }
    return null;
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <form onSubmit={handleSubmit} style={{ width: '50%' }}>
        <h3>Login</h3>
        <div>
          <Field name="first_name" component={RenderTextField} label="First Name" />
        </div>

        <div>
          <Field name="last_name" component={RenderTextField} label="last_name" type="Last Name" />
        </div>
        <br />
        <label>Date Of Birth:</label>
        <br />
        <DatePicker
          selected={this.getFormattedDate()}
          onChange={date => this.onChangeDate(date)}
        />

        <div>
          <button type="submit" disabled={pristine || submitting}>
            Update
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'SettingsForm',
  validate,
})(SettingsForm)