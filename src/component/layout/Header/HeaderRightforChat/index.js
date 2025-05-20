import { deleteAndCreateThread } from "@/src/store/slices/sendMessageSlice";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import styles from "@/src/styles/sass/components/baseLayout.module.scss";
import MobileLoading from "@/src/component/LoadingArea/MobileLoading";
import { useDispatch } from "react-redux";

// Language list with flags
const languageList = [
  { code: "en", name: "English", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "fr", name: "French", flag: "https://flagcdn.com/w40/fr.png" },
  { code: "de", name: "German", flag: "https://flagcdn.com/w40/de.png" },
  { code: "es", name: "Spanish", flag: "https://flagcdn.com/w40/es.png" },
  { code: "it", name: "Italian", flag: "https://flagcdn.com/w40/it.png" },
  { code: "cn", name: "Chinese", flag: "https://flagcdn.com/w40/cn.png" },
  { code: "ar", name: "Arabic", flag: "https://flagcdn.com/w40/ae.png" },
  { code: "hi", name: "Hindi", flag: "https://flagcdn.com/w40/in.png" },
  { code: "jp", name: "Japanese", flag: "https://flagcdn.com/w40/jp.png" },
  { code: "ru", name: "Russian", flag: "https://flagcdn.com/w40/ru.png" },
];

// Currency list
const currencyList = [
  { code: "EUR", name: "Euro", icon: "€" },
  { code: "USD", name: "Dollar", icon: "$" },
  { code: "PKR", name: "Rupee (PKR)", icon: "₨" },
  { code: "INR", name: "Rupee (INR)", icon: "₨" },
];

const HeaderRightforChat = ({isSticky, forHeader}) => {
   console.log("isSticky_0", isSticky?.isSticky);
   
  const dispatch = useDispatch();
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const [currencyAnchor, setCurrencyAnchor] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(languageList[0]); // Default EN
  const [selectedCurrency, setSelectedCurrency] = useState(currencyList[0]); // Default EUR

  const handleLangClick = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleCurrencyClick = (event) => {
    setCurrencyAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setLanguageAnchor(null);
    setCurrencyAnchor(null);
  };

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    setLanguageAnchor(null);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setCurrencyAnchor(null);
  };

  return (
    <>
      <Box
        sx={{
          display: {
            lg: "flex",
            md: "flex",
            xs: forHeader ? "none" : "flex",
          },
          gap: { lg: 3, md: 3, xs: 0 },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          onClick={handleCurrencyClick}
          sx={{ cursor: "pointer", gap: 1 }}
          className={`${isSticky?.isSticky ? " basecolor1-dark2 " : " white "}`}
        >
          <Typography variant="body2">{selectedCurrency.icon}</Typography>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ marginLeft: 6, fontSize: 15 }}
          />
        </Box>

        <Menu
          anchorEl={currencyAnchor}
          open={Boolean(currencyAnchor)}
          onClose={handleClose}
        >
          {currencyList.map((currency) => (
            <MenuItem
              key={currency.code}
              onClick={() => handleCurrencySelect(currency)}
            >
              <Typography variant="body2">{currency.name}</Typography>
            </MenuItem>
          ))}
        </Menu>

        {/* Language Dropdown */}
        <Box
          display="flex"
          alignItems="center"
          onClick={handleLangClick}
          sx={{ cursor: "pointer" }}
          className={`${isSticky?.isSticky ? " basecolor1-dark2 " : " white "}`}
        >
          <img
            src={selectedLanguage.flag}
            alt={selectedLanguage.code.toUpperCase()}
            className={styles.flagIcon}
          />
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ marginLeft: 6, fontSize: 15 }}
          />
        </Box>

        <Menu
          anchorEl={languageAnchor}
          open={Boolean(languageAnchor)}
          onClose={handleClose}
        >
          {languageList.map((lang) => (
            <MenuItem
              key={lang.code}
              onClick={() => handleLanguageSelect(lang)}
            >
              <img
                src={lang.flag}
                alt={lang.name}
                className={styles.flagIcon}
              />
              <Typography variant="body2" ml={1}>
                {lang.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
        {/* Currency Dropdown */}
      </Box>

      {/* New Chat Thread Button */}
    </>
  );
};

export default HeaderRightforChat;
