import { Box, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";

const SearchBaggages = ({offerData}) => {
  return (
    <Box
      display={"flex"}
      sx={{
        flexDirection: { xs: "row", lg: "column", md: "column" },
        gap: { xs: "2" },
      }}
    >
      <Box display={"flex"} alignItems={"center"}>
        <img src={"/images/checkout/carryon-bagg.svg"} />
        <Typography className={searchResultStyles.normalOption}>
          <span> 2 pieces</span>
        </Typography>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <img src="/images/leave-icon.svg" />
        <Typography className={searchResultStyles.normalOption}>
          <span> {offerData?.total_emissions_kg} kg CO₂e</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default SearchBaggages;
