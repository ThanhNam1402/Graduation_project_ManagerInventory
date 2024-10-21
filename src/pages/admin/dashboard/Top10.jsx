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
import { Box, Grid, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

import { useState, useEffect } from "react";
import { orderService } from "@/services/order.service";

const Top10 = () => {
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
      const top10Products = filteredData
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);

      const totalRevenue = filteredData.reduce(
        (acc, item) => acc + item.total,
        0
      );

      setData(top10Products);
      SetRevenue(totalRevenue);

      console.log("Data format: ", top10Products);
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
              <Typography variant="p" sx={{ ml: 7 }}>
                TOP 10 HÀNG HÓA BÁN CHẠY THÁNG NÀY
                <span>
                  <FormControl sx={{ ml: 3 }}>
                    <NativeSelect>
                      <option value={10}>Doanh thu theo tuần</option>
                      <option value={20}>Theo tháng</option>
                    </NativeSelect>
                  </FormControl>
                </span>
              </Typography>
            </Grid>
            <Grid item xs={2}>
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
            <BarChart
              width={900}
              height={450}
              data={data}
              layout="vertical"
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis type="number" stroke="#8884d8" />
              <YAxis type="category" dataKey="name" />
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
              <Bar dataKey="total" fill="#8884d8" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </>
  );
};

export default Top10;
