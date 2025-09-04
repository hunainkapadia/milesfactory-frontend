import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const HeaderUtils = () => {
  const uuid = useSelector((state) => state?.sendMessage?.threadUuid);
  const router = useRouter();

  useEffect(() => {
    if (uuid) {
      router.replace(`/chat/${uuid}`); // replace to avoid extra history entries
    }
  }, [uuid]);
  return null; // This component doesn’t render anything
};

export default HeaderUtils;
