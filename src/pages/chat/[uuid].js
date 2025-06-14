import Header from "@/src/component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import {
  fetchMessages,
  setGetMessageUUID,
} from "@/src/store/slices/GestMessageSlice";
import { useRouter } from "next/router";
import { Box, Container, Grid } from "@mui/material";
import Messages from "@/src/component/Messages";
import MessageInputBox from "@/src/component/SearchResult/chat/MessageInputBox";
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";
import YourTripSidebar from "@/src/component/SearchResult/YourTripSidebar";
import { setThreadUuid } from "@/src/store/slices/sendMessageSlice";

const ChatByUUID = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { uuid } = router.query;

  // Access your Redux messages
  const sendMessages = useSelector((state) => state.sendMessage?.messages);
  const getMessages = useSelector((state) => state.getMessages?.messages);
  const isMessage = [...getMessages, ...sendMessages];

  // Fetch messages using the UUID from URL

  const SearchHistoryGet = useSelector(
    (state) => state.getMessages.SearchHistory
  );
  const SearchHistorySend = useSelector(
    (state) => state.sendMessage?.SearchHistorySend
  );
  const SearchHistory = SearchHistorySend || SearchHistoryGet;

  useEffect(() => {
    if (!router.isReady) return; // Wait for router to be ready
    if (typeof uuid === "string" && uuid.trim() !== "") {
      console.log("uuid_chat", uuid);
      dispatch(setGetMessageUUID(uuid));
    }

    if (sendMessages.length === 0) {
      dispatch(fetchMessages());
    }
  }, [router.isReady, uuid, dispatch]);

  return (
    <>
      <main>
        <section
          id="fold1"
          className={
            styles.SearchBodyActive + " bg-cover bg-norepeat bg-center"
          }
        >
          <Header isMessage={isMessage} isChat />
          <Box className={styles.Box}>
            <Container className={styles.Container}>
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
                  {SearchHistory ? (
                    <YourTripSidebar isMessage={isMessage} />
                  ) : (
                    " "
                  )}
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
