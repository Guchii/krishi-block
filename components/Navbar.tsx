import { Box, Heading, Text, useColorMode } from "@chakra-ui/react";
import { FC } from "react";
import useUserStore from "../utils/store";
import KrishiHeading from "./Heading";

interface NavbarProps {
  currentRoute?: string;
}

const Navbar: FC<NavbarProps> = ({ currentRoute }) => {
  const userState = useUserStore(state => state)
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box h="full" w="full" display={"flex"} gap={16} alignItems="center" p={8}>
      {/* <Heading
        display={"inline-flex"}
        alignItems="center"
        fontFamily={"body"}
        gap={"2"}
        userSelect="none"
        onClick={toggleColorMode}
      >
        krishi
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={"none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          style={{
            width: "40px",
            height: "40px"
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>
      </Heading> */}
      <KrishiHeading />
      {currentRoute && <Text textTransform={"lowercase"}>{currentRoute}</Text>}
      {JSON.stringify(userState)}
    </Box>
  );
};

export default Navbar;
