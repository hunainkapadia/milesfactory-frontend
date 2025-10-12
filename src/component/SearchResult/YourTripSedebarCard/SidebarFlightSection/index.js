"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";

// Utility functions (you may already have them imported elsewhere)

import {
  convertMarkdownToHtml,
  formatTextToHtmlList,
  sanitizeResponse,
} from "@/src/utils/utils";
import OfferCardSidebar from "../OfferCardSidebar";

const SidebarFlightSection = ({ flight, getBuilder, index, uuid }) => {
  const BuilderArguments =
    getBuilder?.silent_function_template[0]?.function.arguments || {};
  console.log("BuilderArguments", BuilderArguments);

  return (
    <>
      {/* Flight Section */}
      {flight?.slices && (
        <>
          {flight?.slices?.map((slice, sliceIndex) => (
            <React.Fragment key={sliceIndex}>
              <Box mb={2}>
                {sliceIndex === 0 ? (
                  <>
                    <Box display="flex" alignItems="center" gap="12px">
                      <Typography
                        className={`${TripStyles.onewayReturn} btn btn-xs btn-black`}
                      >
                        Departing
                        {BuilderArguments?.departure_date && (
                          <>
                            {" "}
                            |{" "}
                            {new Date(
                              BuilderArguments?.departure_date
                            ).toLocaleDateString("en-GB", {
                              weekday: "short",
                              day: "2-digit",
                              month: "short",
                            })}
                          </>
                        )}
                      </Typography>
                      <Typography className="f12 bold">
                        {BuilderArguments?.from_destination} -{" "}
                        {BuilderArguments?.to_destination}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box display="flex" alignItems="center" gap="12px">
                      <Typography
                        className={`${TripStyles.onewayReturn} btn btn-xs btn-black`}
                      >
                        Return
                        {BuilderArguments?.return_date && (
                          <>
                            {" "}
                            |{" "}
                            {new Date(
                              BuilderArguments?.return_date
                            ).toLocaleDateString("en-GB", {
                              weekday: "short",
                              day: "2-digit",
                              month: "short",
                            })}
                          </>
                        )}
                      </Typography>
                      <Typography className="f12 bold">
                        {BuilderArguments?.to_destination} -{" "}
                        {BuilderArguments?.from_destination}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>

              {/* Offer Card */}

              {/* <Box
                    id={sliceIndex === 1 ? "offer-card-return" : "offer-card"}
                  > */}
              <OfferCardSidebar
                index={sliceIndex}
                slice={slice}
                getItems={flight}
                uuid={uuid}
              />

              {/* Itinerary Section */}
              {BuilderArguments?.itinerary_text && sliceIndex === 0 && (
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
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

export default SidebarFlightSection;
