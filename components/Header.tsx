import Link from 'next/link';

export type NavLink = {
  aria: string;
  text: string;
  href: string;
  testId: string;
};

export const links: NavLink[] = [
  {
    aria: `Return home`,
    text: `Home`,
    href: `/`,
    testId: `home-link`,
  },
];

export default function Header(): JSX.Element {
  return (
    <header className="global-header" data-testid="global-header">
      <nav>
        <ul>
          {links.map(({ aria, text, href, testId }) => (
            <Link href={href} key={href}>
              <a aria-label={aria} data-testid={testId} title={aria}>
                {text}
              </a>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
}
