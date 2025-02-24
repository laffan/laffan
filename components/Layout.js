import Head from "next/head";
import Footer from "./Footer";
import MainNav from "./MainNav";

const Layout = ({ pageName, children }) => {
  return (
    <div className={`Layout ${pageName} no-js no-webp`}>
      <Head>
        <title>{`${pageName} | Nate Laffan`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Created ... to pretend." />

        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-16x16.png"
          sizes="16x16"
        />

        <link
          rel="stylesheet"
          href="https://use.typekit.net/iup0poy.css"
        ></link>
      </Head>
      <main className="Layout">
        <div className="Layout__Content">{children}</div>
        <div className="Layout__Nav">
          <MainNav />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
