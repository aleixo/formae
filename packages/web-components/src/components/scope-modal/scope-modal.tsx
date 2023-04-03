import { TSchema } from "@form-builder/engine";
import { Modal, Box, Typography, Button, Badge } from "@mui/material";
import { useCms } from "../../contexts/cms.context";
import { useSchema } from "../../hooks/useSchema";

function flatten(object) {
  function iter(o, p) {
    if (o && typeof o === "object") {
      Object.keys(o).forEach(function (k) {
        iter(o[k], p.concat(k));
      });
      return;
    }
    path[p.join(".")] = o;
  }

  var path = {};
  iter(object, []);
  return path;
}

const ScopeModal = ({ open, onClose, scope }) => {
  const schema = useSchema();
  const cms = useCms();

  return (
    <Modal
      open={open}
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Scope values
        </Typography>
        {Object.keys(flatten(scope)).map((key) => {
          return (
            <Box
              key={key}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row"
            >
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {key}
              </Typography>

              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                flexDirection="row"
                gap="2rem"
              >
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText("${" + key + "}");
                  }}
                >
                  Copy
                </Button>
                <Badge
                  badgeContent={
                    schema.getComponentWithPattern<TSchema>(
                      cms.state.schema!,
                      key
                    ).length
                  }
                  color="secondary"
                ></Badge>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Modal>
  );
};

export { ScopeModal };
