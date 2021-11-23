import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, Badge } from "@mui/material";
import AppliedJobs from "../../components/AppliedJobs";
import SavedJobs from "../../components/SavedJobs";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Spinner from "../../components/Spinner";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -5,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function IconLabelTabs() {
  const { data, loading, refetch } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState(data?.me || {});
  const [tab, setTab] = useState(0);

  useEffect(() => {
    data?.me?.savedJobs && setUserData(data?.me);
  }, [data, loading]);

  useEffect(async () => {
    await refetch();
  }, []);

  const handleChange = (e, newValue) => {
    e.preventDefault();
    setTab(newValue);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <Box className="container">
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="icon label tabs example"
      >
        <Tab
          label={
            <StyledBadge
              badgeContent={userData ? userData.savedJobs?.length : "0"}
              color="primary"
            >
              Saved Jobs
            </StyledBadge>
          }
        />
        <Tab
          label={
            <StyledBadge
              badgeContent={userData ? userData.appliedJobs?.length : "0"}
              color="primary"
            >
              Applied Jobs
            </StyledBadge>
          }
        />
      </Tabs>
      {tab === 0 && <SavedJobs />}
      {tab === 1 && <AppliedJobs />}
    </Box>
  );
}
