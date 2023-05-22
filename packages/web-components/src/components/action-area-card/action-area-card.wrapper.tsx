import { Delete } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface IProps {
  children: any;
  onDeleteClick(): void;
}

const ActionAreaWrapper = ({ children, onDeleteClick }: IProps) => {
  const [show, setShow] = useState(false);

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{
        position: "relative",
        opacity: 1,
        outlineStyle: show ? "dashed" : "none",
        outlineWidth: "1px",
        outlineColor: "red",
        minHeight: "20px",
      }}
    >
      {show && (
        <div>
          <div
            style={{
              position: "absolute",
              zIndex: 20,
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ backgroundColor: "red" }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onDeleteClick();
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export { ActionAreaWrapper };
