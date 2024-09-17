import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { supplierService } from "../../../services/supplier.service";

function UpdateSpllier(props) {
  let { value, onCloseModal, onUpdateSupplier, onDeleteSupplier } = props;

  console.log(props);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (value) {
      reset(value);
    }
  }, []);

  const _onSubmit = async (data) => {
    onUpdateSupplier(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(_onSubmit)}
        encType="multipart/form-data"
        method="POST"
      >
        <Box elevation={2} sx={{ mb: 4 }}>
          <Stack mb={2} direction="row" alignItems="center">
            <InputLabel sx={{ minWidth: 150 }} htmlFor="name">
              Tên Nhà Cung Cấp
            </InputLabel>
            <FormControl fullWidth>
              <TextField
                {...register("name")}
                hiddenLabel
                id="name"
                margin="dense"
                variant="standard"
                size="small"
              />

              {errors.name && (
                <Typography color="error" variant="body2">
                  {errors?.name?.message}
                </Typography>
              )}
            </FormControl>
          </Stack>

          <Stack mb={2} direction="row" alignItems="center">
            <InputLabel sx={{ minWidth: 150 }} htmlFor="phone">
              Điện Thoại
            </InputLabel>
            <TextField
              {...register("phone")}
              hiddenLabel
              fullWidth
              id="phone"
              margin="dense"
              variant="standard"
              size="small"
            />
          </Stack>

          <Stack my={2} direction="row" alignItems="center">
            <InputLabel sx={{ minWidth: 150 }} htmlFor="email">
              Email
            </InputLabel>
            <FormControl fullWidth>
              <TextField
                {...register("email")}
                type="text"
                hiddenLabel
                fullWidth
                id="email"
                margin="dense"
                variant="standard"
                size="small"
              />
              {errors.price && (
                <Typography color="error" variant="body2">
                  {errors?.price?.message}
                </Typography>
              )}
            </FormControl>
          </Stack>

          <Stack mb={2} direction="row" alignItems="center">
            <InputLabel sx={{ minWidth: 150 }} htmlFor="tax_code">
              Mã số thuế
            </InputLabel>
            <FormControl fullWidth>
              <TextField
                {...register("tax_code")}
                type="text"
                hiddenLabel
                fullWidth
                id="tax_code"
                margin="dense"
                variant="standard"
                size="small"
              />

              {errors.tax_code && (
                <Typography color="error" variant="body2">
                  {errors?.tax_code?.message}
                </Typography>
              )}
            </FormControl>
          </Stack>

          <Stack mb={2} direction="row" alignItems="center">
            <InputLabel sx={{ minWidth: 150 }} htmlFor="address">
              Địa chỉ
            </InputLabel>
            <TextField
              {...register("address")}
              hiddenLabel
              fullWidth
              id="address"
              margin="dense"
              variant="standard"
              size="small"
            />
          </Stack>

          <Stack my={2} direction="row" alignItems="center">
            <InputLabel sx={{ minWidth: 150 }} htmlFor="notes">
              Mô tả
            </InputLabel>
            <TextField
              {...register("notes")}
              id="notes"
              multiline
              fullWidth
              variant="standard"
              maxRows={20}
            />
          </Stack>
        </Box>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 5 }}
          justifyContent={"flex-end"}
        >
          <Button
            variant="contained"
            type="submit"
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

          <Button
            variant="contained"
            startIcon={<DeleteOutlineIcon />}
            color="error"
            onClick={() => onDeleteSupplier(value.id)}
            sx={{ boxShadow: 0 }}
          >
            Xóa
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default UpdateSpllier;
