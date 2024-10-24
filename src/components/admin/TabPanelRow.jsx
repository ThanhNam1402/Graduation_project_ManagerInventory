import PropTypes from "prop-types";
import { Box } from "@mui/material";

TabPanelRow.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TabPanelRow(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 2,
            bgcolor: "layout.main",
            borderRadius: "0 0 8px 8px",
            mb: 2,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

export default TabPanelRow;
