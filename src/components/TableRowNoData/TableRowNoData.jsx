import { useTranslation } from "react-i18next";
import { TableRow, TableCell, Typography } from "@mui/material";

function TableRowNoData() {
  const { t } = useTranslation("notification");

  return (
    <TableRow>
      <TableCell style={{ p: 1 }} colSpan={9} align="center">
        <Typography>{t("nodata")}</Typography>
      </TableCell>
    </TableRow>
  );
}

export default TableRowNoData;
