import React from 'react';
import TextField from '@material-ui/core/TextField';

const RenderTextField = ({
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

export default RenderTextField;
