import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { PreviewContainer } from "../form-field-wrapper/form-field-wrapper";
import { ActionAreaWrapper } from "./action-area-card.wrapper";

function ActionAreaCard({
  title,
  description,
  onClick,
  preview,
  enableDelete,
}: {
  title: string;
  description: string;
  onClick(): void;
  preview?: any;
  enableDelete: boolean;
}) {
  return (
    <ActionAreaWrapper onDeleteClick={() => {}}>
      <Card elevation={4} draggable onClick={onClick}>
        <div style={{ padding: "1rem", backgroundColor: "grey" }}>
          {preview && preview()}
        </div>
        <CardActionArea>
          <CardContent>
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
