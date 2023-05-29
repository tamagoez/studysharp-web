import React, { ReactNode, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { MdMenu } from "react-icons/md";
// import { movePage } from "../scripts/action";
import { useRouter } from "next/router";
import { Divider, Menu, MenuProps, Col, Row } from "antd";
import { useUser } from "@supabase/auth-helpers-react";

// supabase
// const user = useUser();

const APP_TITLE = "StudySharp";

type Props = {
  children?: ReactNode;
  titleprop?: string;
  showfooter?: boolean;
};

// タイトルはデフォルトでStupperになる
// Layout側から指定してあげると`タイトル | Stupperという形になる`
export default function Layout({
  children,
  titleprop = APP_TITLE,
  showfooter = true,
}: Props) {
  let title = titleprop;
  if (titleprop !== APP_TITLE) title = `${title} | ${APP_TITLE}`;
  const router = useRouter();
  return (
    <div>
      <style jsx>{`
        header {
          width: 100vw;
          background: rgba(211, 233, 208, 0.4);
          position: fixed;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          height: 40px;
          width: 100vw;
          top: 0;
          z-index: 9000;
        }
        .header_title {
          text-align: center;
          font-size: 16px;
          margin: 0;
          margin-top: 6px;
        }
        main {
          min-width: 100xw;
          min-height: 100vh;
        }
      `}</style>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Row>
          <Col span={8}>
            <MenuComponent router={router} />
          </Col>
          <Col span={8}>
            <p className="header_title">{title}</p>
          </Col>
        </Row>
      </header>
      <main style={{ paddingTop: "40px" }}>{children}</main>
      {showfooter ? (
        <footer>
          <hr />
          <span>勉強をする全ての人へ by tamagoez</span>
        </footer>
      ) : undefined}
    </div>
  );
}

const menulist = [
  { title: "タスク", url: "todo", command: "⌘T" },
  { title: "時計", url: "clock", command: "⌘C" },
];

// メモ
// それぞれのUIの良さがあったため、アイコンボタンはChakra-UI、メニューはAnt Designを使う

const guestMenuItems: MenuProps["items"] = [
  {
    label: <Link href="/login">ログイン</Link>,
    key: "login",
  },
  {
    label: <Link href="/signup">新規登録</Link>,
    key: "signup",
  },
];

const loginedMenuItems: MenuProps["items"] = [
  {
    label: <Link href="/logout">ログアウト</Link>,
    key: "logout",
  },
];

const MenuComponent = ({ router }: { router: any }) => {
  // const user = useUser();
  const [current, setCurrent] = useState("");
  return (
    <Menu
      selectedKeys={[current]}
      mode="horizontal"
      items={false ? loginedMenuItems : guestMenuItems}
      style={{ background: "none", borderBottom: "none", height: "40px" }}
    />
  );
};
