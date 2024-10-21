import { Stack, Typography, Button, Grid } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import PropTypes from "prop-types";
import { handleformat } from "@/utils/format";

TabInfomation.propTypes = {
  item: PropTypes.object.isRequired,
  onOpenModalUpdate: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
};

function TabInfomation({ item, onOpenModalUpdate, onDeleteCustomer }) {
  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack mt={2} direction="row">
              <Typography
                sx={{ width: "110px" }}
                variant="subtitle2"
                component={"p"}
              >
                Tên Khách Hàng
              </Typography>
              <p>{item.name}</p>
            </Stack>
            <Stack mt={2} direction="row">
              <Typography
                sx={{ width: "110px" }}
                variant="subtitle2"
                component={"p"}
              >
                Email
              </Typography>
              <p>{item?.email}</p>
            </Stack>
            <Stack mt={2} direction="row">
              <Typography
                sx={{ width: "110px" }}
                variant="subtitle2"
                component={"p"}
              >
                Facebook
              </Typography>
              <p>{item?.facebook}</p>
            </Stack>
            <Stack mt={2} direction="row">
              <Typography
                sx={{ width: "110px" }}
                variant="subtitle2"
                component={"p"}
              >
                Thành phố
              </Typography>
              <p>{item?.city_name}</p>
            </Stack>
            <Stack mt={2} direction="row">
              <Typography
                sx={{ width: "110px" }}
                variant="subtitle2"
                component={"p"}
              >
                Sinh nhật
              </Typography>
              <p>{item?.date_of_birth}</p>
            </Stack>
            <Stack mt={2} direction="row">
              <Typography
                sx={{ width: "110px" }}
                variant="subtitle2"
                component={"p"}
              >
                Phone number
              </Typography>
              <p>{item?.phone}</p>
            </Stack>
            <Stack mt={2} direction="row">
              <Typography
                sx={{ minWidth: "110px" }}
                variant="subtitle2"
                component={"p"}
              >
                Address
              </Typography>
              <p>{item?.address}</p>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack mt={2} direction="row">
              <Typography
                sx={{ minWidth: "110px" }}
                variant="subtitle2"
                component={"p"}
              >
                Ngày tạo
              </Typography>
              <p>{handleformat.formatDate(item?.created_at)}</p>
            </Stack>
            <Stack mt={2} direction="row">
              <Typography
                sx={{ minWidth: "110px" }}
                variant="subtitle2"
                component={"p"}
              >
                Note
              </Typography>
              <p>{item?.notes}</p>
            </Stack>
          </Grid>
        </Grid>
      </div>
      <Stack justifyContent="flex-end" direction="row" spacing={2} mt={2}>
        <Button
          variant="contained"
          startIcon={<ChangeCircleIcon />}
          color="primary"
          onClick={() => onOpenModalUpdate(item?.id)}
          sx={{ boxShadow: 0 }}
        >
          Cập nhật
        </Button>

        <Button
          variant="contained"
          startIcon={<DeleteOutlineIcon />}
          color="error"
          onClick={() => onDeleteCustomer(item?.id)}
          sx={{ boxShadow: 0 }}
        >
          Xóa
        </Button>
      </Stack>
    </>
  );
}

export default TabInfomation;
