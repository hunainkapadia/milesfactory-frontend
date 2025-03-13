import { Box, CircularProgress } from "@mui/material";

const ButtonLoading = () => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <CircularProgress
        size={24} // Adjust size
        sx={{ color: "#ffffff" }} // Change color
      />
    </Box>
  );
}

export default ButtonLoading;