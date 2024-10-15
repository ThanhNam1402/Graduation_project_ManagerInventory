import {
  Stack,
  IconButton,
  FormControl,
  Tooltip,
  MenuItem,
  Select,
} from "@mui/material";
import { useState, memo, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

import InputTags from "../../InputTags";

import PropTypes from "prop-types";

const EditVariant = memo(function EditVariant({
  listSelectOptions,
  onEditOption,
  defaultTags,
  defaultIdSelect,
}) {
  const [option, setOption] = useState({
    id: defaultIdSelect ? defaultIdSelect : "",
    value: defaultTags ? defaultTags : "",
  });

  const [isEdit, setIsEdit] = useState(true);

  const [valueSelect, setValueSelect] = useState(
    defaultIdSelect ? defaultIdSelect : ""
  );

  useEffect(() => {
    setOption(() => ({
      id: defaultIdSelect,
      value: defaultTags,
    }));
  }, [defaultIdSelect, defaultTags]);

  useEffect(() => {
    if (option) {
      onEditOption(option);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option]);

  const handleOpenEdit = () => {
    setIsEdit(!isEdit);
  };

  // get value InputTags = ['']
  const handleGetTags = (value) => {
    setOption((prevState) => ({
      id: prevState.id,
      value: [...value],
    }));
  };

  const handleChangeSelect = (e) => {
    setValueSelect(e.target.value);
    setOption(() => ({
      ...option,
      id: e.target.value,
    }));
  };

  return (
    <>
      <Stack margin={2} spacing={2} alignItems="center" direction="row">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
            disabled={isEdit}
            value={valueSelect}
            onChange={handleChangeSelect}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Chọn </em>
            </MenuItem>
            {listSelectOptions.map((item, index) => {
              return (
                <MenuItem key={index} value={item.id}>
                  {item?.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      <InputTags
        handleGetTags={handleGetTags}
        defaultValue={defaultTags}
        isEdit={isEdit}
      />
      <IconButton onClick={handleOpenEdit}>
        {isEdit ? (
          <Tooltip title="Chỉnh sửa">
            <EditIcon />
          </Tooltip>
        ) : (
          <Tooltip title="Hủy">
            <ClearIcon />
          </Tooltip>
        )}
      </IconButton>
    </>
  );
});

EditVariant.propTypes = {
  defaultTags: PropTypes.array,
  listSelectOptions: PropTypes.array,
  defaultIdSelect: PropTypes.number,
  onEditOption: PropTypes.func,
  onDeleteOption: PropTypes.func,
};

export default EditVariant;
