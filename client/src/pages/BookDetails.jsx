import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useBookDetail from "../hooks/useBookDetail";
// MUI components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const BookDetails = () => {
  const { bookId, authorId } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const descriptionRef = useRef(null);

  //Custom hooks
  const bookDetail = useBookDetail(bookId, authorId);
  console.log("Book Detail:", bookDetail);

  const {
    description = "No description available",
    title = "Untitled",
    author: { personal_name = "Unknown Author" } = {},
    covers: rawCovers = [],
    revision = 0,
  } = bookDetail || {};
  // const description = bookDetail?.description;
  // const title = bookDetail?.title ?? "";
  // const personal_name = bookDetail?.author?.personal_name ?? "Unknown Author";
  // const covers = bookDetail?.covers ?? [];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  function extractBookDescription() {
    return typeof description === "string"
      ? description
      : (description?.value ?? "No description available.");
  }
  const descriptiontext = extractBookDescription();

  useEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;
    setIsExpanded(false);
    // Check if the content overflows the container
    setCanExpand(el.scrollHeight > el.clientHeight);
  }, [descriptiontext]);

  return (
    <Box sx={{ flexGrow: 1, padding: "20px" }}>
      <Grid container className="rounded text-body-emphasis" spacing={1}>
        <Grid className="p-3 border rounded flex-column" size={{ lg: 9 }}>
          <h1 className="display-6 fst-italic">{title}</h1>{" "}
          <p>
            by {personal_name}
            <span style={{ fontWeight: "lighter" }}> ({revision})</span>
          </p>
          <p
            ref={descriptionRef}
            className={`book-description my-3 ${isExpanded ? "book-description--expanded" : ""}`}
          >
            {descriptiontext}
          </p>
          {canExpand && (
            <button
              className="read-more-btn"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? (
                <>
                  Read Less <KeyboardArrowUpIcon />
                </>
              ) : (
                <>
                  Read More <KeyboardArrowDownIcon />
                </>
              )}
            </button>
          )}
          <Box className="book-meta__container">
            <Box className="book-meta__item">Publish Date</Box>
            <Box className="book-meta__item">Publisher</Box>
            <Box className="book-meta__item">Language</Box>
            <Box className="book-meta__item">Pages</Box>
          </Box>
        </Grid>

        <Grid
          className="p-1 d-flex justify-content-center align-items-start border rounded"
          size={{ lg: 3 }}
        >
          <Box className="cover-image__container">
            <img
              className="cover-image__item"
              src={
                rawCovers?.length > 0
                  ? `https://covers.openlibrary.org/b/id/${rawCovers[0]}-M.jpg`
                  : "https://dummyimage.com/150x200/cccccc/000000&text=No+Cover"
              }
              alt="book-cover-main"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookDetails;
