import { Stack, Typography, Grid } from "@mui/material";

import PropTypes from "prop-types";

function TabInfomation({ item, nameProductVariant }) {
  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{
          my: 1,
        }}
      >
        <Grid item xs={3}>
          <img
            src="https://biahoihanoi.vn/upload/product/thiet-ke-chua-co-ten-1-6911.png"
            width="100%"
          />
        </Grid>
        <Grid item xs={9}>
          <div>
            <Typography variant="h6" component={"h6"}>
              {nameProductVariant}
            </Typography>
            <Stack direction={"row"} spacing={5}>
              <div>
                <Stack mt={2} direction="row">
                  <Typography
                    sx={{ width: "110px" }}
                    variant="subtitle2"
                    component={"p"}
                  >
                    Mã hàng
                  </Typography>
                  <p>{item?.code}</p>
                </Stack>
                <Stack mt={2} direction="row">
                  <Typography
                    sx={{ width: "110px" }}
                    variant="subtitle2"
                    component={"p"}
                  >
                    Mã vạch
                  </Typography>
                </Stack>
                <Stack mt={2} direction="row">
                  <Typography
                    sx={{ width: "110px" }}
                    variant="subtitle2"
                    component={"p"}
                  >
                    Danh Mục
                  </Typography>
                  <p>{item?.category_id}</p>
                </Stack>
                <Stack mt={2} direction="row">
                  <Typography
                    sx={{ width: "110px" }}
                    variant="subtitle2"
                    component={"p"}
                  >
                    Giá bán
                  </Typography>
                  <p>{item?.sale_price}</p>
                </Stack>
                <Stack mt={2} direction="row">
                  <Typography
                    sx={{ width: "110px" }}
                    variant="subtitle2"
                    component={"p"}
                  >
                    Giá vốn
                  </Typography>
                  <p>{item?.price}</p>
                </Stack>
                <Stack mt={2} direction="row">
                  <Typography
                    sx={{ width: "110px" }}
                    variant="subtitle2"
                    component={"p"}
                  >
                    Trọng lượng
                  </Typography>
                  <p>{item?.weight}</p>
                </Stack>
              </div>
              <div>
                <Stack mt={2} direction="row">
                  <Typography
                    sx={{ width: "110px" }}
                    variant="subtitle2"
                    component={"p"}
                  >
                    Ghi Chú
                  </Typography>
                  <p>{item?.description}</p>
                </Stack>
              </div>
            </Stack>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

TabInfomation.propTypes = {
  item: PropTypes.object,
  nameProductVariant: PropTypes.string,
  handleDelProduct: PropTypes.func,
};

export default TabInfomation;
