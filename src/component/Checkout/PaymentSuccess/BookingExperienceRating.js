// components/checkout/BookingExperienceRating.js
import { Box, Typography, Rating, Stack, Chip } from "@mui/material";

const BookingExperienceRating = ({
  rating,
  ratingSuccess,
  reasons,
  selectedReason,
  handleRatingChange,
  handleReasonSelect,
}) => {
  if (ratingSuccess) {
    return (
      <Box pt={3}>
        <h3 className="regular f25 mb-0">Thank you for your feedback!</h3>
        <Typography variant="body1">
          We really appreciate you taking the time to rate your experience.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box mt={"40px"}>
        <Typography variant="body1" className="bold">
          How was your booking experience?
        </Typography>
        <Typography display={{ md: "block", xs: "none" }} variant="body1">
          Your answer is anonymous. We use it to improve our product.
        </Typography>
        <Typography display={{ md: "none", xs: "block" }} variant="body1">Your answer is anonymous.</Typography>
      </Box>
      <Box mb={3}>
        {/* Interactive Rating */}
        <Rating
          name="feedback-rating"
          value={rating}
          onChange={handleRatingChange}
          sx={{
            mt: 2,
            fontSize: "30px",
            "& .MuiRating-iconFilled": {
              color: "#00C4CC",
            },
            "& .MuiRating-iconHover": {
              color: "#00C4CC",
            },
          }}
        />
      </Box>

      {rating && rating <= 4 && (
        <>
          <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
            What was the main reason?
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
            {reasons.map((reason, index) => (
              <Chip
                key={index}
                label={reason}
                onClick={() => handleReasonSelect(reason)}
                sx={{
                  bgcolor: selectedReason === reason ? "#00C4CC" : "#fff",
                  color: selectedReason === reason ? "#fff" : "#69707B",
                  cursor: "pointer",
                }}
              />
            ))}
          </Stack>
        </>
      )}
    </>
  );
};

export default BookingExperienceRating;
