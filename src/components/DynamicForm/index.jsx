import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

import {
  FormControl,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  InputLabel,
  Typography,
  Button,
} from "@mui/material";

import PropTypes from "prop-types";

const DynamicForm = ({
  fields,
  onSubmit,
  FormSchema,
  onCloseModal,
  valueEdit,
}) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormSchema),
  });

  useEffect(() => {
    if (valueEdit) {
      reset(valueEdit);
    }
  }, [reset, valueEdit]);

  console.log(errors);

  return (
    <>
      <div className="row">
        {fields?.map((field) => {
          return (
            <Stack
              mb={2}
              key={field.name}
              direction="row"
              alignItems="flex-start"
            >
              <InputLabel sx={{ minWidth: 150, mt: 2 }} htmlFor={field.name}>
                {field.labelName}
              </InputLabel>
              <FormControl fullWidth>
                <Controller
                  name={field?.name}
                  control={control}
                  defaultValue={field?.type === "checkbox" ? [] : ""}
                  rules={field?.validation}
                  render={({ field: controllerField }) => {
                    switch (field?.type) {
                      case "text":
                      case "email":
                      case "password":
                      case "number":
                        return (
                          <TextField
                            {...controllerField}
                            type={field?.type}
                            id={field?.name}
                            name={field?.name}
                            fullWidth
                            hiddenLabel
                            margin="dense"
                            variant="standard"
                            size="small"
                          />
                        );
                      case "radio":
                        return (
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            {...controllerField}
                          >
                            {field?.options?.map((option, index) => {
                              return (
                                <FormControlLabel
                                  key={index}
                                  value={option.value}
                                  control={<Radio />}
                                  label={option.label}
                                />
                              );
                            })}
                          </RadioGroup>
                        );
                      case "select":
                        return (
                          <select
                            id={field?.name}
                            className={`form-control ${
                              errors[field?.name] ? "is-invalid" : ""
                            }`}
                            {...controllerField}
                          >
                            {field?.options?.map((option, i) => (
                              <option key={i} value={option?.value}>
                                {option?.label}
                              </option>
                            ))}
                          </select>
                        );
                      case "textarea":
                        return (
                          <TextField
                            {...controllerField}
                            hiddenLabel
                            fullWidth
                            id={field.name}
                            name={field?.name}
                            margin="dense"
                            variant="standard"
                            multiline
                            size="small"
                            minRows={4}
                            maxRows={20}
                          />
                        );
                      case "date":
                        return (
                          <TextField
                            {...controllerField}
                            type={field?.type}
                            id={field?.name}
                            name={field?.name}
                            fullWidth
                            hiddenLabel
                            margin="dense"
                            variant="standard"
                            size="small"
                          />
                        );
                      case "datetime":
                        return (
                          <input
                            type="datetime-local"
                            id={field?.name}
                            className={`form-control ${
                              errors[field?.name] ? "is-invalid" : ""
                            }`}
                            {...controllerField}
                          />
                        );
                      case "checkbox":
                        return (
                          <div className={field?.row ? "d-flex row ms-0" : ""}>
                            {field.options?.map((option, i) => (
                              <div
                                className={`form-check ${
                                  field?.row ? "w-auto" : ""
                                }`}
                                key={i}
                              >
                                <input
                                  type="checkbox"
                                  id={`${field?.name}-${i}`}
                                  className={`form-check-input ${
                                    errors[field?.name] ? "is-invalid" : ""
                                  }`}
                                  value={option?.value}
                                  checked={controllerField?.value?.includes(
                                    option?.value
                                  )}
                                  onChange={(e) => {
                                    const newValue = [
                                      ...controllerField?.value,
                                    ];
                                    if (e?.target?.checked) {
                                      newValue.push(option?.value);
                                    } else {
                                      const index = newValue.indexOf(
                                        option?.value
                                      );
                                      if (index > -1) {
                                        newValue.splice(index, 1);
                                      }
                                    }
                                    controllerField?.onChange(newValue);
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`${field?.name}-${i}`}
                                >
                                  {option?.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        );
                      default:
                        return null;
                    }
                  }}
                />
                {errors[field?.name] && (
                  <Typography
                    sx={{
                      color: "#e91e63",
                      mt: 1,
                    }}
                    variant="body2"
                  >
                    {errors[field.name].message}
                  </Typography>
                )}
              </FormControl>
            </Stack>
          );
        })}
      </div>
      <Stack
        spacing={2}
        direction="row"
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          startIcon={<CheckIcon />}
          color="success"
        >
          Lưu
        </Button>

        <Button
          variant="outlined"
          onClick={onCloseModal}
          startIcon={<CloseIcon />}
          color="success"
        >
          Hủy
        </Button>
      </Stack>
    </>
  );
};

DynamicForm.propTypes = {
  fields: PropTypes.array,
  onSubmit: PropTypes.func,
  FormSchema: PropTypes.object,
  onCloseModal: PropTypes.func,
  valueEdit: PropTypes.object,
};

export default DynamicForm;
