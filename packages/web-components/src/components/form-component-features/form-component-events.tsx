import List from "@mui/material/List";
import DashboardIcon from "@mui/icons-material/Dashboard";

import ListSubheader from "@mui/material/ListSubheader";

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

function FeatureEvents({
  events,
  onEventClick,
}: {
  events: string[];
  onEventClick(event: string): void;
}) {
  return (
    <List component="nav">
      <ListSubheader inset>Choose the life-cycle event</ListSubheader>
      {events.map((event) => (
        <ListItemButton key="event" onClick={() => onEventClick(event)}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={event} />
        </ListItemButton>
      ))}
    </List>
  );
}

export { FeatureEvents };
