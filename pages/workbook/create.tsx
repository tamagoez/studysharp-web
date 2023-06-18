import { Button, Container, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { createWorkbook } from "../../scripts/workbook/book";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

export default function WorkbookCreate() {
  const router = useRouter();
  const [workbookName, setWorkbookName] = useState("");
  const [workbookSubtitle, setWorkbookSubtitle] = useState("");

  async function createWorkbookButton() {
    const returnid = await createWorkbook(workbookName, workbookSubtitle);
    router.replace(`/workbook/${returnid}/edit`);
  }
  return (
    <Layout titleprop="ワークブックを作成">
      <Container centerContent width="0.7">
        <Text>ワークブック名</Text>
        <Input onChange={(e) => setWorkbookName(e.target.value)}></Input>
        <Text>サブタイトル</Text>
        <Input onChange={(e) => setWorkbookSubtitle(e.target.value)}></Input>
        <Button
          disabled={!workbookName || !workbookSubtitle}
          onClick={() => createWorkbookButton()}
        >
          作成する
        </Button>
        <p>作成後、自動的に編集ページに移動します</p>
      </Container>
    </Layout>
  );
}
