import { useState, memo } from "react";
import { Stack, Button, FormControl, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";

import InputTags from "../../InputTags";
import { optionService } from "../../../../../services/option.service";
import ModalContent from "../../../../../components/modalContent/modalContent";
import AddOptionVariant from "../../OptionVariant/AddOptionVariant";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";

import { toast } from "react-toastify";

const AddVariant = memo(function AddVariant({
  onAddOption,
  listSelectOptions,
  onResetListOptions,
}) {
  const { t } = useTranslation("notification");
  const [option, setOption] = useState({
    id: "",
    value: [],
  });

  const [valueSelect, setValueSelect] = useState("");
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  // get value InputTags = ['']
  const handleGetTags = (value) => {
    setOption((prevState) => ({
      id: prevState.id,
      value: [...value],
    }));
  };

  const handleChangeSelect = (e) => {
    setValueSelect(e.target.value);
    setOption((prevState) => ({
      ...prevState,
      id: e.target.value,
    }));
  };

  console.log("opton", option);

  // handle add variant ui
  const handleAddVariant = () => {
    onAddOption(option);
  };

  // handle open modal  option service
  const handleOpenAddOption = () => {
    setOpenModalAdd(true);
  };

  const handleClodeModalAdd = () => {
    setOpenModalAdd(!openModalAdd);
  };

  const handleDeleteOption = async (id) => {
    console.log(id);
    try {
      await optionService.handleDelOption(id);
      onResetListOptions();
      setValueSelect("");
      setOption((prevState) => ({
        ...prevState,
        id: "",
      }));
      toast.success(t("action_success"));
    } catch (error) {
      console.log(error);
    }

    setOpenModalUpdate(!openModalUpdate);
  };

  const handleAddOption = async (name) => {
    try {
      await optionService.handleNewOption(name);
      onResetListOptions();
      setValueSelect("");
      setOption((prevState) => ({
        ...prevState,
        id: "",
      }));
      toast.success(t("action_success"));
      handleClodeModalAdd();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ModalContent
        isOpen={openModalAdd}
        onCloseModal={handleClodeModalAdd}
        title="Thêm danh mục"
      >
        <AddOptionVariant
          onAddOptionVariant={handleAddOption}
          onCloseModal={handleClodeModalAdd}
        />
      </ModalContent>

      <Stack
        spacing={2}
        sx={{
          margin: "16px 0",
        }}
        alignItems="center"
        direction="row"
      >
        <>
          <FormControl variant="standard" sx={{ minWidth: 220 }} size="small">
            <Select
              value={valueSelect}
              onChange={handleChangeSelect}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="-1" onClick={handleOpenAddOption}>
                <em>Tạo mới thuộc tính</em>
              </MenuItem>
              <MenuItem disabled value="">
                <em>Chọn thuộc tính</em>
              </MenuItem>
              {listSelectOptions &&
                listSelectOptions.length > 0 &&
                listSelectOptions.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      <Stack
                        key={index}
                        direction="row"
                        alignItems="center"
                        sx={{
                          width: "100%",
                        }}
                        justifyContent="space-between"
                      >
                        {item.name}

                        <DeleteIcon
                          fontSize="small"
                          onClick={() => handleDeleteOption(item.id)}
                        />
                      </Stack>
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <InputTags handleGetTags={handleGetTags} isEdit={false} />
          <Button variant="contained" onClick={handleAddVariant}>
            Thêm
          </Button>
        </>
      </Stack>
    </>
  );
});

AddVariant.propTypes = {
  onAddOption: PropTypes.func,
  listSelectOptions: PropTypes.array,
  onResetListOptions: PropTypes.func,
};

export default AddVariant;
