import { useCallback, useEffect, useState } from "react";

import ListVariant from "./ListOption/ListVariant";
import TableVariant from "./TableVariant/TableVariant";
import PropTypes from "prop-types";

function VariantProduct({ onGetVariants }) {
  const [dataTable, setDataTable] = useState([]);

  //   get data option in list option
  const handleGetData = useCallback((data) => {
    let rawData = createCombinations(data);
    setDataTable(rawData?.variants);
  }, []);

  const createCombinations = (inputData) => {
    if (inputData.length <= 0) {
      return [];
    }
    function combine(current, remaining) {
      if (remaining.length === 0) {
        combinations.push(current);
        return;
      }
      const first = remaining[0];
      const rest = remaining.slice(1);
      if (first?.value?.length > 0) {
        first.value.forEach((value) => {
          combine([...current, { id: first.id, value }], rest);
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

  useEffect(() => {
    onGetVariants(dataTable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTable]);

  return (
    <div>
      <ListVariant handleGetData={handleGetData} />

      <TableVariant dataTable={dataTable} />
    </div>
  );
}

VariantProduct.propTypes = {
  onGetVariants: PropTypes.func,
};

export default VariantProduct;
