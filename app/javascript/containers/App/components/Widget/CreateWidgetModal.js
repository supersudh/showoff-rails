import React from 'react';
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RenderTextField from '../../../../components/RenderTextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const RenderCheckbox = ({ input, label }) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={input.value ? true : false}
        onChange={input.onChange}
        color="primary"
      />
    }
    label={label}
  />
)

const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
    'description',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  return errors
}

class CreateWidgetModal extends React.Component {
  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      toggleCreateWidgetModal
    } = this.props
    return (
      <Dialog open onClose={toggleCreateWidgetModal}>
        <DialogTitle id="form-dialog-title">Create New Widget</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Field
              name="name"
              component={RenderTextField}
              label="Widget Name"
              autoFocus
              margin="dense"
            />

            <Field
              name="description"
              component={RenderTextField}
              label="Widget Description"
              margin="dense"
              fullWidth
              multiline
              rows="4"
            />
            <div>
              <Field name="kind" component={RenderCheckbox} label="Visible" />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleCreateWidgetModal} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" disabled={pristine || submitting} onClick={handleSubmit}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default reduxForm({
  form: 'CreateWidgetForm',
  validate,
  initialValues: {
    kind: true
  }
})(CreateWidgetModal)