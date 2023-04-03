import { Modal, Box, Typography, Divider, Grid } from "@mui/material";
import { useCms } from "../../contexts/cms.context";
import { useEffect, useState } from "react";
import { ECMSActions } from "../../contexts/cms.reducer";

const ShortcutsModal = ({ open, onClose }) => {
  const [openModal, setOpenModal] = useState(open);

  const cms = useCms();

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  useEffect(() => {
    const keyUpCb = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cms.dispatch({
          type: ECMSActions.SET_SELECTED_COMPONENT,
          payload: {
            component: undefined,
          },
        });
      }
    };
    document.addEventListener("keydown", keyUpCb);
    return () => {
      document.removeEventListener("keydown", keyUpCb);
    };
  }, [cms]);

  return (
    <Modal
      open={openModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          maxHeight: "50%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          overflow: "auto",
        }}
      >
        <Typography id="modal-modal-title" variant="h4" component="h2">
          HotKeys
        </Typography>
        <ol
          style={{
            marginTop: "2rem",
            padding: "0px",
          }}
        >
          {[
            {
              description: "Unselect component",
              keys: ["Esc"],
            },
          ].map((item) => (
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={item.description}
            >
              <Typography variant="h6" component="h4">
                {item.description}
              </Typography>
              {item.keys.map((key, i) => (
                <div
                  key={key}
                  style={{
                    backgroundColor: "#f7f8f8",
                    padding: "0.5rem",
                    borderRadius: "10%",
                  }}
                >
                  <p>{key}</p>
                  {i >= item.keys.length ? <p>+</p> : <></>}
                </div>
              ))}
            </div>
          ))}
        </ol>
      </Box>
    </Modal>
  );
};

export { ShortcutsModal };
