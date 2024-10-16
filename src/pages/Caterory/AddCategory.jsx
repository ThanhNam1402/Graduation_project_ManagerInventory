import {
  TextField,
  Stack,
  Button,
  FormControl,
  Typography,
} from "@mui/material";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

AddCategory.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  onAddCate: PropTypes.func.isRequired,
};

function AddCategory({ handleCloseModal, onAddCate }) {
  const { t } = useTranslation("notification");

  let userSchema = object({
    name: string().required(t("form.required")).max(50, "Tối Đa 30 kí tự"),
    description: string()
      .required(t("form.required"))
      .max(220, "Tối Đa 220 kí tự"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const _onSubmit = (values) => {
    onAddCate(values?.name, values?.description);
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit(_onSubmit)}>
        <Stack
          sx={{
            mb: 4,
          }}
          spacing={2}
        >
          <FormControl>
            <TextField
              fullWidth
              id="standard-required"
              label="Tên danh mục"
              variant="standard"
              {...register("name")}
            />

            {errors?.name && (
              <Typography
                sx={{
                  color: "error.dark",
                  mt: 1,
                }}
              >
                {errors?.name?.message}
              </Typography>
            )}
          </FormControl>

          <FormControl>
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Mô tả"
              multiline
              variant="standard"
              {...register("description")}
              maxRows={4}
            />
            {errors?.description && (
              <Typography
                color="error"
                sx={{
                  mt: 1,
                }}
              >
                {errors?.description?.message}
              </Typography>
            )}
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
          <Button type="submit" variant="contained" color="success">
            Lưu
          </Button>
          <Button
            variant="outlined"
            sx={{
              boxShadow: 0,
            }}
            color="success"
            onClick={handleCloseModal}
          >
            Hủy
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default AddCategory;
