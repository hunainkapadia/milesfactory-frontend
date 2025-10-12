import {
  convertMarkdownToHtml,
  formatTextToHtmlList,
  sanitizeResponse,
} from "@/src/utils/utils";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
const SidebarItenarySection = () => {
  const getBuilder = useSelector((state) => state?.sendMessage?.AddBuilder);
  const BuilderArguments =
    getBuilder?.silent_function_template[0]?.function.arguments || {};
  console.log("getBuilder", BuilderArguments);

  return (
    <>
      {/* Itinerary Section */}
      <Box id="itinerary-section" mb={2}>
        <Box mb={1}>
          <Box display="flex" alignItems="center" gap="12px">
            <Typography
              className={`${TripStyles.onewayReturn} btn btn-xs btn-black`}
            >
              Itinerary for {BuilderArguments?.to_destination}
            </Typography>
          </Box>
        </Box>
        <Typography className="f12" sx={{ whiteSpace: "pre-line" }}>
          <Typography
            className="formateContent f12 mt-0"
            component="div"
            variant="body1"
            dangerouslySetInnerHTML={{
              __html: formatTextToHtmlList(
                convertMarkdownToHtml(
                  sanitizeResponse(BuilderArguments?.itinerary_text)
                )
              ),
            }}
          />
        </Typography>
      </Box>
    </>
  );
};

export default SidebarItenarySection;
