import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // 多分ちゃんとユーザーステータスを取得しているんだと思う
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  const session = await supabase.auth.getSession();
  const userid = session.data.session?.user?.id;

  // URLマッチショートカット
  const url = request.nextUrl.pathname;
  const startsWith = (url) => request.nextUrl.pathname.startsWith(url);
  const eqTo = (url) => url === request.nextUrl.pathname;

  // ログインなしで許可するURL
  // ServiceWorker等をブロックしてはいけない
  const nologin = [
    "/",
    "/auth",
    "/callback",
    "/sw.js",
    "/manifest.json",
    "/favicon.ico",
  ];
  // _nextとか/apiを制限したらあかんので...
  if (
    startsWith("/_next") ||
    startsWith("/api") ||
    startsWith("/workbox-") ||
    startsWith("icon-") ||
    startsWith("/news")
  ) {
    return res;
  }

  // リダイレクト処理
  if (eqTo("/login")) {
    return NextResponse.redirect(new URL("/auth?mode=login", request.url));
  }
  if (eqTo("/signup")) {
    return NextResponse.redirect(new URL("/auth?mode=signup", request.url));
  }
  if (nologin.indexOf(url) === -1 && !userid) {
    // Auth condition not met, redirect to home page.
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/auth";
    redirectUrl.searchParams.set("mode", "login");
    redirectUrl.searchParams.set(`moveto`, request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // プロフィールを確認する
  if (eqTo("/") && userid) {
    return NextResponse.rewrite(new URL("/dashboard", request.url));
  }
  return res;
}
