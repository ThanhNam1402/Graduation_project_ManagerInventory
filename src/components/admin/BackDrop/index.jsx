import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  color: "#fff",
  zIndex: theme.zIndex.drawer + 9999,
}));

const LoadingBackdrop = ({ loading }) => {
  return (
    <StyledBackdrop open={loading} sx={{}}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  );
};

LoadingBackdrop.propTypes = {
  loading: PropTypes.bool,
};

export default LoadingBackdrop;
