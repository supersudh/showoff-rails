import React from 'react';
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RenderTextField from '../../../../components/RenderTextField';

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

class UpdateWidgetModal extends React.Component {
  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      toggleUpdateWidgetModal
    } = this.props
    return (
      <Dialog open onClose={toggleUpdateWidgetModal}>
        <DialogTitle id="form-dialog-title">Update Widget</DialogTitle>
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleUpdateWidgetModal} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" disabled={pristine || submitting} onClick={handleSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default reduxForm({
  form: 'UpdateWidgetForm',
  validate,
})(UpdateWidgetModal)