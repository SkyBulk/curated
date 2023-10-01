import { Container } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Head from "next/head";

import { api } from "~/utils/api";
import MarkdownRenderer from "./MarkdownRenderer";
import PayWall from "./PayWall";
import Topbar from "./Topbar";

export default function PrivateArticle() {
  const session = useSession();
  const article = api.content.getPrivateArticle.useQuery();

  return (
    <>
      <Head>
        <title>{article.data?.metaTitle}</title>
        <meta name="description" content={article.data?.metaDescription} />
        <link
          rel="icon"
          href="/favicon.svg"
          type="image/svg+xml"
          sizes="32x32"
        />
      </Head>
      <Topbar />
      <Container maxW="2xl" pt={16} pb={16}>
        <MarkdownRenderer>{article.data?.content ?? ""}</MarkdownRenderer>
        {!session.data?.user.isActive && <PayWall />}
      </Container>
    </>
  );
}
