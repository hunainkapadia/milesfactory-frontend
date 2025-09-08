import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Footer from "../layout/Footer";
import HerosectionContent from "../home/HerosectionContent";
import MessageInputBox from "../SearchResult/chat/MessageInputBox";
import ConventionalForms from "../layout/ConventionalForms";

const HomeHeroSection = () => {
  const [tabValue, setTabValue] = useState(0);
  const [switchOn, setSwitchOn] = useState(true);

  // Redux state
  const sendMessages = useSelector((state) => state.sendMessage?.messages.length);
  const getmessages = useSelector((state) => state.getMessages.messages.length);
  const isMessage = sendMessages || getmessages;

  const dispatch = useDispatch();
  const threadUUID = useSelector((state) => state.sendMessage.ThreadUUIDsend);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <section>
        <Box
          className={`${styles.HeroSection} ${styles.mainHeroSection} ${
            isMessage.length ? styles.Active : ""
          }`}
          display="flex"
          justifyContent="center"
        >
          <Box className={styles.Box}>
            {!isMessage.length && <HerosectionContent />}

            <Container>
              {/* ---------------- Tabs ---------------- */}
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                TabIndicatorProps={{ style: { display: "none" } }}
                className={styles.customTabs}
              >
                <Tab
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography className="basecolor-dark f12">
                        Plan with Mylz AI
                      </Typography>
                    </Box>
                  }
                  className={`${
                    tabValue === 0 ? styles.activeTab : styles.inactiveTab
                  }`}
                />
                <Tab
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography className="basecolor-dark f12">
                        Other Tab
                      </Typography>
                    </Box>
                  }
                  className={`${
                    tabValue === 1 ? styles.activeTab : styles.inactiveTab
                  }`}
                />
              </Tabs>

              {/* ---------------- Tab Content ---------------- */}
              <Box
                className={styles.TabSection + " "}
                position="relative"
                mt={2}
              >
                {tabValue === 0 && (
                  <>
                    {/* Conditional render based on switch */}
                    {switchOn ? (
                      <MessageInputBox isHomePage={"isHomePage"} />
                    ) : (
                      <Box
                        className={
                          styles.Content + " " + styles.Content
                        }
                      >
                        <Box className={styles.ContentIn}>
                          <ConventionalForms />
                        </Box>
                      </Box>
                    )}

                    {/* Text + Switch BELOW the form */}
                  </>
                )}

                {tabValue === 1 && (
                  <Typography>Another tab content here</Typography>
                )}
                <Box className={styles.Content + " " + styles.Content}>
                  <Box
                    className={styles.ContentIn}
                    textAlign={"center"}
                    display={"flex"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                  >
                    <Box display="flex" alignItems="center" gap={2} mt={3}>
                      <Typography className="f14 white">
                        Plan with Mylz AI
                      </Typography>
                      {/* Switch Button */}
                      <Box
                        onClick={() => setSwitchOn(!switchOn)}
                        sx={{
                          width: { xs: 48, md: 48, lg: 50 },
                          height: { xs: 24, md: 24, lg: 28 },
                          borderRadius: "999px",
                          background: switchOn
                            ? "linear-gradient(90deg, #6DA3FF, #00C4CC)"
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
                            left: switchOn ? "26px" : "4px",
                            transform: "translateY(-50%)",
                            transition: "left 0.3s",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>

          {!isMessage.length ? (
            <Footer
              id={"HomeSection3"}
              forHomeHero
              LearnMore={"Travel smarter"}
            />
          ) : (
            ""
          )}
        </Box>
      </section>
    </>
  );
};

export default HomeHeroSection;
