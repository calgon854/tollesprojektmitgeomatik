import React from "react";
import Link from "next/link";
import { Container, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Welcome to My Next.js App
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is a simple homepage. Use the navigation buttons below to explore.
      </Typography>
      <div>
        <Link href="/info" passHref>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "10px" }}
          >
            Go to Info Page
          </Button>
        </Link>
      </div>
    </Container>
  );
}
