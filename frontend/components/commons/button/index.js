import { Button, IconButton } from "@mui/material";

export default function CustomButton({
  children,
  handleOnAction,
  type = "text",
  color = "secondary",
  size = "small",
  variant = "outlined",
  startIcon,
  endIcon,
}) {
  if (type === "icon") {
    return (
      <IconButton
        color={color}
        size={size}
        variant={variant}
        onClick={handleOnAction}
      >
        {children}
      </IconButton>
    );
  }

  if (type === "iconWithText") {
    return (
      <Button
        variant={variant}
        startIcon={startIcon}
        endIcon={endIcon}
        onClick={handleOnAction}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      color={color}
      size={size}
      variant={variant}
      onClick={handleOnAction}
    >
      {children}
    </Button>
  );
}
