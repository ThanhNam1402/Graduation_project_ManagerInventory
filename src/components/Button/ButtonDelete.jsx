import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

ButtonDelete.propTypes = {
  onClick: PropTypes.func,
};

function ButtonDelete({ onClick }) {
  return (
    <>
      <Button
        onClick={onClick}
        variant="contained"
        startIcon={<DeleteOutlineIcon />}
        color="error"
        sx={{ boxShadow: 0 }}
      >
        Xóa
      </Button>
    </>
  );
}

export default ButtonDelete;
