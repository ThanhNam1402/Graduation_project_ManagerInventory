import { TextField, Stack, Button } from "@mui/material";
import { useState } from "react";

function AddCategory(props) {
  const { handleCloseModal, onAddCate } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onAddCate(name, description);
  };

  return (
    <>
      <Stack
        sx={{
          mb: 4,
        }}
        spacing={2}
      >
        <TextField
          fullWidth
          id="standard-required"
          label="Tên danh mục"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label="Mô tả"
          multiline
          variant="standard"
          maxRows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Stack>

      <Stack direction="row" spacing={2} justifyContent={"center"}>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Lưu
        </Button>
        <Button
          variant="outlined"
          sx={{
            boxShadow: 0,
          }}
          color="success"
          onClick={handleCloseModal}
        >
          Hủy
        </Button>
      </Stack>
    </>
  );
}

export default AddCategory;
