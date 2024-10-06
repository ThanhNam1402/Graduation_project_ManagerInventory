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


import csUseQueryString from "../../hook/csUseQueryString";
import { orderService } from "./../../services/order.service";
import { handleformat } from "../../utils/format";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import PaysheetInfo from "./Paysheet_Information/info";
import Salary_slip from "./Salary_slip/salary_slip";
import Payment_history from "./Payment_history/payment_history";

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
                <TableCell>Mã</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Kỳ hạn trả</TableCell>
                <TableCell>Kỳ làm việc</TableCell>
                <TableCell>Tổng lương	</TableCell>
                <TableCell>Đã trả nhân viên	</TableCell>
                <TableCell>Còn cần trả</TableCell>
                <TableCell>Trạng thái</TableCell>
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
                                <Tab label="Phiếu lương" />
                                <Tab label="Thiết lập lương" />
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
                                      mt={4}
                                    >
                                    </Typography>
                                    <Grid container spacing={3}>
                                   <PaysheetInfo/>
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
                                    <Salary_slip/>
                                  </Typography>
                                )}
                                {value === 2 && (
                                  <Typography>
                                    <Payment_history/>
                                  </Typography>
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
