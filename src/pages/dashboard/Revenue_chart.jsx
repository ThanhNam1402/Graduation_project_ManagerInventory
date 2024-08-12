import { Box, Grid, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useState, useEffect } from "react";
import { orderService } from "./../../services/order.service";
import { handleformat } from "../../utils/format";

function Revenue_chart() {
  const [data, setData] = useState([]);
  const [revenue, SetRevenue] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await orderService.handleGetAll();
      let data = res.data;

      const groupedData = data.reduce((acc, item) => {
        const productName = item.Products.name;

        if (!acc[productName]) {
          acc[productName] = {
            name: productName,
            total: 0,
          };
        }
        acc[productName].total += item.Products.Order_Detail.total;
        return acc;
      }, {});



      const filteredData = Object.values(groupedData);
      const totalRevenue = filteredData.reduce((acc, item) => acc + item.total, 0);
     
      setData(filteredData);
      SetRevenue(totalRevenue);

      console.log("Data format: ", filteredData);
      console.log("Data revenue: ", revenue);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ mt: 3, p: 1, bgcolor: "background.paper", boxShadow: 2 }}>
        <div className="dashboardTitle">
          <Grid container spacing={2}>
            <Grid item xs={10}>
               <Typography variant="p" sx={{ ml: { xs: 2, sm: 7 } }}>
                 TỔNG DOANH THU THUẦN THÁNG NÀY: <span>{handleformat.formatPrice(revenue)}</span>
                </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl>
                <NativeSelect>
                  <option value={10}>Tháng Này</option>
                  <option value={20}>Tháng trước</option>
                  <option value={30}>Tuần trước</option>
                </NativeSelect>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <Box sx={{ width: "100%", height: 450 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
              <Legend
                width={80}
                wrapperStyle={{
                  top: 40,
                  right: 20,
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #d5d5d5",
                  borderRadius: 3,
                  lineHeight: "40px",
                }}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="total" fill="#8884d8" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </>
  );
}

export default Revenue_chart;
