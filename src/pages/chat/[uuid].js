import Header from "@/src/component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { fetchMessages } from "@/src/store/slices/GestMessageSlice";
import { useRouter } from "next/router";
import { Box, Container, Grid } from "@mui/material";
import Messages from "@/src/component/Messages";
import MessageInputBox from "@/src/component/SearchResult/chat/MessageInputBox";
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";
import YourTripSidebar from "@/src/component/SearchResult/YourTripSidebar";
import MobileLoading from "@/src/component/LoadingArea/MobileLoading";

const ChatByUUID = () => {
  
  // Access your Redux messages
  const sendMessages = useSelector((state) => state.sendMessage?.messages);
  const getMessages = useSelector((state) => state.getMessages?.messages);
  const isMessage = [...getMessages, ...sendMessages];  
  // Fetch messages using the UUID from URL
  
  return (
    <>
      <main>
        <section
          id="fold1"
          className={
            styles.SearchBodyActive + " bg-cover bg-norepeat bg-center"
          }
        >
          <Header isMessage={isMessage} />
          <Box className={styles.Box}>
            <Container className={styles.Container}>
              <Box sx={{ display: { xs: "block", md: "none", lg: "none" } }}>
                <MobileLoading />
              </Box>
              <Grid container sx={{ width: "100%", margin: 0 }}>
                <Grid item md={8} lg={8}>
                  <Messages />
                </Grid>
                <Grid
                  item
                  md={4}
                  lg={4}
                  sx={{ display: { xs: "none", md: "block", lg: "block" } }}
                >
                  <YourTripSidebar isMessage={isMessage} />
                </Grid>
              </Grid>
              <Box
                className={inputStyles.SearchBoxGrid}
                sx={{ width: "100%", margin: 0 }}
              >
                <Container className={inputStyles.SearchBoxContainer}>
                  <Grid container>
                    <Grid item md={8} lg={8} xs={12}>
                      <MessageInputBox isMessageHome={isMessage} />
                    </Grid>
                    <Grid item md={4} lg={4}></Grid>
                  </Grid>
                </Container>
              </Box>
            </Container>
          </Box>
        </section>
      </main>
    </>
  );
};

export default ChatByUUID;
