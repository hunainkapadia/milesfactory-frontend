import { Box, Typography } from "@mui/material";

const ChatError = (error) => {
   
   
  return (
    <>
      {error && (
        <Box
          mb={3}
          elevation={0}
          sx={{
            width: "100%",
            p: 3,
            borderRadius: "12px",
            border: "1px solid #ef4444",
            backgroundColor: "#fef2f2",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#b91c1c", fontWeight: 600, mb: 1 }}
          >
            Error
          </Typography>
          <Typography variant="body2" sx={{ color: "#991b1b" }}>
            {error?.error ? error?.error : "Something went wrong, please try again"}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ChatError;
