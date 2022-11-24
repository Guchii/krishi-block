import {
  Button,
  ButtonProps,
  Grid,
  Heading,
  HStack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserModal, AdminModal } from "../components/Home";
import useUserStore from "../utils/store";
import useWeb3Store from "../utils/web3store";
import shallow from "zustand/shallow";

const props: ButtonProps = {
  width: "100px",
  colorScheme: "yellow",
  rounded: "xl",
};

const Home: NextPage = () => {
  const contract = useWeb3Store((state) => state.contract);
  const [sdmHai, setSDMHai] = useState(false);
  const [isConnected, connectedAccount] = useWeb3Store(
    (state) => [state.isConnected, state.connectedAccount],
    shallow
  );
  const router = useRouter();
  const isSDM = async () => {
    if (contract && connectedAccount) {
      const isSDM = await contract.isSDM(connectedAccount);
      setSDMHai(isSDM);
    }
  };

  const checkFunctions = (inp: "1" | "2" | "3" | "4") => {
    switch (inp) {
      case "3":
        return contract?.isSDM;
      case "2":
        return contract?.isTehsildar;
      case "1":
        return contract?.isLekhpal;
    }
  };

  const {
    isOpen: adminIsOpen,
    onOpen: adminOnOpen,
    onClose: adminOnClose,
  } = useDisclosure();
  const {
    isOpen: userIsOpen,
    onOpen: userOnOpen,
    onClose: userOnClose,
  } = useDisclosure();
  const userType = useUserStore((state) => state.userType);
  const setUserType = useUserStore((state) => state.setUserType);
  const toast = useToast();
  const checkUserType = async () => {
    if (isConnected && userType !== undefined && contract) {
      console.log("Checking user type", userType);
      const isUserType = await checkFunctions(userType)(connectedAccount);
      console.log({ isUserType });
      if (!isUserType) {
        // set permission mismatch to true
        // route user to the 403 error route
        toast({
          title: `not user of type ${userType}`,
          description: "redirecting you to the error page",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        router.push("/error?code=403")
      } else {
        toast({
          title: `user of type ${userType}, verified`,
          description: "You can move to your dashboard now",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    if (!connectedAccount) setUserType(undefined);
    checkUserType();
  }, [userType, connectedAccount]);

  return (
    <Grid
      height={"100vh"}
      placeItems="center"
      bg="gray.900"
      textColor={"white"}
    >
      <VStack gap={4}>
        <Heading
          color="yellow.300"
          display={"inline-flex"}
          alignItems="center"
          fontFamily={"body"}
          gap={"2"}
          userSelect="none"
          fontSize={"7xl"}
        >
          krishi
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={"white"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{
              width: "64px",
              height: "64px",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
            />
          </svg>
        </Heading>
        {!isConnected ? (
          <HStack>
            <Button {...props} onClick={adminOnOpen}>
              Admin
            </Button>
            <Button {...props} onClick={userOnOpen}>
              User
            </Button>
          </HStack>
        ) : (
          <Button colorScheme={"yellow"} onClick={() => router.push("/sdm")}>
            Go to your Dashboard
          </Button>
        )}
      </VStack>
      <AdminModal onClose={adminOnClose} isOpen={adminIsOpen} />
      <UserModal onClose={userOnClose} isOpen={userIsOpen} />
    </Grid>
  );
};
export default Home;
