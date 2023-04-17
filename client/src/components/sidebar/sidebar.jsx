import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "white",
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "lightpurple",
      color: "white",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
  },
  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Link
        to="/visitorlist"
        className={classes.item}
        style={{color: 'inherit', textDecoration: 'inherit'}}
      >
        <DashboardIcon className={classes.icon}></DashboardIcon>
        <Typography className={classes.text}>Dashboard</Typography>
      </Link>
      <Link to="/" className={classes.item} style={{ color: 'inherit', textDecoration: 'inherit' }}>
        <AddLocationAltIcon className={classes.icon}></AddLocationAltIcon>
        <Typography className={classes.text}>Check-In</Typography>
      </Link>
    </Container>
  );
};

export default Sidebar;
