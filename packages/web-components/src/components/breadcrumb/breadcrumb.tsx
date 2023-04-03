import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.grey[100];
  return {
    backgroundColor,
    height: theme.spacing(4),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function BreadCrumb({
  paths,
  onClick,
  levelOneName,
}: {
  levelOneName: string;
  paths: string[];
  onClick(path?: string): void;
}) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="#"
          label={levelOneName}
          onClick={() => onClick()}
          icon={<HomeIcon fontSize="small" />}
        />
        {paths.map((path) => (
          <StyledBreadcrumb
            key={path}
            component="a"
            href="#"
            label={path}
            onClick={() => onClick(path)}
          />
        ))}
      </Breadcrumbs>
    </div>
  );
}

export { BreadCrumb };
