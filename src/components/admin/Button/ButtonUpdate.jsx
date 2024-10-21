import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

ButtonUpdate.propTypes = {
  onClick: PropTypes.func,
  component: PropTypes.any,
  to: PropTypes.any,
};

function ButtonUpdate({ onClick, component, to }) {
  return (
    <>
      <Button
        component={component}
        to={to}
        onClick={onClick}
        variant="contained"
        startIcon={<ChangeCircleIcon />}
        color="primary"
        sx={{ boxShadow: 0 }}
      >
        Update
      </Button>
    </>
  );
}

export default ButtonUpdate;
