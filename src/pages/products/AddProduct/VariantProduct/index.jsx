import { useState } from "react";
import { nanoid } from "nanoid";

import ListOption from "./ListOption/ListOption";
import TableVariant from "./TableVariant/TableVariant";

function VariantProduct() {
  const [dataTable, setDataTable] = useState([]);

  //   get data option in list option
  const handleGetData = (data) => {
    console.log("data option", data);
    console.log("data table", dataTable);

    let newDataOption = createCombinations(data);
    console.log("new data option", newDataOption?.variants);

    if (data && data?.length > 0) {
      let resuft = createCombinations(data);
      setDataTable(resuft?.variants);
    }
  };

  function createCombinations(inputData) {
    function combine(current, remaining) {
      if (remaining.length === 0) {
        combinations.push(current);
        return;
      }
      const first = remaining[0];
      const rest = remaining.slice(1);
      if (first?.value?.value?.length > 0) {
        first.value.value.forEach((value) => {
          combine([...current, { id: first.value.id, value }], rest);
        });
      }
    }

    const combinations = [];
    combine([], inputData);

    return {
      variants: combinations.map((combination) => ({
        options: combination,
        name: combination.map((item) => item.value).join("-"),
        price: 0,
        sale_price: 0,
        barcode: "",
        stock: 0,
        code: "",
      })),
    };
  }


  return (
    <div>
      <ListOption handleGetData={handleGetData} />

      <TableVariant dataTable={dataTable} />
    </div>
  );
}

export default VariantProduct;
