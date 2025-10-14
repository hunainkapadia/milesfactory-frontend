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

  return (
    <>
      {/* Itinerary Section */}
      <Box id="itinerary-section" mb={2}>
        
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
