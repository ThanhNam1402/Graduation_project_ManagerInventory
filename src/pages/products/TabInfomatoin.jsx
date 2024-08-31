import { useState, useRef } from "react";
import { Stack, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import { REACT_APP_BACKEND_URL } from "../../config/config";
import UpdateProduct from "./UpdateProduct";

function TabInfomation(props) {
  let { item, handleDelProduct } = props;

  const [openModal, setOpenModal] = useState(false);
  const idRef = useRef();

  const handleOpenModal = (id) => {
    idRef.current = id;
    setOpenModal(!openModal);
  };

  const handelDelItem = (id) => {
    handleDelProduct(id);
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <img src={`${REACT_APP_BACKEND_URL}/${item?.img}`} width="100%" />
        </Grid>
        <Grid item xs={9}>
          <div>
            <Typography variant="h6" component={"h6"}>
              {item?.name}
            </Typography>
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
            </Stack>
          </div>
        </Grid>

        <Stack
          justifyContent="flex-end"
          direction="row"
          spacing={2}
          sx={{
            width: "100%",
          }}
          mt={3}
        >
          <Button
            onClick={() => handleOpenModal(item.id)}
            variant="contained"
            color="success"
          >
            Cập Nhật
          </Button>
          <Button
            component={Link}
            to={`${item.id}`}
            variant="contained"
            color="success"
          >
            Sao Chép
          </Button>

          {item.status !== 2 && (
            <Button
              onClick={() => handelDelItem(item.id)}
              variant="text"
              color="error"
            >
              Ngừng Kinh Doanh
            </Button>
          )}
        </Stack>
      </Grid>

      {idRef.current && (
        <UpdateProduct
          id={idRef.current}
          openModal={openModal}
          handleOpenModal={handleOpenModal}
        />
      )}
    </>
  );
}

export default TabInfomation;
