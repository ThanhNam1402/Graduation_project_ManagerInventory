import { useState, memo, useEffect, useCallback } from "react";
import { Button, Stack, Box, Tooltip, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import AddVariant from "./AddVariant";
import EditVariant from "./EditVariant";
import DeleteIcon from "@mui/icons-material/Delete";

import { optionService } from "@/services/option.service";

const ListVariant = memo(function ListVariant({ handleGetData }) {
  // list option service
  const [listOption, setListOption] = useState([]);

  // list variants ui
  const [rawListVariant, setRawListVariant] = useState([]);
  const [showAddOption, setShowAddOption] = useState(false);

  // handle add option ui
  const handleAddOption = useCallback(
    (option) => {
      setRawListVariant([...rawListVariant, option]);
      setShowAddOption(false);
    },
    [rawListVariant]
  );

  // handle delet option ui
  const handleDelVariant = (id) => {
    const newArray = rawListVariant.filter((val) => val.id !== id);
    setRawListVariant(newArray);
  };

  // handle get all option service
  const handleGetAllOptions = async () => {
    try {
      let res = await optionService.handleGetAllOption();
      setListOption(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetData(rawListVariant);
  }, [handleGetData, rawListVariant]);

  const handleShowAddVariant = () => {
    setShowAddOption(!showAddOption);
  };

  const handleEditVariant = (option) => {
    // let checkOption = rawListVariant.find((item) => item.id === option.id);
    const currentListVariant = [...rawListVariant];
    currentListVariant.forEach((item) => {
      if (item.id === option.id) {
        item.value = option.value;
      }
    });
    setRawListVariant(currentListVariant);
  };

  useEffect(() => {
    handleGetAllOptions();
  }, []);

  console.log(rawListVariant);

  return (
    <>
      <Box sx={{ my: 2 }}>
        {rawListVariant &&
          rawListVariant.length > 0 &&
          rawListVariant.map((item) => {
            return (
              <Stack alignItems="center" direction="row" key={item.id}>
                <EditVariant
                  listSelectOptions={listOption}
                  defaultIdSelect={item?.id}
                  defaultTags={item?.value}
                  onEditOption={handleEditVariant}
                />
                <Tooltip title="Hủy">
                  <IconButton onClick={() => handleDelVariant(item?.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            );
          })}
        <Button variant="contained" onClick={handleShowAddVariant}>
          {!showAddOption ? "Thêm thuộc tính" : "Hủy thêm thuộc tính"}
        </Button>

        {showAddOption && (
          <>
            <AddVariant
              onResetListOptions={handleGetAllOptions}
              onAddOption={handleAddOption}
              listSelectOptions={listOption}
            />
          </>
        )}
      </Box>
    </>
  );
});

ListVariant.propTypes = {
  handleGetData: PropTypes.func,
};

export default ListVariant;
