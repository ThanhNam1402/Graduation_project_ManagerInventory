import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { Box, Grid, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";


const data = [
  { name: "Tháng 1", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Tháng 2", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Tháng 3", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Tháng 4", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Tháng 5", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Tháng 6", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Tháng 7", uv: 3490, pv: 4300, amt: 2100 },
];

const Top10 = () => {
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
              layout="vertical" // Đặt layout thành vertical để có biểu đồ ngang
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
              <Bar dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </>
  );
};

export default Top10;
