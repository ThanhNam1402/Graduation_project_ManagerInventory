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
const data = [
  { name: "Page A", uv: 400 },
  { name: "Page B", uv: 500 },
  { name: "Page C", uv: 800 },
  { name: "Page D", uv: 200 },
];

function Revenue_chart() {
  return (
    <>
      <Box sx={{ mt: 3, p: 1, bgcolor: "background.paper", boxShadow: 2 }}>
        <div className="dashboardTitle">
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography variant="p" sx={{ ml: { xs: 2, sm: 7 } }}>
                DOANH THU THUẦN THÁNG NÀY: <span>208,239,750</span>
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
              <Bar dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </>
  );
}

export default Revenue_chart;
