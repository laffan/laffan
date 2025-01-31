import Head from "next/head";
import MainNav from "./MainNav";
import Footer from "./Footer";

const Layout = ({ pageName, children }) => {
  
  return (
    <div className={`Layout ${pageName} no-js no-webp`}>
      <Head>
        <title>{`${pageName} | Created To Pretend`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Created ... to pretend." />

        <link rel="icon" type="image/png" href="/favicon/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon/favicon-16x16.png" sizes="16x16" />
      </Head>

      <MainNav />
      <main className="Content">
        {children}
      </main>
      <Footer />

    </div>
  )
};

export default Layout;
