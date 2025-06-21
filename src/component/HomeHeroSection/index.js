import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Footer from "../layout/Footer";
import HerosectionContent from "../home/HerosectionContent";
import MessageInputBox from "../SearchResult/chat/MessageInputBox";

const HomeHeroSection = () => {
  //  Get past messages from API (GET)
  const sendMessages = useSelector(
    (state) => state.sendMessage?.messages.length
  );
  const getmessages = useSelector((state) => state.getMessages.messages.length);
  const isMessage = sendMessages || getmessages; //check message length

  const dispatch = useDispatch();

  const threadUUID = useSelector((state) => state.sendMessage.ThreadUUIDsend);
  

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
            {/* ////////////////////////// Search Box start ////////////////////////// */}
              
            <Container>
              <MessageInputBox />
                <>
                  <Box
                    display={"none"}
                    gap={2}
                    mt={2}
                    justifyContent={"center"}
                  >
                    <Box>
                      <img height={28} src="/images/app-google-play.svg" />
                    </Box>
                    <Box>
                      <img height={28} src="/images/app-app-store.svg" />
                    </Box>
                  </Box>

                  <Box
                    sx={{ display: { xs: "none", lg: "flex", md: "flex" } }}
                    className={styles.ChatBullets}
                    textAlign={"center"}
                    justifyContent={"center"}
                    flexWrap={"wrap"}
                    fontSize={14}
                  >
                    <Box className={`${styles.ChatBullet} `} display={"flex"}
                      alignItems={"center"}>
                      ✅ Lowest price guaranteed
                    </Box>
                    <Box
                      gap={1}
                      display={"flex"}
                      alignItems={"center"}
                      className={` ${styles.ChatBullet} `}
                    >
                      <Box className="imggroup">
                        <img
                          src="/images/protection-text-icon.svg"
                          alt="Protection Icon"
                          width={15}
                        />
                      </Box>
                      <Typography component={"span"}>
                        Airline-direct booking and protection
                      </Typography>
                    </Box>
                    <Box className={`${styles.ChatBullet} `} display={"flex"}
                      alignItems={"center"}>
                      🔒 Privacy-safe
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: { xs: "flex", lg: "none", md: "none" } }}
                    className={styles.ChatBullets}
                    textAlign={"center"}
                    justifyContent={"center"}
                    flexWrap={"wrap"}
                    fontSize={12}
                  >
                    <Box className={`${styles.ChatBullet} `} display={"flex"}alignItems={"center"}>✅ Best price</Box>
                    <Box
                      gap={1}
                      display={"flex"}
                      alignItems={"center"}
                      className={` ${styles.ChatBullet} `}
                    >
                      <Box className="imggroup">
                        <img
                          src="/images/protection-text-icon.svg"
                          alt="Protection Icon"
                          width={15}
                        />
                      </Box>
                      <Typography component={"span"} fontSize={12}>
                        Airline-protected
                      </Typography>
                    </Box>
                    <Box className={`${styles.ChatBullet} `} display={"flex"}alignItems={"center"}>
                      🔒 Privacy-safe
                    </Box>
                  </Box>
                </>
              
            </Container>
            {/* ////////////////////////// Search Box end ////////////////////////// */}

            {/* //////////////////////// Chat Message end ////////////////////////*/}
          </Box>
          {!isMessage.length ? (
            <Footer id={"HomeSection3"} forHomeHero LearnMore={"Travel smarter"} />
          ) : (
            ""
          )}
        </Box>
      </section>
    </>
  );
};

export default HomeHeroSection;
