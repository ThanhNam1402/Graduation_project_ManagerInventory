import { Stack, Typography, Button, Grid } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { handleformat } from "@/utils/format";

TabInfomation.propTypes = {
  item: PropTypes.object.isRequired,
  onOpenModalUpdate: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
};

function TabInfomation({ item, onOpenModalUpdate, onDeleteCustomer }) {
  const { t } = useTranslation("supplier");
  return (
    <Stack
      justifyContent={"space-between"}
      sx={{
        height: "100%",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack mb={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              {t("table.tableHead.name")}
            </Typography>
            <p>{item?.name}</p>
          </Stack>
          <Stack mb={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Email
            </Typography>
            <p>{item?.email}</p>
          </Stack>
          <Stack mb={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              {t("table.tableHead.tax_code")}
            </Typography>
            <p>{item?.facebook}</p>
          </Stack>
          <Stack mb={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Facebook
            </Typography>
            <p>{item?.facebook}</p>
          </Stack>
          <Stack mb={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              {t("table.tableHead.phone")}
            </Typography>
            <p>{item?.phone}</p>
          </Stack>
          <Stack mb={2} direction="row">
            <Typography
              sx={{ minWidth: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              {t("table.tableHead.address")}
            </Typography>
            <p>{item?.address}</p>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack mb={2} direction="row">
            <Typography
              sx={{ minWidth: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              {t("table.tableHead.create_at")}
            </Typography>
            <p>{handleformat.formatDate(item?.created_at)}</p>
          </Stack>
          <Stack mb={2} direction="row">
            <Typography
              sx={{ minWidth: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              {t("table.tableHead.note")}
            </Typography>
            <p>{item?.notes}</p>
          </Stack>
        </Grid>
      </Grid>
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
    </Stack>
  );
}

export default TabInfomation;
