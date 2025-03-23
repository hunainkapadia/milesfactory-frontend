import Header from "@/src/component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { fetchMessages } from "@/src/store/slices/GestMessageSlice";
import { useRouter } from "next/router";
import { Box, Grid } from "@mui/material";
import Messages from "@/src/component/Messages";
import MessageInputBox from "@/src/component/SearchResult/chat/MessageInputBox";
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";
import YourTrip from "@/src/component/SearchResult/YourTrip";


const Chat = () => {
  // check message length
  //  Fetch messages from Redux store
  const sendMessages = useSelector((state) => state.sendMessage?.messages);
  const getmessages = useSelector((state) => state.getMessages?.messages);

  const isMessage = [...getmessages, ...sendMessages];
  console.log("isMessage", isMessage.length);

  return (
    <>
      <main>
        <section
          id="fold1"
          className={`${
            !isMessage
              ? styles.HomeBanner
              : styles.SearchBodyActive + " bg-cover bg-norepeat bg-center"
          }`}
        >
          <Header isMessage={isMessage} />
          <Box className={styles.Box}>
            <Grid container sx={{ width: "100%", margin: 0 }}>
              <Grid item md={1} lg={1}></Grid>
              <Grid item md={7} lg={7}>
                {/* ////////////////////////// Search Box start ////////////////////////// */}
                <Messages />
              </Grid>
              <Grid item md={4} lg={4}>
                <YourTrip isMessage={isMessage} />
              </Grid>
            </Grid>
            {/* //////////////////////// Chat Messages end ////////////////////////*/}
            <Grid className={inputStyles.SearchBoxGrid} container sx={{ width: "100%", margin: 0 }}>
              <Grid item md={1} lg={1}></Grid>
              <Grid item md={7} lg={7}>
                {/* ////////////////////////// Search Box start ////////////////////////// */}
                <MessageInputBox isMessageHome={isMessage} />
                {/* ////////////////////////// Search Box end ////////////////////////// */}
              </Grid>
              <Grid item md={4} lg={4}>
                
              </Grid>
            </Grid>
          </Box>
          {/* sending send and get message for chat prop */}
        </section>
        {/* for home section */}
      </main>
    </>
  );
};

export default Chat;
