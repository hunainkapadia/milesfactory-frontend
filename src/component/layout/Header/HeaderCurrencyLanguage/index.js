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
  { code: "en", name: "English", flag: "https://flagcdn.com/w80/gb.png" },
  { code: "fr", name: "French", flag: "https://flagcdn.com/w80/fr.png" },
  { code: "de", name: "German", flag: "https://flagcdn.com/w80/de.png" },
  { code: "es", name: "Spanish", flag: "https://flagcdn.com/w80/es.png" },
  { code: "it", name: "Italian", flag: "https://flagcdn.com/w80/it.png" },
  { code: "cn", name: "Chinese", flag: "https://flagcdn.com/w80/cn.png" },
  { code: "ar", name: "Arabic", flag: "https://flagcdn.com/w80/ae.png" },
  { code: "hi", name: "Hindi", flag: "https://flagcdn.com/w80/in.png" },
  { code: "jp", name: "Japanese", flag: "https://flagcdn.com/w80/jp.png" },
  { code: "ru", name: "Russian", flag: "https://flagcdn.com/w80/ru.png" },
];


// Currency list
const currencyList = [
  { code: "GBP", name: "GBP", icon: "£" },
  { code: "EUR", name: "Euro", icon: "€" },
  { code: "USD", name: "Dollar", icon: "$" },
  { code: "PKR", name: "Rupee (PKR)", icon: "₨" },
  { code: "INR", name: "Rupee (INR)", icon: "₨" },
];

const HeaderCurrencyLanguage = ({
  isSticky,
  IsActive,
  isMessage,
  forHeader,
  formobileDrawer,
}) => {
  console.log("isSticky_0", isSticky);

  const dispatch = useDispatch();
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const [currencyAnchor, setCurrencyAnchor] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(languageList[0]); // Default EN
  const [selectedCurrency, setSelectedCurrency] = useState(currencyList[0]); // Default GBP

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
      {formobileDrawer ? (
        <>
          {/* Language Dropdown */}
          <Box
            display="flex"
            alignItems="center"
            // onClick={handleLangClick}
            sx={{ cursor: "pointer" }}
            className={`basecolor1-dark2`}
          >
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Box className={styles.flagIcon} width={20} sx={{
                backgroundImage: `url(${selectedLanguage.flag})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
                
              </Box>
              <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: 10 }} />
            </Box>
            <Typography pl={2} variant="body2">
              {selectedLanguage.name}
            </Typography>
          </Box>

          <Menu
            anchorEl={languageAnchor}
            open={Boolean(languageAnchor)}
            onClose={handleClose}
          >
            {languageList.map((lang) => (
              <MenuItem
                key={lang.code}
                // onClick={() => handleLanguageSelect(lang)}
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
          {/* currency start */}
          <Box
            display="flex"
            alignItems="center"
            // onClick={handleCurrencyClick}
            sx={{ cursor: "pointer", gap: 0 }}
            className={`basecolor1-dark2`}
          >
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Box width={20}>
                <Typography fontSize={20} variant="body2" px={0.5}>
                  {selectedCurrency.icon}
                </Typography>
              </Box>
              <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: 10 }} />
            </Box>
            <Typography pl={2} variant="body2">
              {selectedCurrency.name}
            </Typography>
          </Box>

          <Menu
            anchorEl={currencyAnchor}
            open={Boolean(currencyAnchor)}
            onClose={handleClose}
          >
            {currencyList.map((currency) => (
              <MenuItem
                key={currency.code}
                // onClick={() => handleCurrencySelect(currency)}
              >
                <Typography variant="body2">{currency.name}</Typography>
              </MenuItem>
            ))}
          </Menu>

          {/* Currency Dropdown */}
        </>
      ) : (
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
            // onClick={handleCurrencyClick}
            sx={{ cursor: "pointer", gap: 0 }}
            className={`${
              isSticky || IsActive || isMessage
                ? " basecolor1-dark2 "
                : " white "
            }`}
          >
            <Typography variant="body2">{selectedCurrency.icon}</Typography>
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ marginLeft: 6, fontSize: 12 }}
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
                // onClick={() => handleCurrencySelect(currency)}
              >
                <Typography variant="body2">{currency.name}</Typography>
              </MenuItem>
            ))}
          </Menu>

          {/* Language Dropdown */}
          <Box
            display="flex"
            alignItems="center"
            // onClick={handleLangClick}
            sx={{ cursor: "pointer" }}
            className={`${
              isSticky || IsActive || isMessage
                ? " basecolor1-dark2 "
                : " white "
            }`}
          >
            <Box
              className={styles.flagIcon + " imaggroup"}
              width={20}
              borderRadius={100}
              sx={{
                backgroundImage: `url(${selectedLanguage.flag})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
            </Box>
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ marginLeft: 6, fontSize: 8 }}
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
                // onClick={() => handleLanguageSelect(lang)}
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
      )}
      {/* New Chat Thread Button */}
    </>
  );
};

export default HeaderCurrencyLanguage;