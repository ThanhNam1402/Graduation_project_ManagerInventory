import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";

FormGroup.propTypes = {
  errors: PropTypes.object,
  register: PropTypes.any,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

function FormGroup({
  register,
  errors,
  name,
  type = "text",
  placeholder = "",
  label = "",
  disabled = false,
}) {
  const registerResult = register && name ? register(name) : null;
  const errorResult = errors && name ? Boolean(errors[name]) : false;

  return (
    <Stack my={2} direction="row" alignItems="center">
      <InputLabel sx={{ minWidth: 150 }} htmlFor={name}>
        {label}
      </InputLabel>
      <FormControl fullWidth>
        <TextField
          {...registerResult}
          type={type}
          hiddenLabel
          fullWidth
          id={name}
          name={name}
          margin="dense"
          variant="standard"
          size="small"
          placeholder={placeholder}
          disabled={disabled}
        />
        {errorResult && (
          <Typography color="error" variant="body2">
            {errors[name]?.message}
          </Typography>
        )}
      </FormControl>
    </Stack>
  );
}

export default FormGroup;
