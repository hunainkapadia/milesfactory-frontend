import { Box, Typography } from "@mui/material";
import InviteEmailForm from "../../layout/InviteEmailForm";
import styles from "@/src/styles/sass/components/checkout/Payment.module.scss";
import { setInviteEmailDialog } from "@/src/store/slices/Base/baseSlice";
import { useDispatch } from "react-redux";
const InviteEmailSearch = ({inviteSuccess, orderData }) => {
   console.log("inviteSuccess_000", inviteSuccess );
   const dispatch = useDispatch();
   const inviteMoreEmailHandle = () => {
    dispatch(setInviteEmailDialog(true));
  };
  return (
    <>
      {!inviteSuccess ? (
        <>
          <Box>
            <Box mt={4}>
              <h3 className="regular f25">
                <span>Please help us spread </span>{" "}
                <img src="/images/heart-emoji.svg" alt="heart" />
              </h3>
              <Typography>
                Invite friends around to travel with Mylz.
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography>
                <img src="/images/hand-emoji.svg" alt="hand" />{" "}
                <img src="/images/hand-emoji.svg" alt="hand" /> We've sent the
                emails.
                <Box
                  component={"span"}
                  onClick={() => inviteMoreEmailHandle()}
                  className="text-decuration-none cursor-pointer basecolor1"
                >
                  {" "}
                  Invite more friends
                </Box>
              </Typography>
            </Box>
            <Box
              className={styles.InviteBox + " paymentInviteBox"}
              display="flex"
              gap={1}
              pt={2}
            >
              <InviteEmailForm flight_order={orderData.flight_order?.uuid} />
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box mt={4}>
            <h3 className="regular f25">
              <span>Thank you for inviting your friends! </span>
              <img src="/images/heart-emoji.svg" alt="heart" />
            </h3>
            <Typography>
              We've successfully sent your invitation — you're helping others
              discover great travel experiences!
            </Typography>
            <Typography>
              Before you go, leave a quick review. Your feedback helps us
              improve and makes travel better for everyone. 💙
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default InviteEmailSearch;
