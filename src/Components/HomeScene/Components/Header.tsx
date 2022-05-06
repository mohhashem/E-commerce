import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Context } from "../../../Context/UserContext";

export interface IProps {
  handleFilter?: any;
}

const Header = (props: IProps) => {
  const { search } = React.useContext(Context);
  const { handleFilter } = props;
  const [keyword, setKeyword] = useState("");
  const searchRef = React.useRef<any>();
  var value: string = "";
  const handleFilterAction = (event: any) => {
    value = event.target.value;
    handleFilter(value);
    setKeyword(value);
  };

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  });
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 10,
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

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Typography>Ecommerce</Typography>

          {search && (
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
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
