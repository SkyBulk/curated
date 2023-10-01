import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import type { CSSProperties } from "react";

import { theme } from "../theme";

type Props = {
  name: string;
  actionLink: string;
};

export default function WelcomeEmail({
  name = "John Doe",
  actionLink = "",
}: Props) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="DM Mono"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/dmmono/v14/aFTU7PB1QTsUX8KYthqQBK6PYK0.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Preview>Welcome to curated.</Preview>
      </Head>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading as="h2" style={styles.brand} mb="40">
            curated.
          </Heading>
          <Heading as="h1" style={styles.heading}>
            👋 Hi {name},
          </Heading>
          <Text style={styles.text}>
            Welcome to curated, the platform to become the most interesting
            person in te room.
          </Text>
          <Button pX={12} pY={12} href={actionLink} style={styles.button}>
            Get started
          </Button>
          <Hr style={{ marginTop: 32, marginBottom: 32 }} />
          <Text style={styles.text}>Curated. Inc, Street 123</Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, CSSProperties> = {
  body: {
    backgroundColor: theme.colors?.gray[50],
  },
  container: {
    backgroundColor: theme.colors?.white,
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  brand: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  heading: {
    letterSpacing: "-1px",
  },
  text: {
    color: theme.colors?.gray[500],
  },
  button: {
    backgroundColor: theme.colors?.orange[500],
    color: theme.colors?.white,
    fontWeight: "bold",
    fontSize: "16px",
    textDecoration: "none",
    borderRadius: "3px",
    minWidth: "120px",
    textAlign: "center",
  },
};
