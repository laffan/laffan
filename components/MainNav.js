import { useRouter } from 'next/router'
import Link from "next/link";

const NavItems = ({ exclude }) => {
  const router = useRouter()

  const links = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Projects',
      href: '/projects',
    },
    {
      name: 'Contact',
      href: '/contact',
    },
  ]

  return (
    <nav className="MainNav">
      <ul>
        {links.map(
          (l, i) =>
            l.href !== exclude && (
              <li key={`link-${i}`}>
                <Link
                  className={`NavItems__Link ${
                    l.href === router.route ? 'active' : ''
                  }`}
                  href={l.href}
                >
                  {l.name}
                </Link>
              </li>
            ),
        )}
      </ul>
    </nav>
  )
}

export default NavItems
