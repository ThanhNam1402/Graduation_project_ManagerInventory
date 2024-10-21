import { Box, Avatar, Typography, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react"; // Import useState

function Find_Update({ value, options }) {
  const [inputValue, setInputValue] = useState(""); // State để quản lý giá trị ô input

  const handleChange = (event, newValue) => {
    handleAutocompleteChange(event, newValue); // Gọi hàm xử lý của parent component
    setInputValue(""); // Thiết lập lại giá trị ô input về chuỗi rỗng ngay sau khi chọn sản phẩm
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue); // Cập nhật giá trị ô input khi người dùng gõ
  };

  return (
    <>
      <Autocomplete
        value={value}
        onChange={handleChange} // Sử dụng hàm handleChange để xử lý việc chọn
        inputValue={inputValue} // Gán giá trị inputValue vào Autocomplete
        onInputChange={handleInputChange} // Xử lý thay đổi trong ô input
        id="controllable-states-demo"
        options={options}
        sx={{ width: 800, backgroundColor: "white" }}
        size="small"
        getOptionLabel={(option) => option.fullDisplayName}
        renderOption={(props, option) => (
          <Box
            component="p"
            {...props}
            display="flex"
            alignItems="center"
            key={option.sku_id}
          >
            <Avatar src={option.img} alt={option.name} sx={{ mr: 2 }} />
            <Box display="flex" flexDirection="column">
              <Typography>{option.fullDisplayName}</Typography>
              <Typography>Tồn kho: {option.inventory}</Typography>
            </Box>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tìm sản phẩm..."
            value={inputValue} // Gán giá trị cho ô input từ state
          />
        )}
      />
    </>
  );
}

export default Find_Update;
