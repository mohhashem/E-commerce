import * as React from "react";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";

import Typography from "@mui/material/Typography";
import { useState } from "react";

const Header = () => {
  const [value, setValue] = useState();

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Typography>Ecommerce</Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
