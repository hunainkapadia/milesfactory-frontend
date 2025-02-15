import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

const AiSearch = () => {
   const [searchQuery, setSearchQuery] = useState(""); // State for input field

  const handleSearch = () => {
    console.log("Searching...");
    // Add your AI search logic here
  };
   return (
      <>
         <section className="mb-50 SearchBoxSection">
              <TextField
                fullWidth
                placeholder="Describe your trip, and I’ll do the rest"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearch} >
                        <i className="fa fa-arrow-right"></i>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </section>
      </>
   );
}

export default AiSearch;