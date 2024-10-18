import { Stack, Box, Typography } from "@mui/material";

import PropTypes from "prop-types";
import { handleformat } from "../../../utils/format";
import { REACT_APP_BACKEND_URL } from "../../../config/config";

function TabInfomation({ item, nameProductVariant }) {
  console.log(item);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            mr: 3,
          }}
        >
          <img
            src={`${REACT_APP_BACKEND_URL}/storage/${
              item?.photo[item?.photo?.length - 1]?.url
            }`}
            style={{
              width: "220px",
              display: "block",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            p: 2,
          }}
        >
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
                    Tồn kho
                  </Typography>
                  <p>{item?.inventory}</p>
                </Stack>
                <Stack mt={2} direction="row">
                  <Typography
                    sx={{ width: "110px" }}
                    variant="subtitle2"
                    component={"p"}
                  >
                    Giá bán
                  </Typography>
                  <p>{handleformat.formatPrice(item?.sale_price)}</p>
                </Stack>
                <Stack mt={2} direction="row">
                  <Typography
                    sx={{ width: "110px" }}
                    variant="subtitle2"
                    component={"p"}
                  >
                    Giá vốn
                  </Typography>
                  <p>{handleformat.formatPrice(item?.price)}</p>
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
        </Box>
      </Box>
    </>
  );
}

TabInfomation.propTypes = {
  item: PropTypes.object,
  nameProductVariant: PropTypes.string,
  handleDelProduct: PropTypes.func,
};

export default TabInfomation;
