import Header from "@/src/component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styles from "@/src/styles/sass/components/Home.module.scss";
import HerosectionChat from "@/src/component/HerosectionChat";
import { fetchMessages } from "@/src/store/slices/GestMessageSlice";
import { useRouter } from "next/router";

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
            !isMessage ? styles.HomeBanner : styles.HomeBannerActive
          }`}
        >
          <HerosectionChat />
        </section>
        {/* for home section */}
      </main>
    </>
  );
};

export default Chat;
