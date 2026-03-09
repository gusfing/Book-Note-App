import { useState } from "react";
import { Box, Button, Tooltip, Modal, TextField, Stack } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";

const AddNoteModal = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Tooltip title="Add your book notes" placement="right">
        <Button sx={{ color: "#414141" }} onClick={handleOpen}>
          <EditNoteIcon sx={{ height: "40px", width: "40px" }} />
          Note
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-content__container">
          <Box className="d-flex gap-1 mb-2">
            <Box className="flex-grow-1">
              <h6>
                <span style={{ fontWeight: "lighter" }}>Title: </span>
                {props?.bookTitle || "Unknown Title"}{" "}
              </h6>
              <h6>
                <span style={{ fontWeight: "lighter" }}>Author: </span>
                {props?.bookAuthor || "Unknown Author"}
              </h6>
            </Box>
            <Box className="flex-grow-1 text-end">
              <h6 style={{ fontWeight: "lighter" }}>
                User: {props?.userName || "Unknown User"}
              </h6>
            </Box>
          </Box>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, mb: 2, width: "62ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-textarea"
              label="Add your note here"
              placeholder="Write your thoughts about the book..."
              multiline
              maxRows={15}
            />
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success">
              Submit
            </Button>
            <Button variant="outlined" color="white">
              Edit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddNoteModal;
