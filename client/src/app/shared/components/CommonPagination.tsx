import React from "react";
import { Pagination, Box } from "@mui/material";

type CommonPaginationProps = {
  count: number;          // total pages
  page: number;           // current page
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  color?: "primary" | "secondary" | "standard";
  variant?: "text" | "outlined";
  shape?: "circular" | "rounded";
};

export default function CommonPagination({
  count,
  page,
  onChange,
  color = "primary",
  variant = "outlined",
  shape = "rounded",
}: CommonPaginationProps) {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color={color}
        variant={variant}
        shape={shape}
      />
    </Box>
  );
}