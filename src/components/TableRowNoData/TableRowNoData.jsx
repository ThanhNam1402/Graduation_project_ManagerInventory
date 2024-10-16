import { useTranslation } from "react-i18next";
import { TableRow, TableCell, Typography } from "@mui/material";
import Proptypes from "prop-types";

TableRowNoData.propTypes = {
  colSpan: Proptypes.number,
};

function TableRowNoData({ colSpan }) {
  const { t } = useTranslation("notification");

  return (
    <TableRow>
      <TableCell style={{ p: 1 }} colSpan={colSpan} align="center">
        <Typography>{t("nodata")}</Typography>
      </TableCell>
    </TableRow>
  );
}

export default TableRowNoData;
