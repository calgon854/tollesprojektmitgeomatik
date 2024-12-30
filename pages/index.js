import React from "react";
import Link from "next/link";
import { Container, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Halle es ist hier so schön warm
      </Typography>
      <Typography variant="body1" gutterBottom>
        Dies ist eine simple Internetseite für Pätzi, hallo Pätzi!
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
