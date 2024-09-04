import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  color: '#fff',
  zIndex: theme.zIndex.drawer + 1,
}));

const LoadingBackdrop = ({ loading }) => {
  return (
    <StyledBackdrop open={loading}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  );
};

export default LoadingBackdrop;