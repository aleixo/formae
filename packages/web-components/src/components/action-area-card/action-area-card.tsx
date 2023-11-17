import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container, Stack } from "@mui/material";
import { ActionAreaWrapper } from "./action-area-card.wrapper";

function ActionAreaCard({
  title,
  description,
  onClick,
  preview,
  onDeleteClick,
}: {
  title: string;
  description: string;
  onClick(): void;
  onDeleteClick?: () => void;
  preview?: any;
}) {
  return (
    <ActionAreaWrapper onDeleteClick={onDeleteClick}>
      <Card
        elevation={4}
        draggable
        onClick={onClick}
        sx={{ cursor: "pointer" }}
      >
        <CardActionArea onClick={onClick} sx={{ height: "200px" }}>
          <CardContent>
            <Stack gap="2rem">
              <Container
                style={{
                  padding: "1rem",
                  backgroundColor: "lightgray",
                }}
              >
                {preview && preview()}
              </Container>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </ActionAreaWrapper>
  );
}

export { ActionAreaCard };
