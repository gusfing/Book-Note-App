import { useState } from "react";
import AddNoteModal from "../components/AddNoteModal";
import usePostBookNote from "../hooks/usePostBookNote";
// MUI components
import { Box, Grid } from "@mui/material";
//import EditNoteIcon from "@mui/icons-material/EditNote";
import StarIcon from "@mui/icons-material/Star";

const BookCoverGrid = (props) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  const { postBookNote, loading, success, error } = usePostBookNote();
  async function onSubmit(params) {
    const response = await postBookNote(params);
    if (success) {
      console.log("Note posted successfully:", response);
      // Add success snackbar
    } else {
      console.error("Failed to post note:", error);
      //Add failure snackbar
    }
  }

  return (
    <Grid
      className="p-3 d-flex flex-column border rounded align-items-center"
      size={{ xs: 12, lg: 3 }}
    >
      <Box className="cover-image__container">
        <img
          className="cover-image__item"
          src={
            props.rawCovers?.length > 0
              ? `https://covers.openlibrary.org/b/id/${props.rawCovers[0]}-M.jpg`
              : "https://dummyimage.com/150x200/cccccc/000000&text=No+Cover"
          }
          alt="book-cover-main"
        />
      </Box>
      <Box className="rating-star__container">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`star-${star}`}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
          >
            <StarIcon
              sx={{
                color: star <= hoveredStar ? "#ffc107" : "#bdbdbd",
                height: "32px",
                width: "32px",
                cursor: "pointer",
              }}
            />
          </button>
        ))}
      </Box>
      <Box className="d-flex gap-2">
        <AddNoteModal
          bookTitle={props.bookTitle}
          bookAuthor={props.bookAuthor}
          onSubmit={onSubmit}
        />
      </Box>
    </Grid>
  );
};

export default BookCoverGrid;
