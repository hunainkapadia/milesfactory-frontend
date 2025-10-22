import { Box, Stack, Tooltip } from "@mui/material";

const IncludedTooltips = () => {
  return (
    <>
      <Stack flexDirection={"row"} alignItems={"center"} gap={"13px"}>
        <Tooltip title="Double room" placement="top" arrow>
          <Box className="imggroup">
            <img
              width={14}
              src="/images/hotel/hotel-bed-icon.svg"
              alt="Double room"
            />
          </Box>
        </Tooltip>

        <Tooltip title="Breakfast included" placement="top" arrow>
          <Box className="imggroup">
            <img
              width={14}
              src="/images/hotel/breakfast-icon-icon.svg"
              alt="Breakfast"
            />
          </Box>
        </Tooltip>

        <Tooltip title="Free wifi" placement="top" arrow>
          <Box className="imggroup">
            <img
              width={14}
              src="/images/hotel/hotel-wifi-icon.svg"
              alt="Wifi"
            />
          </Box>
        </Tooltip>

        <Tooltip
          display={{ md: "block", xs: "none" }}
          title="Daily housekeeping"
          placement="top"
          arrow
        >
          <Box className="imggroup">
            <img
              width={14}
              src="/images/hotel/hotel-leav-icon.svg"
              alt="Housekeeping"
            />
          </Box>
        </Tooltip>

        <Tooltip
          display={{ md: "block", xs: "none" }}
          title="Check-in: from 15:00 · Check-out: by 11:00"
          placement="top"
          arrow
        >
          <Box className="imggroup">
            <img
              width={14}
              src="/images/hotel/hotel-pay-icon.svg"
              alt="Checkin Checkout"
            />
          </Box>
        </Tooltip>
      </Stack>
    </>
  );
};

export default IncludedTooltips;