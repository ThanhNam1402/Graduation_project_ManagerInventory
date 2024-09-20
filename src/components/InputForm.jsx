import React from "react";
import { useForm } from "react-hook-form";

import { TextField, FormControl } from "@mui/material";

function InputForm({ name }) {
  const { register } = useForm();
  return (
    <FormControl>
      <TextField
        fullWidth
        id="standard-required"
        label="Tên danh mục"
        variant="standard"
        {...register(`${name}`)}
      />

      {/* {errors?.name && (
        <Typography
          sx={{
            color: "error.contrastText",
          }}
        >
          {errors?.name?.message}
        </Typography>
      )} */}
    </FormControl>
  );
}

export default InputForm;
