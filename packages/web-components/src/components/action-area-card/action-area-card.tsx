import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
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
      <Card elevation={4} draggable onClick={onClick}>
        <div style={{ padding: "1rem", backgroundColor: "grey" }}>
          {preview && preview()}
        </div>
        <CardActionArea onClick={onClick}>
          <CardContent onClick={onClick}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </ActionAreaWrapper>
  );
}

export { ActionAreaCard };
