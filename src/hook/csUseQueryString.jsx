import queryString from "query-string";


// filters = {}
function csUseQueryString(filters) {
  console.log(filters);
  const filterParmas = queryString.stringify(filters);
  return filterParmas;
}

export default csUseQueryString;
