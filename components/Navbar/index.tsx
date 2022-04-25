import {
  Avatar,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import React from "react";
import CustomAppBar from "./CustomAppBar";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}
function HideOnScroll({ children, window }: Props) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <>
        {children}
      </>
    </Slide>
  );
}

const Navbar = () => {
  return (
    <div>
      {/* <HideOnScroll> */}
        <CustomAppBar>
          <Toolbar>
            <Avatar alt="Brillamont" src="https://avatars.dicebear.com/api/initials/B.svg" sx={{marginRight: '10px'}}/>
            <Typography variant="h6" component="div">
              Colegio Brillamont
            </Typography>
          </Toolbar>
        </CustomAppBar>
      {/* </HideOnScroll> */}
    </div>
  );
};

export default Navbar;
