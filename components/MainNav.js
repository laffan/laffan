import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const NavItems = ({ exclude }) => {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const isHomePage = router.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // changes to scrollThreshold change must be 
      // reflected in MainNav.scss to work properly.
      const scrollThreshold = isHomePage ? 420 : 0; 
      setIsSticky(window.scrollY > scrollThreshold);
      
      // Only track active sections on homepage
      if (isHomePage) {
        // Check which section is currently in view
        const sections = links.primary.concat(links.secondary)
          .map(link => link.target)
          .filter(target => target && document.getElementById(target.slice(1)));
          
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId.slice(1));
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const links = {
    primary: [
      { name: "Research", target: "#research" },
      { name: "Media Works", target: "#media-works" },
      { name: "Contact", target: "#contact" },
    ],
    secondary: [
      // { name: "Tools", target: "#tools" },
      { name: "Colophon", target: "#colophon" },
    ],
  };

  const scrollToSection = (e, target) => {
    e.preventDefault();
    
    if (!target) return;
    
    if (isHomePage) {
      // We're on the homepage, so scroll to the section
      const element = document.getElementById(target.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(target);
      }
    } else {
      // We're not on the homepage, navigate to homepage with the target as hash
      router.push(`/${target}`);
    }
  };

  const renderLinks = (linksList) =>
    linksList
      .filter((l) => l.target !== exclude)
      .map((l, i) => (
        <li key={`link-${i}`}>
          <a 
            className={`NavItems__Link ${
              l.target === activeSection ? "active" : ""
            }`}
            href={isHomePage ? l.target : `/${l.target}`}
            onClick={(e) => scrollToSection(e, l.target)}
          >
            {l.name}
          </a>
        </li>
      ));

  return (
    <nav className={`MainNav ${isHomePage ? "--isHome" : ""}`}>
      <div className={`MainNav__Sticky ${isSticky ? "scrolled" : ""}`}>
        <ul className="MainNav__Primary">{renderLinks(links.primary)}</ul>
        <ul className="MainNav__Secondary">{renderLinks(links.secondary)}</ul>
      </div>
    </nav>
  );
};

export default NavItems;