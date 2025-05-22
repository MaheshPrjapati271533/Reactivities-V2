import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import ActivityCard from "./ActivityCard";
import CommonPagination from "../../app/shared/components/CommonPagination";
import { useActivities } from "../../lib/hooks/useActivities";





const PAGE_SIZE = 5;

export default function ActivityList() {
  
  const [page, setPage] = useState(1);
  const { activities = []  } = useActivities();

  // === activities;


  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentActivities = (activities || []).slice(startIndex, endIndex);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <Stack spacing={3}>
        {currentActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}

          />
        ))}
      </Stack>

      <CommonPagination
        count={Math.ceil(activities.length / PAGE_SIZE)}
        page={page}
        onChange={handleChange}
      />
    </Box>
  );
}