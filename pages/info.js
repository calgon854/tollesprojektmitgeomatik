// export default function Info() {
//   return (
//     <>
//       <h1>Hallo - INFOOO</h1>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";

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
      </div>
    </>
  );
}
