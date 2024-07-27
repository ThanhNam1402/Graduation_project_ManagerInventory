// import { useState, useEffect } from "react";
// import Snackbar from "@mui/material/Snackbar";
// import queryString from "query-string";
// import { ToastContainer, toast } from "react-toastify";

// // filters is obj,
// // funcGetAll : handleGedata
// // funcDelete : handleDeleteData

// function csFetchApi(props) {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   console.log("props", props);

//   let { filters, handleGetData, handleDeleteData } = props;

//   const filterParmas = queryString.stringify(filters);
//   console.log(filterParmas);

//   useEffect(() => {
//     fetchData();
//   }, [filters]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await handleGetData(filterParmas);

//       console.log(response);
//       setData(response);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (ids) => {
//     try {
//       let res = await handleDeleteData(ids);

//       if (res && res.status === true) {
//         toast.success("hhihi");

//         await fetchData();
//       }
//     } catch (error) {
//       setError(error);
//     }
//   };

//   return { data, error, loading, handleDelete };
// }

// export default csFetchApi;
