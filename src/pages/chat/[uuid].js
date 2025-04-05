import Header from "@/src/component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { fetchMessages } from "@/src/store/slices/GestMessageSlice";
import { useRouter } from "next/router";
import { Box, Grid } from "@mui/material";
import Messages from "@/src/component/Messages";
import MessageInputBox from "@/src/component/SearchResult/chat/MessageInputBox";
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";
import YourTripSidebar from "@/src/component/SearchResult/YourTripSidebar";

const ChatByUUID = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { uuid } = router.query;

  // Access your Redux messages
  const sendMessages = useSelector((state) => state.sendMessage?.messages);
  const getMessages = useSelector((state) => state.getMessages?.messages);
  const isMessage = [...getMessages, ...sendMessages];

  // Fetch messages using the UUID from URL
  useEffect(() => {
    if (uuid) {
      dispatch(fetchMessages(uuid));
    }
  }, [uuid]);

  return (
    <>
      <main>
        <section
          id="fold1"
          className={`${
            !isMessage.length
              ? styles.HomeBanner
              : styles.SearchBodyActive + " bg-cover bg-norepeat bg-center"
          }`}
        >
          <Header isMessage={isMessage} />
          <Box className={styles.Box}>
            <Grid container sx={{ width: "100%", margin: 0 }}>
              <Grid item md={1} lg={1}></Grid>
              <Grid item md={7} lg={7}>
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
            <Grid
              className={inputStyles.SearchBoxGrid}
              container
              sx={{ width: "100%", margin: 0 }}
            >
              <Grid item md={1} lg={1}></Grid>
              <Grid item md={7} lg={7} xs={12}>
                <MessageInputBox isMessageHome={isMessage} />
              </Grid>
              <Grid item md={4} lg={4}></Grid>
            </Grid>
          </Box>
        </section>
      </main>
    </>
  );
};

export default ChatByUUID;
