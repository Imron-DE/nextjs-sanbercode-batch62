import Link from "next/link";

const Header = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Header</div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/profile" className="text-white hover:text-gray-200">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
