import Link from "next/link";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useQueries } from "@/hooks/useQueries";
import { useMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

const Header = () => {
  const userData = useContext(UserContext);
  const router = useRouter();
  const { Mutate } = useMutation();

  const HandleLogout = async () => {
    const response = await Mutate({
      url: "https://service.pace-unv.cloud/api/logout",
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (!response?.success) {
      console.log("Failed to logout:");
    } else {
      Cookies.remove("user_token");
      router.push("/login");
    }
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">MyApp</div>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/profile" className="text-white hover:text-gray-300">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/users" className="text-white hover:text-gray-300">
              Users
            </Link>
          </li>
          <li>
            <Link href="/notes" className="text-white hover:text-gray-300">
              Notes
            </Link>
          </li>
          <li>
            <Link href="/posts" className="text-white hover:text-gray-300">
              Posts
            </Link>
          </li>
          <li>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} className="bg-blue-500 text-white">
                {/* Tampilkan nama pengguna jika ada */}
                {userData?.name || "Loading..."}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={HandleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
