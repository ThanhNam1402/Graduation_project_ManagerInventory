export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {

  if (array && array.length > 0) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

}

export const TotalRowCount = (price, qty, sale_price) => {
  let newQty = qty ? qty : 1;
  let a = price * newQty - sale_price;
  return a;
};

export const TotalPrice = (items) => {
  if (items.length > 0) {
    let c = 0;
    items.forEach((item) => {
      c += TotalRowCount(item?.price, item?.qty, item?.discount);
    });
    return c;
  }
  return 0;
};

export const TotalSalePrice = (items) => {
  if (items.length > 0) {
    let c = 0;
    items.forEach((item) => {
      c += item?.discount;
    });
    return c;
  }
  return null;
};

export function SubTotal(items) {
  if (items.length > 0) {
    let c = 0;
    items.forEach((item) => {
      c += item?.price;
    });
    return c;
  }
  return null;
}

export const delay = (t) => {
  return new Promise(resolve => setTimeout(resolve, t));
}

export const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


/* 

key defalut = price
key = price or sale_price trung với item trong mãng để + 

*/

export const averagePrice = (arrayPrice, key = "price") => {
  let average = 0
  arrayPrice.forEach((item) => {
    average += item[key]
  })
  return average / arrayPrice.length

}

export const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
