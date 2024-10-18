import { TextField, Box } from "@mui/material";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import "./InputTags.scss";

const Tags = ({ data, handleDelete, isEdit }) => {
  return (
    <Box
      sx={{
        margin: "0.5rem 0.5rem 0.5rem  0",
        display: "flex",
        alignItems: "center",
        backgroundColor: "primary.light",
        py: 0.5,
        px: 1.5,
        color: "#fff",
        borderRadius: 1,
      }}
    >
      {data}
      {!isEdit && (
        <ClearIcon
          sx={{
            cursor: "pointer",
            ml: 1,
          }}
          onClick={() => handleDelete(data)}
        />
      )}
    </Box>
  );
};

Tags.propTypes = {
  handleDelete: PropTypes.func,
  data: PropTypes.string,
  isEdit: PropTypes.bool,
};

function InputTags({ handleGetTags, defaultValue, isEdit }) {
  const [tags, SetTags] = useState(defaultValue ? defaultValue : []);
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
        className="tagsInput"
        fullWidth
        onKeyDown={handleOnSubmit}
        inputRef={tagRef}
        disabled={isEdit}
        variant="standard"
        size="small"
        sx={{ mt: "9px", mb: 1, width: "100%" }}
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
                  <Tags
                    data={data}
                    handleDelete={handleDelete}
                    key={index}
                    isEdit={isEdit}
                  />
                );
              })}
            </Box>
          ),
        }}
      />
    </Box>
  );
}

InputTags.propTypes = {
  handleGetTags: PropTypes.func,
  defaultValue: PropTypes.array,
  isEdit: PropTypes.bool,
};

export default InputTags;
