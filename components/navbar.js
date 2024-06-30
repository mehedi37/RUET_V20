import NavItem from "@/components/navItems";

export default function Navbar({ accountType='student', className = '' }) {
  return (
    accountType == 'student' ?
      (<nav className={`flex md:space-x-4 ${className}`}>
        <NavItem href="/syllabus">Syllabus</NavItem>
        <NavItem href="/notices">All Notice</NavItem>
        <NavItem href="/results">Results</NavItem>
      </nav>)
      :
    ( <nav className={`flex md:space-x-4 ${className}`}>
        <NavItem href="/notice">Notice</NavItem>
        <NavItem href="/markInput">Mark Input</NavItem>
        <NavItem href="/classes">Classes</NavItem>
      </nav>)
  );
}

