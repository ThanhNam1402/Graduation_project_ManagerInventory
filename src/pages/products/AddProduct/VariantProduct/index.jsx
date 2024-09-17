import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import ListOption from "./ListOption/ListOption";
import TableVariant from "./TableVariant/TableVariant";
import _ from "lodash";

function VariantProduct() {
  const [dataTable, setDataTable] = useState([]);

  //   get data option in list option
  const handleGetData = (data) => {
    console.log("data option ==", data);

    console.log("curent data table == ", dataTable);

    let resuft = createCombinations(data);
    console.log("new data table ==", resuft);

    setDataTable(resuft?.variants);

    // new data
    // let a = createNewCombinedArray(dataTable, resuft?.variants);

    // console.log("custom 2 ==", a);
    // setDataTable(a);
  };

  const createCombinations = (inputData) => {
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
  };

  const createNewCombinedArray = (currentArr, newData) => {
    let combinedArray = [...currentArr, ...newData];

    console.log(combinedArray);

    if (combinedArray.length > 0) {
      const uniqueNames = new Set();
      const result = [];

      combinedArray.forEach((item) => {
        if (!uniqueNames.has(item.name)) {
          uniqueNames.add(item.name);
          result.push(item);
        }
      });

      return result;
    }

    return null;
  };

  return (
    <div>
      <ListOption handleGetData={handleGetData} />

      <TableVariant dataTable={dataTable} />
    </div>
  );
}

export default VariantProduct;
