import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FormControl, TextField, Typography } from "@mui/material";

const DynamicForm = ({ fields, buttonTitle, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // data test
  const formData = [
    {
      fields: {
        fields_name: "",
        data: [
          {
            name: "name",
            label: "name",
            type: "text",
            validation: {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            },
          },
          {
            name: "code",
            label: "code",
            type: "text",
            validation: {
              required: "Code is required",
              minLength: {
                value: 3,
                message: "Code must be at least 3 characters",
              },
            },
          },
        ],
      },
    },
    {
      fields: {
        fields_name: "Price",
        data: [
          {
            name: "name",
            label: "name",
            type: "text",
            validation: {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            },
          },
        ],
      },
    },
  ];

  // map form data
  // {
  //   formData.map((item) => {
  //     console.log(item.fields.fields_name);

  //     return (
  //       <>
  //         <Typography>{item?.fields?.fields_name}</Typography>
  //         {item?.fields?.data &&
  //           item?.fields?.data.length > 0 &&
  //           item?.fields?.data.map((item) => {
  //             return item.name;
  //           })}
  //       </>
  //     );
  //   });
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        {fields?.map((field, index) => (
          <div
            key={index}
            className={`mb-3 ${field.inline ? "col-md-6" : "col-md-12"}`}
          >
            <label htmlFor={field?.name} className="form-label">
              {field?.label}
            </label>
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
                      <FormControl fullWidth>
                        <TextField
                          type={field?.type}
                          hiddenLabel
                          fullWidth
                          id={field?.name}
                          margin="dense"
                          variant="standard"
                          placeholder="Nhập Mã Sản Phẩm"
                          size="small"
                          {...controllerField}
                        />

                        {errors[field?.name] && (
                          <Typography color="error" variant="body2">
                            {errors?.name?.message}
                          </Typography>
                        )}
                      </FormControl>
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
                      <textarea
                        id={field?.name}
                        className={`form-control ${
                          errors[field?.name] ? "is-invalid" : ""
                        }`}
                        {...controllerField}
                      />
                    );
                  case "date":
                    return (
                      <input
                        type="date"
                        id={field?.name}
                        className={`form-control ${
                          errors[field?.name] ? "is-invalid" : ""
                        }`}
                        {...controllerField}
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
                                const newValue = [...controllerField?.value];
                                if (e?.target?.checked) {
                                  newValue.push(option?.value);
                                } else {
                                  const index = newValue.indexOf(option?.value);
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
                  case "radio":
                    return (
                      <div className={field?.row ? "d-flex row ms-0" : ""}>
                        {field?.options?.map((option, i) => (
                          <div
                            key={i}
                            className={`form-check ${
                              field?.row ? "w-auto" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              id={`${field?.name}-${i}`}
                              className={`form-check-input ${
                                errors[field?.name] ? "is-invalid" : ""
                              }`}
                              value={option?.value}
                              {...controllerField}
                              checked={controllerField?.value === option?.value}
                              onChange={() =>
                                controllerField.onChange(option?.value)
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`${field?.name}-${i}`}
                            >
                              {option?.label}
                            </label>
                          </div>
                        ))}
                        {errors[field?.name] && (
                          <div className="invalid-feedback d-block">
                            {errors[field?.name]?.message}
                          </div>
                        )}
                      </div>
                    );
                  default:
                    return null;
                }
              }}
            />
            {errors[field?.name] && (
              <div className="invalid-feedback">
                {errors[field?.name]?.message}
              </div>
            )}
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {buttonTitle}
      </button>
    </form>
  );
};

export default DynamicForm;
