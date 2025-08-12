import Header from "@/src/component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import styles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import {
  fetchMessages,
  setGetMessageUUID,
} from "@/src/store/slices/GestMessageSlice";
import { useRouter } from "next/router";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Messages from "@/src/component/Messages";
import MessageInputBox from "@/src/component/SearchResult/chat/MessageInputBox";
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";
import YourTripSidebar from "@/src/component/SearchResult/YourTripSidebar";
import { setThreadUuid } from "@/src/store/slices/sendMessageSlice";
import { setChatscroll } from "@/src/store/slices/Base/baseSlice";
import BookingDrawer from "@/src/component/Checkout/BookingDrawer/BookingDrawer";
import BaggageDrawer from "@/src/component/Checkout/BaggageDrawer";
import { setisUserPopup } from "@/src/store/slices/Auth/SignupSlice";

const ChatByUUID = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { uuid } = router;
  console.log("uuid_url", uuid);

  const messagesEndRef = useRef(null);
  const [hasFlightOffers, sethasFlightOffers] = useState(null);
  const chatBodyRef = useRef(null);
  const prevScrollTopRef = useRef(0); // to store previous scroll position
  const [showArrow, setShowArrow] = useState(false);
  const [isUserScrollingUp, setIsUserScrollingUp] = useState(false);

  console.log("showArrow", showArrow);

  // Access your Redux messages
  const sendMessages = useSelector((state) => state.sendMessage?.messages);
  const getMessages = useSelector((state) => state.getMessages?.messages);
  const isMessage = [...getMessages, ...sendMessages];
  const newChatLoading = useSelector(
    (state) => state.sendMessage?.newChatLoading
  );
  console.log("getMessages", getMessages);

  // scroll on click select direct
  const ChatScroll = useSelector((state) => state.base.Chatscroll);
  // Scroll if ChatScroll becomes true
  useEffect(() => {
    if (ChatScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      dispatch(setChatscroll(false)); // Reset after scroll
    }
  }, [ChatScroll, dispatch]);
  // scroll on click select direct

  // Fetch messages using the UUID from URL

  const SearchHistoryGet = useSelector(
    (state) => state.getMessages.SearchHistory
  );
  const SearchHistorySend = useSelector(
    (state) => state.sendMessage?.SearchHistorySend
  );
  const SearchHistory = SearchHistorySend || SearchHistoryGet;
  const isNearBottom = (element) => {
    const threshold = 150; // px from bottom to consider "near"
    return (
      element.scrollHeight - element.scrollTop - element.clientHeight <
      threshold
    );
  };
  const isAtBottom = (element) => {
    const threshold = 50; // 50px from bottom is still considered “at bottom”
    return (
      element.scrollHeight - element.scrollTop - element.clientHeight <
      threshold
    );
  };

  // chat scroll
  // scroll messge chat
  useEffect(() => {
    if (!isMessage || isMessage.length === 0) return;

    const lastMessage = isMessage[isMessage.length - 1];
    const hasFlightOffers = lastMessage?.ai?.offers;

    // Do NOT scroll if user is manually scrolling up
    if (!hasFlightOffers && !isUserScrollingUp && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isMessage, isUserScrollingUp]);

  //
  useEffect(() => {
    const chatEl = chatBodyRef.current;
    if (!chatEl) return;

    let scrollTimeout = null;

    const handleScroll = () => {
      const chatEl = chatBodyRef.current;
      if (!chatEl) return;

      const currentScrollTop = chatEl.scrollTop;
      const scrollingUp = currentScrollTop < prevScrollTopRef.current;
      const scrollingDown = currentScrollTop > prevScrollTopRef.current;

      if (scrollingUp) {
        setIsUserScrollingUp(true);
        setShowArrow(true); //  Always show on scroll up — no timeout
      } else if (scrollingDown) {
        //  Only reset scroll lock if user is really at bottom
        if (isNearBottom(chatEl)) {
          setIsUserScrollingUp(false);
          setShowArrow(false);
        }
      }

      prevScrollTopRef.current = currentScrollTop;
    };

    chatEl.addEventListener("scroll", handleScroll);
    return () => {
      chatEl.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  const ScrollDown = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setIsUserScrollingUp(false);
    setShowArrow(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only
  const flightDetail = useSelector((state) => state.booking.flightDetail);

  const currentUser = useSelector((state) => state.base?.currentUser);
  console.log("currentUser", currentUser);

  useEffect(() => {
    if (currentUser) {
      dispatch(setisUserPopup(false)); // force login if not logged in
    } else {
      dispatch(setisUserPopup(true)); // force login if not logged in
    }
  }, [currentUser, dispatch]);

  
  useEffect(() => {
    if (!router.isReady) return; // Wait until router is ready
    const { uuid } = router.query;

    // Only fetch messages if we have a UUID and no messages yet if send messge not
    if (uuid && sendMessages.length === 0) {
      dispatch(fetchMessages(uuid));
    }
  }, [router.isReady, router.query.uuid, sendMessages.length, dispatch]);


  // for get message on page refresh
    console.log("geturlUUID_000", router?.query?.uuid);
    

  return (
    <>
      <Box component={"main"}>
        {isMobile && (
          <>
            <Header isMessage={isMessage} isChat />
          </>
        )}
        <Box
          component={"section"}
          id="fold1"
          className={
            styles.SearchBodyActive + " bg-cover bg-norepeat bg-center"
          }
        >
          {!isMobile && <Header isMessage={isMessage} isChat />}
          <Box className={styles.ChatBody} ref={chatBodyRef}>
            <Container className={styles.Container}>
              <Grid container width={"100%"} sx={{ margin: 0 }}>
                <Grid
                  className={styles.ChatBodyLeft}
                  item
                  md={7.3}
                  lg={7.3}
                  xs={12}
                >
                  {newChatLoading && (
                    <Box
                      sx={{
                        position: "fixed", // covers whole viewport
                        inset: 0, // top:0; right:0; bottom:0; left:0
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.2)", // dim background
                        zIndex: 2000, // above everything else
                      }}
                      aria-live="polite"
                      role="status"
                    >
                      <CircularProgress sx={{ color: "#fff" }} size={40} />
                    </Box>
                  )}
                  <Messages />
                </Grid>
                <Grid
                  item
                  sx={{
                    maxWidth: { lg: "674px", md: "674px" },
                    display: { xs: "none", md: "block", lg: "block" },
                  }}
                >
                  <YourTripSidebar isMessage={isMessage} />
                </Grid>
              </Grid>
            </Container>
            <div ref={messagesEndRef} />
          </Box>
          <Box className={styles.InputBody}>
            <Container className={styles.InputContainer}>
              <Box
                className={inputStyles.SearchBoxGrid}
                sx={{ width: "100%", margin: 0 }}
              >
                <Container className={inputStyles.SearchBoxContainer}>
                  <Grid container>
                    <Grid
                      item
                      sx={{ maxWidth: { lg: "674px", md: "674px" } }}
                      xs={12}
                      position={"relative"}
                    >
                      {showArrow && (
                        <IconButton
                          sx={{ position: "absolute", top: -60 }}
                          className={
                            " CircleButton btn-white " +
                            inputStyles.CircleButton
                          }
                          onClick={ScrollDown}
                        >
                          <i className="fa fa-arrow-down"></i>
                        </IconButton>
                      )}
                      <MessageInputBox isChat isMessageHome={isMessage} />
                    </Grid>
                    <Grid item md={4.7} lg={4.7}></Grid>
                  </Grid>
                </Container>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
      <BookingDrawer getFlightDetail={flightDetail} />
      <BaggageDrawer getFlightDetail={flightDetail} />
    </>
  );
};

export default ChatByUUID;
