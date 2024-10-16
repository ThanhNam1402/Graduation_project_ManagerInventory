import { Stack, Typography, Button, Grid } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import PropTypes from "prop-types";

TabInfomation.propTypes = {
  item: PropTypes.object.isRequired,
  onOpenModalUpdate: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
};

function TabInfomation({ item, onOpenModalUpdate, onDeleteCustomer }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <img
          src="https://i.pinimg.com/564x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg"
          width="100%"
        />
      </Grid>
      <Grid item xs={10}>
        <div>
          <Typography variant="h6" component={"h6"}></Typography>

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
            <p></p>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Phone number
            </Typography>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ minWidth: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Address
            </Typography>
          </Stack>
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
      </Grid>
    </Grid>
  );
}

export default TabInfomation;
