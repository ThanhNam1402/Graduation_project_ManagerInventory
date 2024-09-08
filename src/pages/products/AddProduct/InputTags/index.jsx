import { Chip, TextField, Box } from "@mui/material";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const Tags = ({ data, handleDelete }) => {
  return (
    <Box
      sx={{
        height: "100%",
        margin: "0.5rem 0.5rem 0.5rem  0",
      }}
    >
      <Chip label={data} onDelete={() => handleDelete(data)} />
    </Box>
  );
};

export default function InputTags(props) {
  let { handleGetTags } = props;
  const [tags, SetTags] = useState([]);
  const tagRef = useRef();

  const handleDelete = (value) => {
    const newtags = tags.filter((val) => val !== value);
    SetTags(newtags);
    handleGetTags(newtags);
  };
  const handleOnSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tagRef.current.value === "") {
        toast.error("vui lòng nhập giá trị");
        return;
      }

      let checkTag = tags.find((tag) => tag === tagRef.current.value);

      if (checkTag) {
        toast.error("vui lòng nhập giá trị");
        return;
      }

      SetTags([...tags, tagRef.current.value]);
      handleGetTags([...tags, tagRef.current.value]);
      tagRef.current.value = "";
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TextField
        fullWidth
        onKeyDown={handleOnSubmit}
        inputRef={tagRef}
        variant="standard"
        size="small"
        sx={{ margin: "1rem 0" }}
        margin="none"
        placeholder="Enter tags"
        InputProps={{
          startAdornment: (
            <Box
              sx={{
                margin: "0 0.2rem 0 0",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {tags.map((data, index) => {
                return (
                  <Tags data={data} handleDelete={handleDelete} key={index} />
                );
              })}
            </Box>
          ),
        }}
      />
    </Box>
  );
}
