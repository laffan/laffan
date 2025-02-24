import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const NavItems = ({ exclude }) => {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // changes to scrollThreshold change must be 
      // reflected in MainNav.scss to work properly.
      const scrollThreshold = 420; 
      setIsSticky(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = {
    primary: [
      { name: "Research", href: "/" },
      { name: "Media Works", href: "/projects" },
      { name: "Contact", href: "/projects" },
    ],
    secondary: [
      { name: "Tools", href: "/tools" },
      { name: "Coliphon", href: "/coliphon" },
    ],
  };

  const renderLinks = (linksList) =>
    linksList
      .filter((l) => l.href !== exclude)
      .map((l, i) => (
        <li key={`link-${i}`}>
          <Link
            className={`NavItems__Link ${
              l.href === router.route ? "active" : ""
            }`}
            href={l.href}
          >
            {l.name}
          </Link>
        </li>
      ));

  return (
    <nav className="MainNav">
      <div className={`MainNav__Sticky ${isSticky ? "scrolled" : ""}`}>
        <ul className="MainNav__Primary">{renderLinks(links.primary)}</ul>
        <ul className="MainNav__Secondary">{renderLinks(links.secondary)}</ul>
      </div>
    </nav>
  );
};

export default NavItems;