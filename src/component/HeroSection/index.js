import {
  Box,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Container, Grid } from "@mui/system";
import styles from "@/src/styles/sass/components/Home.module.scss";
import { useRef, useState } from "react";
import api from "@/src/api/axiosInstance";
import LoadingArea from "../LoadingArea";
import { FLIGHT_SEARCH } from "@/src/apiConstants";
import IdeaDetailSection from "../home/IdeaDetailSection";

const HeroSection = ({ onSearchToggle }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]); // Add state for filtered results

  const inputRef = useRef(null); // Reference for the TextField

  // Handle the search button click
  const handleSearch = () => {
    const value = inputRef.current.value; // Get value from the TextField
    setSearchQuery(value);
    setIsSearch(true);
    setIsLoading(true);
    if (onSearchToggle) {
      onSearchToggle(true);
    }

    api.get(FLIGHT_SEARCH).then((res) => {
        console.log("API Response:", res.data);
        const filtered = res.data.flightSearchResults.filter((flight) =>
          flight.airline.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredResults(filtered);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  return (
    <section>
      <Container>
        <Box
          className={`${styles.HeroSection} ${isSearch ? styles.Active : ""}`}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box className={styles.Box}>
            {!isSearch ? (
              <div className="mb-40 align-center">
                <h1 className="darkgray">Travel made simple</h1>
                <p className="darkgray">
                  Your AI travel buddy, for smarter, stress-free trips
                </p>
              </div>
            ) : (
              ""
            )}

            {/* Message Body */}
            {isLoading ? (
              <section className={styles.messageBody}>
                <LoadingArea />
              </section>
            ) : (
              <>
                {isSearch && filteredResults.length > 0 ? (
                  <section className={styles.messageBody}>
                    <Box display="flex" justifyContent="flex-end" mb={2}>
                      <Card
                        className={styles.UserMessage}
                        sx={{
                          maxWidth: "75%",
                        }}
                      >
                        <CardContent>
                          <Typography variant="body2">
                            Showing results for: {searchQuery}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>

                    {/* Display the filtered flight results */}
                      {filteredResults.map((flight, index) => (
                      <Box display="flex" justifyContent="flex-start" mb={2}>
                          <Card
                            className={styles.AiMessage + " white-bg"}
                            variant="outlined"
                          >
                            <CardContent>
                              <Typography variant="h6">
                                {flight.flightNumber}
                              </Typography>
                              <Typography variant="body2">
                                {flight.airline}
                              </Typography>
                              <Typography variant="body2">
                                {flight.departureAirport} to{" "}
                                {flight.arrivalAirport}
                              </Typography>
                              <Typography variant="body2">
                                Departure:{" "}
                                {new Date(flight.departure).toLocaleString()}
                              </Typography>
                              <Typography variant="body2">
                                Arrival:{" "}
                                {new Date(flight.arrival).toLocaleString()}
                              </Typography>
                              <Typography variant="h6">
                                Price: ${flight.price.toFixed(2)}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      ))}
                  </section>
                ) : (
                  isSearch && (
                    <section className={styles.messageBody}>
                      <Box display="flex" justifyContent="flex-end" mb={2}>
                        <Card
                          className={styles.UserMessage}
                          sx={{
                            maxWidth: "75%",
                          }}
                        >
                          <CardContent>
                            <Typography variant="body2">
                              No flights found for {searchQuery}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </section>
                  )
                )}
              </>
            )}

            {/* Search Box */}
            <section>
              <div
                className={
                  `${styles.SearchBoxSection} ${
                    isSearch ? styles.active : ""
                  }` + " SearchBoxSection basecolor1-light-bg"
                }
              >
                <Container>
                  <Box
                    className={styles.SearchBox}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <div>
                      <TextField
                        fullWidth
                        placeholder="Describe your trip, and I’ll do the rest"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleSearch}>
                                <i className="fa fa-arrow-right"></i>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                        inputRef={inputRef}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSearch();
                          }
                        }}
                      />
                    </div>
                  </Box>
                </Container>
              </div>
            </section>

            {/* Suggestion Section */}
            {!isSearch ? <IdeaDetailSection /> : ""}
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default HeroSection;
