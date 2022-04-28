import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { makeStyles, createStyles } from "@mui/styles";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export interface IProps {
  handleFilter?: any;
}

const useStyles = makeStyles(() =>
  createStyles({ 
    bar:{
     
     
    }
   })
  );

const Header = (props: IProps) => {
  const { handleFilter } = props;
  const [keyword, setKeyword] = useState("");
  const searchRef = React.useRef<any>();
  var value: string = "";
  const handleFilterAction = (event: any) => {
    value = event.target.value;
    handleFilter(value);
    setKeyword(value);
    // event.target.focus();
  };
  React.useEffect(() => {
    // searchRef.current.value = value;
    searchRef.current.focus();
    // console.log("a");
  });
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    position: "static",
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const classes=useStyles();

  return (
    <React.Fragment>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <Typography>Ecommerce</Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={handleFilterAction}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={keyword}
              inputRef={searchRef}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
