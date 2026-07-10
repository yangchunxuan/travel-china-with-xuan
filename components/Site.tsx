import Link from "next/link";

export function Brand() {
  return (
    <span className="brandrow">
      <span className="pin" />
      <span>Travel China with Xuan</span>
    </span>
  );
}

export function SiteHeader({ nav = true }: { nav?: boolean }) {
  return (
    <header className="site">
      <div className="wrap">
        <Link href="/" className="homelink">
          <Brand />
        </Link>
        {nav ? (
          <nav>
            <Link href="/#trips">Sample trips</Link>
            <Link href="/#about">About</Link>
            <Link href="/china-visa-free-uk-canada/">Visa-free 2026</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        ) : (
          <nav>
            <Link href="/">← Back to home</Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site">
      <div className="wrap">
        <Brand />
        <div>
          Private, fully-handled China trips · Zhangjiajie-born, personally
          planned · <Link href="/china-visa-free-uk-canada/">China visa-free guide 2026</Link>
        </div>
        <div style={{ marginTop: 6 }}>
          Visa and entry policies change — always confirm current rules with
          your airline or embassy before travel.
        </div>
      </div>
    </footer>
  );
}
