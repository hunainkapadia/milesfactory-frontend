import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import TravelForm from "./TravelForm";
import HotelForm from "./HotelForm";
import Image from "next/image";

const ConventionalForms = () => {
  const [tab, setTab] = useState(0);

  // travel form state
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [tripClass, setTripClass] = useState("");
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // hotel form state
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [roomType, setRoomType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    console.log("Travel search:", {
      origin,
      destination,
      dateRange,
      tripClass,
    });
  };

  const handleHotelSearch = () => {
    console.log("Hotel search:", {
      location,
      checkIn,
      checkOut,
      travellers,
      roomType,
      priceRange,
    });
  };

  const tabItems = [
    { icon: "/images/travel-tab-icon.svg", label: "Travel" },
    { icon: "/images/travel-luggage-tab-icon.svg", label: "Travel Luggage" },
    { icon: "/images/hotel-tab-icon.svg", label: "Hotel" },
    { icon: "/images/hotel-camera-icon.svg", label: "Hotel Camera" },
  ];

  return (
    <Box className={styles.SearchBoxSectionHome}>
      <Box className={styles.SearchBoxContainer}>
        {/* Tabs */}
        <Box>

          <Tabs
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            centered
            classes={{ root: styles.AllTabs, indicator: styles.noIndicator }}
          >
            {tabItems.map((item, index) => (
              <Tab
                key={index}
                icon={
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={24}
                    height={24}
                  />
                }
                aria-label={item.label}
                classes={{
                  root: styles.Tab,
                  selected: styles.tabSelected,
                }}
              />
            ))}
          </Tabs>
        </Box>


        {/* Tab Panels */}
        {tab === 0 && (
          <TravelForm
            origin={origin}
            setOrigin={setOrigin}
            destination={destination}
            setDestination={setDestination}
            dateRange={dateRange}
            setDateRange={setDateRange}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            tripClass={tripClass}
            setTripClass={setTripClass}
            handleSearch={handleSearch}
            isLoading={isLoading}
          />
        )}

        {tab === 1 && <Box mt={3}>Travel Luggage form here</Box>}

        {tab === 2 && (
          <HotelForm
            location={location}
            setLocation={setLocation}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            travellers={travellers}
            setTravellers={setTravellers}
            roomType={roomType}
            setRoomType={setRoomType}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            handleHotelSearch={handleHotelSearch}
          />
        )}

        {tab === 3 && <Box mt={3}>Hotel Camera form here</Box>}
      </Box>
    </Box>
  );
};

export default ConventionalForms;
