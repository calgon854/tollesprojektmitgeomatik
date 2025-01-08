import React from "react";
import Link from "next/link";
import { Container, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Temba, his arms open.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Kiteo, his eyes closed. Jiri of Ubaya. Picard and Dathon at El-Adrel.
        Temba, at rest. Kiteo, his eyes closed. Zima at Anzo. Kailash, when it
        rises. Darmok and Jalad at Tanagra. The river Temarc in winter. Kailash,
        when it rises. Kailash, when it rises. Temba, at rest. Uzani, his army
        with fists open. Mirab, with sails unfurled. Lowani under two moons.
        Picard and Dathon at El-Adrel. Ubaya of crossroads, at Lungha. Shaka,
        when the walls fell. Chenza at court, the court of silence. Kailash,
        when it rises. Zima and Bakor. Darmok and Jalad on the ocean. Zinda, his
        face black, his eyes red. Children of Tama. Darmok and Jalad at Tanagra.
        Ubaya of crossroads, at Lungha. The river Temarc in winter. Temba, his
        arms open. Uzani, his army with fists closed. Kailash, when it rises.
        Rai and Jiri at Lungha. Kiazis children, their faces wet. Temba, at
        rest. Temba, at rest. Shaka, when the walls fell. Jiri of Ubaya. Chenza
        at court, the court of silence. Lungha, her sky grey. Sokath, his eyes
        uncovered. Rai and Jiri at Lungha. The beast at Tanagra.
      </Typography>
      <div>
        <Link href="/info" passHref>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "10px" }}
          >
            Go to Lungha
          </Button>
        </Link>
      </div>
    </Container>
  );
}
