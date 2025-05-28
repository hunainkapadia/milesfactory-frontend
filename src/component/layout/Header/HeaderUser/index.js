import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  setIsSignupUser,
  setisUserPopup,
} from "@/src/store/slices/Auth/SignupSlice"; // adjust import paths based on your store structure
import styles from "@/src/styles/sass/components/baseLayout.module.scss";
import { Logout, setIsUser, setLoginUser } from "@/src/store/slices/Auth/LoginSlice";
import { setCurrentUser } from "@/src/store/slices/Base/baseSlice";
// import isMessage, isSticky, IsActive, HandlePopup as needed

const HeaderUser = ({
  isSticky,
  IsActive,
  isMessage,
  MobileNavDrawer,
  formobileDrawer,
  forhHader,
}) => {
  const dispatch = useDispatch();

  // Select users from Redux
  const isSignupPopup = useSelector((state) => state.signup.SignupPopup);
  
  const isUserLogin = useSelector((state) => state?.login?.loginUser?.user);
  const isUserLoginGoogle = useSelector(
    (state) => state?.login?.loginUser?.user?.user
  );
  const isUserSignup = useSelector((state) => state.signup?.IsUser);
  const getSignUpUser = useSelector((state) => state.signup.SignupUser?.user);

  // Combine all sources to find current user
  const currentUser = isUserLogin;

    // isUserLoginGoogle || getSignUpUser || isUserLogin || isUserSignup;
    // Set user to Redux on initial mount from cookies
    console.log("currentUser", isUserLogin);
    useEffect(() => {
      const cookieUserString = Cookies.get("set-user");
      const access_token = Cookies.get("access_token");
      const refresh_token = Cookies.get("refresh_token");
      
      if (cookieUserString && access_token && refresh_token) {
        console.log("cookieUserString", cookieUserString);
        const cookieUser = JSON.parse(cookieUserString);


      dispatch(
        setIsSignupUser({
          user: {
            user: {
              first_name: cookieUser.first_name,
              last_name: cookieUser.last_name,
              email: cookieUser.email,
            },
          },
          access_token: access_token,
          refresh_token: refresh_token,
          status: 200,
        })
      );

      dispatch(
        setLoginUser({
          user: {
            user: {
              first_name: cookieUser.first_name,
              last_name: cookieUser.last_name,
              email: cookieUser.email,
            },
          },
          access_token: access_token,
          refresh_token: refresh_token,
          status: 200,
        })
      );
    }
  }, []);

  // Sync latest user to currentUser state
  useEffect(() => {
    if (currentUser) {
      dispatch(setCurrentUser(currentUser));
    }
  }, [currentUser, dispatch]);

  const logoutHandle = () => {
    dispatch(Logout())
  };

  const HandlePopup = () => {
    dispatch(setisUserPopup(true));
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only

  
  return (
    <>
      {currentUser?.user ? (
        <>
          <Box className={styles.Dropdown} position={"relative"}>
            <Box
              className={styles.Login}
              display="flex"
              alignItems="center"
              sx={{
                justifyContent: {
                  lg: "center",
                  md: "center",
                  xs: `${MobileNavDrawer ? "flex-start" : " flex-start"}`,
                },
                flexDirection: {
                  lg: "row",
                  md: "row",
                  xs: `${MobileNavDrawer ? "column-reverse" : " row-reverse"}`,
                },
                justifyContent: {
                  lg: "center",
                  md: "center",
                  xs: `${MobileNavDrawer ? "flex-end" : " flex-end"}`,
                },
              }}
              gap={2}
            >
              <Typography className={`${styles.userName} f14 bold`}>
                {!isMessage || !isSticky || !IsActive ? (
                  <>
                    {currentUser?.user?.first_name.charAt(0).toUpperCase()}.
                    <span className="capitalize">
                      {" "}
                      {currentUser?.user?.last_name || ""}
                    </span>
                  </>
                ) : (
                  <>
                    {currentUser?.user?.first_name || ""}{" "}
                    {currentUser?.user?.last_name || ""}
                  </>
                )}
              </Typography>

              <Box className={styles.userLater}>
                <Avatar
                  src={"image"}
                  alt={"User"}
                  sx={{
                    width: { lg: 32, md: 32, xs: 24 },
                    height: { lg: 32, md: 32, xs: 24 },
                    margin: "0 auto",
                    mb: 2,
                    bgcolor: "#80E1E5",
                  }}
                  className="white mb-0 f16 bold"
                >
                  {currentUser?.user?.first_name.charAt(0).toUpperCase()}
                </Avatar>
              </Box>
            </Box>
            {forhHader ? (
              <Box className={styles.DropdownItems}>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  className={`${styles.DropdownItemsBox} br-12 box-shadow-md`}
                >
                  <Box
                    className={`${styles.DropdownItem} text-decuration-none cursor-pointer`}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box width="20px">
                        <i className="far fa-user-circle"></i>
                      </Box>
                      <Typography>Profile</Typography>
                    </Box>
                  </Box>

                  <Box
                    className={`${styles.DropdownItem} text-decuration-none cursor-pointer`}
                    onClick={logoutHandle}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box width="20px">
                        <i className="fa fa-sign-out"></i>
                      </Box>
                      <Typography>Sign out</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Box>
        </>
      ) : (
        <>
          {formobileDrawer ? (
            <>
              <Box
                className={`${styles.Login} cursor-pointer`}
                sx={{
  display: { lg: "flex", md: "flex", xs: "flex" },
  justifyContent: {
    lg: "center",
    md: "center",
    xs: "flex-start", // or conditionally change if needed
  },
  gap: { lg: 2, md: 2, xs: 1.5 }, // spacing unit (1 = 8px by default)
}}

                alignItems="center"
                onClick={HandlePopup}
              >
                <Box
                  className="imggroup"
                  alignItems="center"
                  display="flex"
                  sx={{ width: { lg: 32, md: 32, xs: 24 } }}
                >
                  <img src={"/images/user-icon-gray.svg"} alt="User Icon" />
                </Box>
                <Typography className="bold f16">Sign in</Typography>
              </Box>
            </>
          ) : (
            <>
              <Box
                className={`${styles.Login} cursor-pointer`}
                sx={{
  display: { lg: "flex", md: "flex", xs: "flex" },
  justifyContent: {
    lg: "center",
    md: "center",
    xs: "flex-start", // or conditionally change if needed
  },
  gap: { lg: 2, md: 2, xs: 1.5 }, // spacing unit (1 = 8px by default)
}}

                alignItems="center"
                
                onClick={HandlePopup}
              >
                <Typography
                  className="bold f16"
                  sx={{
                    display: {
                      lg: "block",
                      md: "block",
                      xs: isMessage ? "none" : "block",
                    },
                  }}
                >
                  Sign in
                </Typography>

                <Box
                  className="imggroup"
                  alignItems="center"
                  display="flex"
                  sx={{ width: { lg: 24, md: 24, xs: 24 } }}
                >
                  <img
                    src={
                      isMessage || isSticky || IsActive
                        ? "/images/user-icon-gray.svg"
                        : "/images/user-icon-white.svg"
                    }
                    alt="User Icon"
                  />
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HeaderUser;
