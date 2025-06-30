import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/src/styles/sass/components/AiBooking/AiBooking.module.scss";
import Footer from "../layout/Footer";
import HerosectionContent from "../home/HerosectionContent";
import MessageInputBox from "../SearchResult/chat/MessageInputBox";
import AiBookingMainHeader from "../layout/Header/AiBookingHeader/AiBookingMainHeader";

const AiBookingHero = () => {
  //  Get past messages from API (GET)
  const [tabValue, setTabValue] = useState(0);
  const [on, setOn] = useState(true);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const sendMessages = useSelector(
    (state) => state.sendMessage?.messages.length
  );
  const getmessages = useSelector((state) => state.getMessages.messages.length);
  const isMessage = sendMessages || getmessages; //check message length

  const dispatch = useDispatch();

  const threadUUID = useSelector((state) => state.sendMessage.ThreadUUIDsend);

  return (
    <>
      <Box className={`${styles.HeroSection}`}>
        <Container>
          <Box
            component={"section"}
            className={styles.HeroSectionIn}
            height={"100%"}
            py={3}
          >
            <AiBookingMainHeader />
            <Box className={styles.Content} height={"100%"}>
              <Box
                className={styles.ContentIn}
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                {/* Tabs start */}
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  TabIndicatorProps={{ style: { display: "none" } }}
                  className={styles.customTabs}
                >
                  <Tab
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <img
                          src={
                            tabValue === 0
                              ? "/images/direct-plan-icon-basecolor1.svg"
                              : "/images/direct-plan-icon.svg"
                          }
                          alt="Book a Flight"
                          style={{ width: 16, height: 16 }}
                        />
                        <Typography className="basecolor-dark f12">
                          Book a Flight
                        </Typography>
                      </Box>
                    }
                    className={`${styles.inactiveTab} ${
                      tabValue === 0 ? styles.activeTab : ""
                    }`}
                  />
                  <Tab
                    sx={{
                      pointerEvents: "none", // disable clicking
                      cursor:"pointer",
                    }}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <img
                          src={`${
                            tabValue === 1
                              ? "/images/book-trip-icon-basecolor1.svg"
                              : "/images/book-aitrip-icon.svg"
                          }`}
                          alt="Explore"
                          style={{ width: 16, height: 16 }}
                        />
                        <Typography
                          className="basecolor-dark f12"
                          sx={{
                            display: { lg: "block", md: "block", xs: "none" },
                          }}
                        >
                          Explore & Experience
                        </Typography>
                        <Typography
                          className="basecolor-dark f12"
                          sx={{
                            display: { lg: "none", md: "none", xs: "block" },
                          }}
                        >
                          Explore
                        </Typography>
                      </Box>
                    }
                    className={`${styles.inactiveTab} ${
                      tabValue === 1 ? styles.activeTab : ""
                    }`}
                  />
                </Tabs>

                {/* Tab Content */}
                <Box
                  component={"section"}
                  className={styles.TabSection + " white-bg"}
                  position={"relative"}
                >
                  <Box>
                    {tabValue === 0 ? (
                      <>
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          gap={2}
                          sx={{ pb: { lg: "23px", md: "23px", xs: "12px" } }}
                        >
                          <Typography sx={{ fontSize: { xs: 14 } }}>
                            Book your travel with{" "}
                            <Box className="basecolor1" component={"span"}>
                              AI
                            </Box>
                          </Typography>
                          <Box
                            onClick={() => setOn(!on)}
                            sx={{
                              width: { xs: 48, md: 48, lg: 50 },
                              height: { xs: 24, md: 24, lg: 28 },
                              borderRadius: "999px",
                              background: on
                                ? "linear-gradient(90deg, #6DA3FF, #00C4CC)" // gradient blue like image
                                : "#ccc",
                              position: "relative",
                              cursor: "pointer",
                              transition: "background 0.3s",
                            }}
                          >
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                backgroundColor: "#fff",
                                position: "absolute",
                                top: "50%",
                                left: on ? "26px" : "4px",
                                transform: "translateY(-50%)",
                                transition: "left 0.3s",
                              }}
                            />
                          </Box>
                        </Box>
                        <MessageInputBox isAiBooking="isAiBooking" />
                      </>
                    ) : (
                      <Typography variant="body1">tab2</Typography>
                    )}
                  </Box>
                </Box>
                {/* end tab */}
              </Box>
            </Box>
          </Box>
          <Box
            pt={3}
            pb={5}
            component={"a"}
            href="/"
            gap={1}
            alignItems="center"
            display="flex"
            className={" bold basecolor1 btn-link cursor-pointer"}
          >
            <i className={`fa fa-arrow-left fas`}></i>{" "}
            <Box component={"span"}>Back to Mylz</Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AiBookingHero;
