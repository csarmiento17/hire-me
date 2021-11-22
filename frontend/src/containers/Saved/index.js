import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AppliedJobs from "../../components/AppliedJobs";
import SavedJobs from "../../components/SavedJobs";

export default function IconLabelTabs() {
  const [tab, setTab] = useState(0);

  const handleChange = (e, newValue) => {
    e.preventDefault();
    setTab(newValue);
  };

import { REMOVE_BOOK } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

  const SavedBooks = () => {
    const { loading, data } = useQuery(GET_ME);
    const [removeBook] = useMutation(REMOVE_BOOK);
  
    const userData = data?.me || [];
  
    // create function that accepts the book's mongo _id value as param and deletes the book from the database
    const handleDeleteBook = async (bookId) => {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
  
      try {
        const { data } = await removeBook({
          variables: { bookId },
        });
        // upon success, remove book's id from localStorage
        removeBookId(bookId);
      } catch (err) {
        console.error(err);
      }
    };
  
    if (loading) {
      return <h2>LOADING...</h2>;
    }

  return (
    <Box className="container">
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="icon label tabs example"
      >
        <Tab icon={<FavoriteIcon />} label="Saved Jobs" />
        <Tab icon={<AccessTimeFilledIcon />} label="Applied Jobs" />
      </Tabs>
      {tab === 0 && <SavedJobs />}
      {tab === 1 && <AppliedJobs />}
    </Box>
  );
}




