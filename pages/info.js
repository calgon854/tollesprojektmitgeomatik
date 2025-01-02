// export default function Info() {
//   return (
//     <>
//       <h1>Hallo - INFOOO</h1>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import dynamic from "next/dynamic";

const MapRender = dynamic(() => import("../components/maps/QuakeMap.jsx"), {
  ssr: false,
});

export default function Index() {
  const [activeTab, setActiveTab] = useState("Tab1");

  return (
    <>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={() => setActiveTab("Tab1")}>
              Tab 1
            </Button>
            <Button color="inherit" onClick={() => setActiveTab("Tab2")}>
              Tab 2
            </Button>
          </Toolbar>
        </AppBar>
        {activeTab === "Tab1" && (
          <>
            <h1>Tab 1</h1>
          </>
        )}
        {activeTab === "Tab2" && (
          <>
            <h1>Tab 2</h1>
          </>
        )}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar elevation={0} position="static" sx={{ bgcolor: "#000000" }}>
            <Toolbar variant="regular">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" component="div">
                USGS Earthquakes
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <MapRender />
      </div>
    </>
  );
}
