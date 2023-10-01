import { Heading, Text } from "@chakra-ui/react";
import Markdown from "react-markdown";

export default function MarkdownRenderer({ children }: { children: string }) {
  return (
    <Markdown
      components={{
        h1: ({ children }) => {
          return (
            <Heading mb={8} as="h1">
              {children}
            </Heading>
          );
        },
        h2: ({ children }) => {
          return (
            <Heading size="md" pt={6} pb={4} as="h2">
              {children}
            </Heading>
          );
        },
        p: ({ children }) => {
          return (
            <Text lineHeight="tall" color="GrayText" mb={4}>
              {children}
            </Text>
          );
        },
      }}
    >
      {children}
    </Markdown>
  );
}
