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
  Button,
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
import ModalCmp from "../../components/modalContent/modalContent";
import ModeIcon from "@mui/icons-material/Mode";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";
import "./category.scss";

function Categories(props) {
  const { t } = useTranslation("filter");

  const { handleGetValue } = props;
  const [listCate, setListCate] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const refCate = useRef("");

  const [search, setSearch] = useState("");

  // HANDLE GET ALL CATEGORIES
  const handleGetAllCate = async () => {
    try {
      let res = await categoryService.handleGetAllCate();
      if (res && res?.status) {
        setListCate(res?.data);
      }
    } catch (error) {
      toastr.error("Error getting all categories");
      console.log("error category");
    }
  };

  useEffect(() => {
    handleGetAllCate();
  }, []);

  const handleFindCate = (value) => {
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

      handleCloseModal();
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
    setIsOpenUpdate(!isOpenUpdate);
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

  return (
    <>
      <LoadingBackdrop loading={false} />

      {/* MODAL ALL CATEGORY */}
      <ModalCmp
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        title="Thêm danh mục"
      >
        <AddCategory
          onAddCate={handleAddCate}
          handleCloseModal={handleCloseModal}
        />
      </ModalCmp>

      {/* MODAL UPDATE CATEGORY */}

      <ModalCmp
        isOpen={isOpenUpdate}
        handleCloseModal={handleSetModal}
        title="Cập nhật sản phẩm"
      >
        <UpdateCategory
          id={refCate.current}
          onDeleteCate={handleDelCategory}
          onUpdateCate={handleUpdateCate}
          handleCloseModal={handleSetModal}
        />
      </ModalCmp>

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

              <Button
                onClick={handleOpenAdd}
                sx={{
                  p: 1,
                  m: 0,
                  minWidth: 0,
                }}
              >
                <AddIcon />
              </Button>
            </Stack>
            <FormControl fullWidth>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="0"
                name="radio-buttons-group"
                onChange={(e) => handleGetValue(e.target.value, "category")}
              >
                <FormControlLabel
                  value={0}
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
