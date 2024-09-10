import { TextField, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { categoryService } from "../../services/category.service";
import { toast } from "react-toastify";

function UpdateCategory(props) {
  const { handleCloseModal, id, onUpdateCate, onDeleteCate } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) {
      handleGetOneCate();
    }
  }, []);

  const handleGetOneCate = async () => {
    try {
      let res = await categoryService.handleGetOneCate(id);
      setName(res?.data?.name);
      setDescription(res?.data?.description);
    } catch (error) {
      toast.error("Error getting category");
    }
  };

  const handleSubmit = () => {
    if (!id) toast.error("Not found category");

    let data = {
      name,
      description,
    };
    onUpdateCate(id, data);
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

        <Button variant="outlined" color="success" onClick={handleCloseModal}>
          Hủy
        </Button>
        <Button
          variant="contained"
          sx={{
            boxShadow: 0,
          }}
          color="error"
          onClick={() => onDeleteCate(id)}
        >
          Xóa
        </Button>
      </Stack>
    </>
  );
}

export default UpdateCategory;
