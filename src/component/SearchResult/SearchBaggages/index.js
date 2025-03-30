import { Box, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";

const SearchBaggages = ({ offerData, SelectDrawer }) => {
   
  return (
    <Box display={"flex"} gap={3} flexDirection={"column"}>
      <Box mt={2} style={{ cursor: "pointer" }}>
        <Link href={"#"} onClick={SelectDrawer} className="text-decoration-none">
          <Box
            gap={1.5}
            alignItems={"center"}
            display={"flex"}
            className=" semibold"
          >
            <span>Flight details</span>
            <i className="fa-angle-right fa fas"></i>{" "}
          </Box>
        </Link>
      </Box>

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
    </Box>
  );
};

export default SearchBaggages;
