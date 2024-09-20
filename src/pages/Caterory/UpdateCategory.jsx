import { object, string } from "yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Stack,
  Button,
  FormControl,
  Typography,
} from "@mui/material";

import { categoryService } from "../../services/category.service";

function UpdateCategory({ handleCloseModal, id, onUpdateCate, onDeleteCate }) {
  const { t } = useTranslation("notification");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) {
      handleGetOneCate();
    }
  }, []);

  const handleGetOneCate = async () => {
    try {
      let res = await categoryService.handleGetOneCate(id);
      setName(res?.data?.name);
      setDescription(res?.data?.description);
      let data = {
        name: res?.data?.name,
        description: res?.data?.description,
      };
      reset(data);
    } catch (error) {
      toast.error("Error getting category");
    }
  };

  let userSchema = object({
    name: string().required(t("form.required")).max(50, "Tối Đa 30 kí tự"),
    description: string()
      .required(t("form.required"))
      .max(220, "Tối Đa 220 kí tự"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const _onSubmit = (values) => {
    if (!id) toast.error("Not found category");
    onUpdateCate(id, values);
  };

  return (
    <>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {errors?.name && (
            <Typography
              sx={{
                color: "error.contrastText",
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
            maxRows={4}
            {...register("description")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {errors?.description && (
            <Typography
              sx={{
                color: "error.contrastText",
                mt: 1,
              }}
            >
              {errors?.description?.message}
            </Typography>
          )}
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit(_onSubmit)}
        >
          Lưu
        </Button>

        <Button variant="outlined" color="success" onClick={handleCloseModal}>
          Hủy
        </Button>
        <Button
          variant="contained"
          sx={{
            boxShadow: 0,
          }}
          color="error"
          onClick={() => onDeleteCate(id)}
        >
          Xóa
        </Button>
      </Stack>
    </>
  );
}

export default UpdateCategory;
