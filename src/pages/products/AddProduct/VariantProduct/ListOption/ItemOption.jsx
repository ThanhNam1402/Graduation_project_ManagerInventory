import { Stack } from "@mui/material";
import { useState, useEffect, memo } from "react";

import SelectOption from "./SelectOption";

import InputTags from "../../InputTags";

function ItemOption(props) {
  const { id, handleGetValue } = props;

  const [option, setOption] = useState({
    id: "",
    data: {
      id: "",
      value: [],
    },
  }); // {id = '', value = ['']}

  useEffect(() => {
    setOption((prevState) => ({
      ...prevState,
      id: id,
    }));
  }, []);

  // get value on props
  useEffect(() => {
    handleGetValue(option);
  }, [option]);

  // get id option select = ['']
  const handleGetOption = (id) => {
    setOption((prevState) => ({
      ...prevState,
      data: {
        ...option.data,
        id: id,
      },
    }));
  };

  // get value InputTags = ['']
  const handleGetTags = (value) => {
    setOption((prevState) => ({
      ...prevState,
      data: {
        id: prevState.data.id,
        value: [...value],
      },
    }));
  };

  return (
    <>
      <Stack margin={2} spacing={2} alignItems="center" direction="row">
        <>
          <SelectOption handleGetOption={handleGetOption} />
          <InputTags handleGetTags={handleGetTags} />
        </>
      </Stack>
    </>
  );
}

export default memo(ItemOption);
