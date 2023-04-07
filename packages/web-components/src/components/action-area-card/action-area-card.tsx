import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function ActionAreaCard({
  title,
  description,
  onClick,
  preview,
}: {
  title: string;
  description: string;
  onClick(): void;
  preview;
}) {
  return (
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
  );
}

export { ActionAreaCard };
