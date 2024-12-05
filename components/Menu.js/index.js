import Link from "next/link";

const Menu = () => {
  return (
    <div>
      <Link href="/Home" legacyBehavior>
        <a>Home</a>
      </Link>
      <br />
      <Link href="/Profile" legacyBehavior>
        <a>Profile</a>
      </Link>
    </div>
  );
};

export default Menu;
