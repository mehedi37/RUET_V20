import Link from 'next/link';

export default function NavItem({ href, children }) {
  return (
    <Link className="hover:underline" href={href}>
      {children}
    </Link>
  );
}
