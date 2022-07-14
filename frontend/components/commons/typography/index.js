import Typography from "@mui/material/Typography";

export default function CustomTypography({
  children,
  variant = "subtitle1",
  component = "div",
  ...otherProps
}) {
  let { href, sx } = otherProps;

  if (component === "a") {
    if (sx) {
      return (
        <Typography
          variant={variant}
          gutterBottom
          component={component}
          sx={sx}
          href={href}
        >
          {children}
        </Typography>
      );
    }
    return (
      <Typography
        variant={variant}
        gutterBottom
        component={component}
        href={href}
      >
        {children}
      </Typography>
    );
  }

  return sx ? (
    <Typography variant={variant} gutterBottom component={component} sx={sx}>
      {children}
    </Typography>
  ) : (
    <Typography variant={variant} gutterBottom component={component}>
      {children}
    </Typography>
  );
}
