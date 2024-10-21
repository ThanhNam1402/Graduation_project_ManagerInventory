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

import ModeIcon from "@mui/icons-material/Mode";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";
import ModalContent from "@/components/admin/modalContent/modalContent";
import {
  useGetAllCateQuery,
  useGetOneCateMutation,
  useAddCateMutation,
  useDeleteCateMutation,
  useUpdateCateMutation,
} from "@/services/category/categoryApis";
import CsLoading from "@/components/admin/CsLoading";

import PropTypes from "prop-types";
import "./category.scss";

Categories.propTypes = {
  handleGetValue: PropTypes.func.isRequired,
};

function Categories({ handleGetValue }) {
  const { t } = useTranslation("filter");

  const [listCate, setListCate] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [valueEdit, setValueEdit] = useState();
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const refCate = useRef("");

  const [search, setSearch] = useState("");

  const { data: categories, isFetching } = useGetAllCateQuery();
  const [getOneCate] = useGetOneCateMutation();
  const [addCate] = useAddCateMutation();
  const [updateCate] = useUpdateCateMutation();
  const [delCate] = useDeleteCateMutation();

  useEffect(() => {
    if (categories) {
      setListCate(categories?.data?.data);
    }
  }, [categories]);

  const handleFindCate = (value) => {
    // find character in list cate
    let listFindCate = categories?.data?.data.filter((item) =>
      item.name.includes(value)
    );

    if (listFindCate.length > 0) {
      setListCate(listFindCate);
    }
    if (value === "") {
      setListCate(categories?.data?.data);
    }
    setSearch(value);
  };

  // HANDLE ADD CATEGORY
  const handleAddCate = async (name, description) => {
    try {
      let res = await addCate({ name, description }).unwrap();
      toast.success(res?.message || "Add Category Successfully");
      handleCloseModal();
    } catch (error) {
      toast.error(error?.message || "Add Category Failed");
    }
  };

  //  HANDLE UPDATE CATEROGY
  const handleUpdateCate = async (id, data) => {
    try {
      let res = await updateCate({ data, id }).unwrap();
      toast.success(res?.message || "Update Category Successfully");
      setIsOpenUpdate(false);
    } catch (error) {
      toast.error(error?.message || "Update Category Failed");
    }
  };

  //  HANDLE DETELE CATEROGY
  const handleDelCategory = async (id) => {
    try {
      let res = await delCate(id).unwrap();
      toast.success(res?.message || "Delete category successfully");
      handleSetModal();
    } catch (error) {
      toast.error(error?.message || "Eror ! delete category failed");
    }
  };

  //  HANDLE GET ONE CATEROGY
  const handleGetOneCate = async () => {
    try {
      const res = await getOneCate(refCate.current).unwrap();
      setValueEdit({
        name: res?.data?.name,
        description: res?.data?.description,
      });
      setIsOpenUpdate(true);
    } catch (error) {
      toast.error("Error getting category");
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

  return (
    <>
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

            {isFetching ? (
              <CsLoading />
            ) : (
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
                    label={"All"}
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
            )}
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  );
}

export default Categories;
