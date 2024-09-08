import { useState, memo, useEffect } from "react";
import { Button, Stack, Box } from "@mui/material";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

import ItemOption from "./ItemOption";

function ListOption(props) {
  let { handleGetData } = props;
  
  // raww data
  const [rawListOption, setRawListOption] = useState([]);

  const handleAddOption = () => {
    let nnid = nanoid();
    let newComp = {
      id: nnid,
      value: {},
    };
    setRawListOption([...rawListOption, newComp]);
  };

  const handleDelComp = (id) => {
    const newArray = rawListOption.filter((val) => val.id !== id);
    setRawListOption(newArray);
  };

  const handleGetValue = (data) => {
    const currentListOption = [...rawListOption];

    currentListOption.forEach((item) => {
      if (item.id === data.id) {
        item.value = data.data;
      }
    });
    setRawListOption(currentListOption);
  };

  // need fix item.value.value
  useEffect(() => {
    let newData = rawListOption.filter((item) => item?.value?.id);
    handleGetData(newData);
  }, [rawListOption]);

  console.log(rawListOption);

  return (
    <>
      <Box sx={{ my: 2 }}>
        {rawListOption &&
          rawListOption.length > 0 &&
          rawListOption.map((Comp) => {
            return (
              <Stack
                margin={2}
                spacing={2}
                alignItems="center"
                direction="row"
                key={Comp.id}
              >
                {<ItemOption id={Comp?.id} handleGetValue={handleGetValue} />}

                <Button onClick={() => handleDelComp(Comp.id)}>Del</Button>
              </Stack>
            );
          })}
        <Button variant="outlined" onClick={handleAddOption}>
          Thêm Thuộc Tính
        </Button>
      </Box>
    </>
  );
}

export default memo(ListOption);
