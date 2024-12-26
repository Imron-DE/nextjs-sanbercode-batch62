import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children, ...props }) {
  const { data: userData } = useQueries({
    prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  return (
    <UserContext.Provider value={userData?.data || null} {...props}>
      {children}
    </UserContext.Provider>
  );
}
