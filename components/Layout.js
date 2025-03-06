import Head from "next/head";
import Footer from "./Footer";
import MainNav from "./MainNav";

const Layout = ({ pageName, children }) => {
  return (
    <>
      <Head>
        <title>{`${pageName} | Nate Laffan | Researcher`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Created ... to pretend." />

        <link
          rel="icon"
          type="image/png"
          href="favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="favicon/favicon.svg" />
        <link rel="shortcut icon" href="favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="favicon/site.webmanifest" />

        <link
          rel="stylesheet"
          href="https://use.typekit.net/iup0poy.css"
        ></link>
      </Head>

      <main className={`Layout ${pageName}`}>
        <div className="Layout__Content">{children}</div>
        <div className="Layout__Nav">
          <MainNav />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
