import { useState, useEffect, useRef } from "react";

import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Stack,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

import LoadingBackdrop from "../../components/BackDrop";
import { categoryService } from "../../services/category.service";
import ModeIcon from "@mui/icons-material/Mode";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";
import ModalContent from "../../components/modalContent/modalContent";
import "./category.scss";
import PropTypes from "prop-types";

Categories.propTypes = {
  handleGetValue: PropTypes.func.isRequired,
};

function Categories({ handleGetValue }) {
  const { t } = useTranslation("filter");

  const [listCate, setListCate] = useState([]);
  const [preListCate, setPreListCate] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [valueEdit, setValueEdit] = useState();
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const refCate = useRef("");

  const [search, setSearch] = useState("");

  // HANDLE GET ALL CATEGORIES
  const handleGetAllCate = async () => {
    try {
      let res = await categoryService.handleGetAllCate();
      if (res && res?.status) {
        setListCate(res?.data?.data);
        setPreListCate(res?.data?.data);
      }
    } catch (error) {
      toast.error("Error getting all categories");
      console.log("error category");
    }
  };

  useEffect(() => {
    handleGetAllCate();
  }, []);

  const handleFindCate = (value) => {
    // find character in list cate
    let listFindCate = preListCate.filter((item) => item.name.includes(value));

    if (listFindCate.length > 0) {
      setListCate(listFindCate);
    }
    if (value === "") {
      setListCate(preListCate);
    }
    setSearch(value);
  };

  // HANDLE ADD CATEGORY
  const handleAddCate = async (name, description) => {
    try {
      let res = await categoryService.handleAddCate({ name, description });
      toast.success(res?.message || "Add Category Successfully");
      handleGetAllCate();

      handleCloseModal();
    } catch (error) {
      toast.error(error?.message || "Add Category Failed");
    }
  };

  //  HANDLE UPDATE CATEROGY
  const handleUpdateCate = async (id, data) => {
    try {
      let res = await categoryService.handleUpdateCate(id, data);
      toast.success(res?.message || "Add Category Successfully");
      handleGetAllCate();
      setIsOpenUpdate(false);
    } catch (error) {
      toast.error(error?.message || "Add Category Failed");
    }
  };

  const handleOpenAdd = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSetModal = () => {
    setIsOpenUpdate(!isOpenUpdate);
  };

  const handleOpenModalUpdate = (id) => {
    refCate.current = id;
    handleGetOneCate();
  };

  const handleDelCategory = async (id) => {
    try {
      let res = await categoryService.handleDelCate(id);
      toast.success(res?.message || "Delete category successfully");
      handleGetAllCate();
      handleSetModal();
    } catch (error) {
      toast.error(error?.message || "Eror ! delete category failed");
    }
  };

  // get one Cate
  const handleGetOneCate = async () => {
    try {
      let res = await categoryService.handleGetOneCate(refCate.current);
      setValueEdit({
        name: res?.data?.name,
        description: res?.data?.description,
      });
      setIsOpenUpdate(true);
    } catch (error) {
      toast.error("Error getting category");
    }
  };

  return (
    <>
      <LoadingBackdrop loading={false} />

      {/* MODAL ALL CATEGORY */}
      <ModalContent
        isOpen={isOpen}
        onCloseModal={handleCloseModal}
        title="Thêm danh mục"
      >
        <AddCategory
          onAddCate={handleAddCate}
          handleCloseModal={handleCloseModal}
        />
      </ModalContent>

      {/* MODAL UPDATE CATEGORY */}

      <ModalContent
        size="sm"
        isOpen={isOpenUpdate}
        onCloseModal={handleSetModal}
        title="Cập nhật sản phẩm"
      >
        <UpdateCategory
          id={Number(refCate.current)}
          valueEdit={valueEdit}
          onDeleteCate={handleDelCategory}
          onUpdateCate={handleUpdateCate}
          handleCloseModal={handleSetModal}
        />
      </ModalContent>

      <Paper elevation={2} sx={{ width: "100%", mb: 3 }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            {t("filter.category")}
          </AccordionSummary>

          <AccordionDetails>
            <Stack direction="row" alignItems={"center"}>
              <TextField
                variant="standard"
                fullWidth
                margin="normal"
                id="input-with-icon-textfield"
                size="small"
                value={search}
                onChange={(e) => handleFindCate(e.target.value)}
                placeholder="Tìm kiếm"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <IconButton
                onClick={handleOpenAdd}
                sx={{
                  p: 1,
                  m: 0,
                  minWidth: 0,
                }}
              >
                <AddIcon />
              </IconButton>
            </Stack>
            <FormControl fullWidth>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                name="radio-buttons-group"
                onChange={(e) => handleGetValue(e.target.value, "category")}
              >
                <FormControlLabel
                  value={""}
                  control={<Radio color="secondary" />}
                  label={"all"}
                />
                {listCate &&
                  listCate.length > 0 &&
                  listCate.map((item, index) => {
                    return (
                      <Stack
                        key={index}
                        direction="row"
                        className="category_item"
                        justifyContent="space-between"
                      >
                        <FormControlLabel
                          value={item.id}
                          control={<Radio color="secondary" />}
                          label={item.name}
                        />
                        <IconButton
                          onClick={() => handleOpenModalUpdate(item.id)}
                        >
                          <ModeIcon />
                        </IconButton>
                      </Stack>
                    );
                  })}
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  );
}

export default Categories;
