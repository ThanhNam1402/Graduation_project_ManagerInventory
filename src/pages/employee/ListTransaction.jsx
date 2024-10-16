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

import csUseQueryString from "../../hook/csUseQueryString";
import { orderService } from "./../../services/order.service";
import { handleformat } from "../../utils/format";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import EmployeeInfo from "./Employee_Information/info";
import Calendar from "./Calendar/calendar";
import Wage from "./Wage/Wage";
import Monny_Owed from "./Money_Owed/MoneyOwed";

function ListTransaction(props) {
  const { t } = useTranslation("order");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);

  const datas = [{ id: 1, code: "NV001" ,name: "Khang" },
    { id: 2, code: "NV002" ,name: "Khang" }
  ];

  const handleChangeTap = (event, newValue) => {
    setValue(newValue);
  };

  let { filters, keyword, pagination } = props;

  useEffect(() => {
    fetchData();
  }, [filters, pagination?.page, keyword]);

  const fetchData = async () => {
    try {
      let filterParams = csUseQueryString({
        ...filters,
        ...pagination,
        keyword,
      });

      const res = await orderService.handleGetAll(filterParams);
      let data = res.data;
      const groupedData = data.reduce((acc, item) => {
        const id = item.id;

        if (!acc[id]) {
          acc[id] = {
            id,
            code: item.code,
            createdAt: item.createdAt,
            qty: 0,
            total: 0,
            price: 0,
            client_name: item.client_name,
            client_paid: item.client_paid,
            status: item.status,
            note: item.note,
            items: [],
          };
        }

        acc[id].qty += item.Products.Order_Detail.qty;
        acc[id].total += item.Products.Order_Detail.total;
        acc[id].price += item.Products.price;

        acc[id].items.push({
          code: item.Products.code,
          name: item.Products.name,
          qty: item.Products.Order_Detail.qty,
          description: item.Products.description,
          sale_price: item.Products.sale_price,
          price: item.Products.price,
          note: item.note,
        });

        return acc;
      }, {});

      const filteredData = Object.values(groupedData);
      setData(datas);
      console.log("Data format ", filteredData);
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
                      selectedProducts.length < datas.length
                    }
                    checked={
                      datas.length > 0 && selectedProducts.length === datas.length
                    }
                    onChange={(event) => {
                      if (event.target.checked) {
                        setSelectedProducts(datas.map((row) => row.id));
                      } else {
                        setSelectedProducts([]);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Mã nhân viên</TableCell>
                <TableCell>Mã chấm công</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Số CMND/CCCD</TableCell>
                <TableCell>Nợ lương nhân viên</TableCell>
                <TableCell>Ghi chú</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {datas.map((row) => (
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
                            <Box>
                              <Tabs
                                value={value}
                                onChange={handleChangeTap}
                                aria-label="basic tabs example"
                              >
                                <Tab label="Thông tin" />
                                <Tab label="Lịch làm việc" />
                                <Tab label="Thiết lập lương" />
                                <Tab label="Nợ nhân viên" />
                              </Tabs>
                              <Box
                                sx={{
                                  padding: 2,
                                }}
                              >
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
                                   <EmployeeInfo/>
                                     
                                      <Grid
                                        container
                                        spacing={2}
                                        justifyContent="flex-end"
                                        sx={{ mt: 2 }}
                                      >
                                        <Grid item xs={12}>
                                          {/* <Payment_summary row={row} /> */}
                                        </Grid>
                                        {/* <Operation_completed /> */}
                                      </Grid>
                                    </Grid>
                                  </Box>
                                )}
                                {value === 1 && (
                                  <Typography>
                                    <Calendar/>
                                  </Typography>
                                )}
                                {value === 2 && (
                                  <Typography>
                                    <Wage/>
                                  </Typography>
                                )}
                                {value === 3 && (
                                  <Typography>
                                    <Monny_Owed/>
                                  </Typography>
                                )}
                                {value === 4 && (
                                  <Typography>{/* Nợ nhân viên */}</Typography>
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ListTransaction;
