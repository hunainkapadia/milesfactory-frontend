import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { InviteDialogSubmit } from "@/src/store/slices/Base/baseSlice";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const InviteEmailForm = ({ flight_order }) => {
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [inputText, setInputText] = useState(""); // Track unsubmitted input
  const [emailError, setEmailError] = useState("");

  const handleDelete = (i) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const handleAddition = (tag) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(tag.text)) {
      setTags([...tags, tag]);
      setEmailError("");
    } else {
      setEmailError("Invalid email format");
    }
  };

  const handleSubmitInviteEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedInput = inputText.trim();

    let updatedTags = [...tags];

    // Add last valid typed email if not already in tags
    if (trimmedInput && emailRegex.test(trimmedInput)) {
      const alreadyExists = updatedTags.some(
        (tag) => tag.text.toLowerCase() === trimmedInput.toLowerCase()
      );

      if (!alreadyExists) {
        updatedTags.push({ id: trimmedInput, text: trimmedInput });
      }
    }

    // If still no valid emails
    if (updatedTags.length === 0) {
      setEmailError("Please add at least one valid email");
      return;
    }

    const emailList = updatedTags.map((tag) => tag.text);
    const payload = {
      emails: emailList.join(", "),
      flight_order: flight_order,
    };

    dispatch(InviteDialogSubmit(payload));

    // ✅ Reset state
    setTags([]);
    setInputText("");
    setEmailError("");
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Box className="col-left" sx={{ mb: 2 }}>
        <ReactTags
          tags={tags}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleInputChange={(text) => setInputText(text)} // Track input
          inputFieldPosition="inline"
          placeholder="Emails, comma separated"
          autocomplete
        />
        {emailError && (
          <Typography color="error" mt={1}>
            {emailError}
          </Typography>
        )}
      </Box>

      <Box className="col-right" display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={handleSubmitInviteEmail}
          className="btn btn-primary xs btn-sm btn-round"
        >
          Invite
        </Button>
      </Box>
    </Box>
  );
};

export default InviteEmailForm;
