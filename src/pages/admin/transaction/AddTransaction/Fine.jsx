import { Box, Avatar, Typography, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { handleformat } from "@/utils/format";
function Find({ value, handleAutocompleteChange, options }) {
  return (
    <>
      <Autocomplete
        value={value}
        onChange={handleAutocompleteChange}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 800 }}
        size="small"
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box component="li" {...props} display="flex" alignItems="center">
            <Avatar src={option.img} alt={option.name} sx={{ mr: 2 }} />
            <Typography>{option.name}</Typography>
            <Typography>
              {" "}
              - {handleformat.formatPrice(option.sale_price)}
            </Typography>
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Tìm sản phẩm..." />
        )}
      />
    </>
  );
}

export default Find;
