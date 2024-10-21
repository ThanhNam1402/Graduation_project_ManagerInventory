import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Box,
  Typography,
  IconButton,
  Collapse,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import Payment_summary from "./PaymentSummary";
import Operation from "./Temporary/Operation";
import Temporary_ticket from "./Temporary/TableTemporaryTicket";
import Temporary_ballot_information from "./Temporary/TemporaryBallotInformation";

import Invoice_history from "./Complete/InvoiceHistory";
import Pay_history from "./Complete/PayHistory";
import Operation_completed from "./Complete/OperationCompleted";
import Ticket_completed from "./Complete/TableTicketCompleted";
import Information_completed from "./Complete/InformationCompleted";

import csUseQueryString from "@/hook/csUseQueryString";
import { orderService } from "@/services/order.service";
import { handleformat } from "@/utils/format";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import ModalComfirm from "@/components/admin/modalComfrim/modalConfrim";

function ListTransaction(props) {
  const { t } = useTranslation("order");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [status, setStatus] = useState(1);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleConfirmChangeStatus = async (id, status) => {
    try {
      const res = await orderService.handleUpdateStastus(id, status);
      let data = res.data;
      console.log("Check res update ", data);
      fetchData();
    } catch (error) {
      console.log(error);
    }
    toast.success("Cập nhật thành công");
    handleCloseDialog();
  };

  const handleCancelChangeStatus = () => {
    toast.error("Hành động đã bị hủy!");
    handleCloseDialog();
  };

  let { filters, keyword, pagination } = props;

  useEffect(() => {
    fetchData();
  }, [keyword, pagination?.page, keyword]);

  let keyWord = "";
  let limit = 2;
  let Status = "";

  const fetchData = async () => {
    try {
      let filterParams = new URLSearchParams({
        keyWord: keyWord || "",
        limit: limit || 1,
        Status: Status || "",
      }).toString();

      console.log("Check filterParams", filterParams);

      const res = await orderService.handleGetAll(filterParams);
      let data = res.data.data;
      console.log("Check data call API", data.length);

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRowClick = (rowId) => {
    setSelectedRowId((prevId) => (prevId === rowId ? null : rowId));
  };

  const handleCheckboxChange = (id) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id];

      return newSelected;
    });
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell padding="checkbox">
                  <Checkbox
                    inputProps={{ "aria-label": "select all products" }}
                    indeterminate={
                      selectedProducts.length > 0 &&
                      selectedProducts.length < data.length
                    }
                    checked={
                      data.length > 0 && selectedProducts.length === data.length
                    }
                    onChange={(event) => {
                      if (event.target.checked) {
                        setSelectedProducts(data.map((row) => row.id));
                      } else {
                        setSelectedProducts([]);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{t("orders.table.tableHead.code")}</TableCell>
                <TableCell>{t("orders.table.tableHead.time")}</TableCell>
                <TableCell>{t("orders.table.tableHead.client")}</TableCell>
                <TableCell>{t("orders.table.tableHead.pay")}</TableCell>
                <TableCell>{t("orders.table.tableHead.paid")}</TableCell>
                <TableCell>{t("orders.table.tableHead.status")}</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => handleRowClick(row.id)}
                        >
                          {selectedRowId === row.id ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedProducts.includes(row.id)}
                          onChange={() => handleCheckboxChange(row.id)}
                        />
                      </TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>
                        {handleformat.formatDate(row.createdAt)}
                      </TableCell>
                      <TableCell>{row.client_name}</TableCell>
                      <TableCell>
                        {handleformat.formatPrice(row.client_paid)}
                      </TableCell>
                      <TableCell>
                        {handleformat.formatPrice(row.client_paid)}
                      </TableCell>
                      <TableCell>
                        {row.status === 0 ? "Phiếu tạm" : "Hoàn thành"}
                      </TableCell>
                    </TableRow>
                    {selectedRowId === row.id && (
                      <TableRow>
                        <TableCell colSpan={12}>
                          <Collapse
                            in={selectedRowId === row.id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box margin={1}>
                              {row.status === 0 ? (
                                // Nội dung của Phiếu tạm
                                <Box>
                                  <Typography
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                  >
                                    Thông tin
                                  </Typography>
                                  <Grid container spacing={3}>
                                    <Temporary_ballot_information row={row} />
                                    <Temporary_ticket row={row.items} />
                                    <Grid
                                      container
                                      spacing={2}
                                      justifyContent="flex-end"
                                      sx={{ mt: 2 }}
                                    >
                                      <Grid item xs={12}>
                                        <Payment_summary row={row} />
                                      </Grid>
                                      <Operation
                                        handleOpenDialog={handleOpenDialog}
                                      />
                                      {/* Modal */}
                                      <ModalComfirm
                                        open={openDialog}
                                        onClose={handleCloseDialog}
                                        title="Xác nhận"
                                        content="Xác nhận thay đổi trạng thái đơn hàng!"
                                        onConfirm={() =>
                                          handleConfirmChangeStatus(
                                            row.id,
                                            status
                                          )
                                        }
                                        onCancel={handleCancelChangeStatus}
                                      />
                                    </Grid>
                                  </Grid>
                                </Box>
                              ) : (
                                // Nội dung của Phiếu đã thanh toán
                                <Box>
                                  <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                  >
                                    <Tab label="Thông tin" />
                                    <Tab label="Lịch sử hóa đơn" />
                                    <Tab label="Thanh toán" />
                                  </Tabs>
                                  <Box sx={{ padding: 2 }}>
                                    {value === 0 && (
                                      <Box>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          component="div"
                                        >
                                          Thông tin
                                        </Typography>
                                        <Grid container spacing={3}>
                                          <Information_completed row={row} />
                                          <Ticket_completed row={row.items} />
                                          <Grid
                                            container
                                            spacing={2}
                                            justifyContent="flex-end"
                                            sx={{ mt: 2 }}
                                          >
                                            <Grid item xs={12}>
                                              <Payment_summary row={row} />
                                            </Grid>
                                            <Operation_completed />
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    )}
                                    {value === 1 && (
                                      <Invoice_history row={row} />
                                    )}
                                    {value === 2 && <Pay_history row={row} />}
                                  </Box>
                                </Box>
                              )}
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No Data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ListTransaction;
