import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Radio,
  Button,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { useEffect } from "react";

import { useForm } from "react-hook-form";

export default function UpdateCustomer({
  value,
  onCloseModal,
  onUpdateCustomer,
}) {
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
    onUpdateCustomer(data?.id, data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(_onSubmit)}
        encType="multipart/form-data"
        method="POST"
      >
        <div>
          <Box elevation={2} sx={{ p: 2, mb: 2 }}>
            <Stack mb={2} direction="row" alignItems="center">
              <InputLabel sx={{ minWidth: 150 }} htmlFor="name">
                Tên Khách Hàng
              </InputLabel>
              <FormControl fullWidth>
                <TextField
                  {...register("name")}
                  hiddenLabel
                  fullWidth
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
                Điện thoại
              </InputLabel>
              <TextField
                {...register("phone")}
                hiddenLabel
                type="text"
                fullWidth
                id="phone"
                margin="dense"
                variant="standard"
                size="small"
              />
            </Stack>
            <Stack my={2} direction="row" alignItems="center">
              <InputLabel sx={{ minWidth: 150 }} htmlFor="city_name">
                Tên Thành Phố
              </InputLabel>
              <FormControl fullWidth>
                <TextField
                  {...register("city_name")}
                  type="text"
                  hiddenLabel
                  fullWidth
                  id="city_name"
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
              <InputLabel sx={{ minWidth: 150 }} htmlFor="email">
                Email
              </InputLabel>
              <FormControl fullWidth>
                <TextField
                  {...register("email")}
                  type="email"
                  hiddenLabel
                  fullWidth
                  id="code"
                  margin="dense"
                  variant="standard"
                  size="small"
                />

                {errors.sale_price && (
                  <Typography color="error" variant="body2">
                    {errors?.sale_price?.message}
                  </Typography>
                )}
              </FormControl>
            </Stack>

            <Stack mb={2} direction="row" alignItems="center">
              <InputLabel sx={{ minWidth: 150 }} htmlFor="tax_code">
                Loại Khách Hàng
              </InputLabel>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="0" control={<Radio />} label="0" />
                  <FormControlLabel value="1" control={<Radio />} label="1" />
                  <FormControlLabel value="2" control={<Radio />} label="2" />
                </RadioGroup>
              </FormControl>
            </Stack>

            <Stack mb={2} direction="row" alignItems="center">
              <InputLabel sx={{ minWidth: 150 }} htmlFor="tax_code">
                Mã số thuế
              </InputLabel>
              <FormControl fullWidth>
                <TextField
                  {...register("tax_code")}
                  type="number"
                  hiddenLabel
                  fullWidth
                  id="tax_code"
                  margin="dense"
                  variant="standard"
                  size="small"
                />

                {errors.sale_price && (
                  <Typography color="error" variant="body2">
                    {errors?.sale_price?.message}
                  </Typography>
                )}
              </FormControl>
            </Stack>

            <Stack mb={2} direction="row" alignItems="center">
              <InputLabel sx={{ minWidth: 150 }} htmlFor="facebook">
                Facebook
              </InputLabel>
              <FormControl fullWidth>
                <TextField
                  {...register("facebook")}
                  type="text"
                  hiddenLabel
                  fullWidth
                  id="facebook"
                  margin="dense"
                  variant="standard"
                  size="small"
                />

                {errors.sale_price && (
                  <Typography color="error" variant="body2">
                    {errors?.sale_price?.message}
                  </Typography>
                )}
              </FormControl>
            </Stack>

            <Stack mb={2} direction="row" alignItems="center">
              <InputLabel sx={{ minWidth: 150 }} htmlFor="date_of_birth">
                Ngày Sinh
              </InputLabel>
              <FormControl fullWidth>
                <TextField
                  {...register("date_of_birth")}
                  type="date"
                  hiddenLabel
                  fullWidth
                  id="date_of_birth"
                  margin="dense"
                  variant="standard"
                  size="small"
                />

                {errors.sale_price && (
                  <Typography color="error" variant="body2">
                    {errors?.sale_price?.message}
                  </Typography>
                )}
              </FormControl>
            </Stack>

            <Stack mb={2} direction="row" alignItems="center">
              <InputLabel sx={{ minWidth: 150 }} htmlFor="address">
                Địa Chỉ
              </InputLabel>
              <TextField
                {...register("address")}
                hiddenLabel
                fullWidth
                id="address"
                margin="dense"
                variant="standard"
                multiline
                size="small"
                maxRows={20}
              />
            </Stack>

            <Stack mb={2} direction="row" alignItems="self-start">
              <InputLabel sx={{ minWidth: 150 }} htmlFor="notes">
                Ghi Chú
              </InputLabel>
              <TextField
                {...register("notes")}
                hiddenLabel
                fullWidth
                id="notes"
                variant="standard"
                multiline
                size="small"
                minRows={4}
                maxRows={20}
              />
            </Stack>
          </Box>
        </div>
        <Stack
          spacing={2}
          direction="row"
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Button type="submit" variant="contained">
            Lưu
          </Button>
          <Button onClick={onCloseModal} variant="outlined">
            Hủy
          </Button>
        </Stack>
      </form>
    </>
  );
}
