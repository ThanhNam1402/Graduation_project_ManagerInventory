import React from "react";

import { Paper, Typography } from "@mui/material";

let listProduct = [
  { name: "namcute" },
  { name: "namcute" },
  { name: "namcute" },
  { name: "namcute" },
  { name: "namcute" },
  { name: "namcute" },
];

function ListProducts(props) {
  console.log(props);
  return (
    <div>
      <Paper
        sx={{ width: "100%", minHeight: "100vh", bgcolor: "primary.main" }}
      >
        {listProduct.map((item, index) => {
          return (
            <Typography key={index} variant="h6" component={"p"}>
              {props.categoryId}
            </Typography>
          );
        })}
      </Paper>
    </div>
  );
}

export default ListProducts;
