import type { AppProps } from "next/app";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import theme from "../theme";
import Layout from "../components/Layout";
import "@fontsource/josefin-sans";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useMetaMask from "../utils/hooks/useMetaMask";
import useWeb3 from "../utils/hooks/useWeb3";
import useWeb3Store from "../utils/web3store";
import useUserStore from "../utils/store";
import shallow from "zustand/shallow";

function MyApp({ Component, pageProps }: AppProps) {
  useMetaMask();
  useWeb3();

  const router = useRouter();
  const [isDashboard, setIsDashboard] = useState<boolean>(false);
  const [isConnected, connectedAccount, contract] = useWeb3Store(
    (state) => [state.connectedAccount, state.connectedAccount, state.contract],
    shallow
  );
  const [userType, setUserType, setPermissionMismatch] = useUserStore(
    (state) => [state.userType, state.setUserType, state.setPermissionMismatch],
    shallow
  );
  useEffect(() => {
    if (router.pathname !== "/" && router.pathname !== "/error")
      setIsDashboard(true);
    else setIsDashboard(false);
  }, [router.pathname]);
  useEffect(() => {
    if (!isConnected && router.pathname !== "/error") router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

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
  const toast = useToast();
  const checkUserType = async () => {
    if (isConnected && userType !== undefined && contract) {
      console.log("Checking user type", userType);
      const isUserType = await checkFunctions(userType)(connectedAccount);
      console.log({ isUserType });
      if (!isUserType) {
        // set permission mismatch to true
        setPermissionMismatch(true);

        // route user to the 403 error route
        router.push("/error?code=403");
        toast({
          title: `not user of type ${userType}`,
          description: "redirecting you to the error page",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
    if (!connectedAccount) {
      setPermissionMismatch(false);
      setUserType(undefined);
    }
    checkUserType();
  }, [userType, connectedAccount]);
  return (
    <ChakraProvider theme={theme}>
      {!isDashboard ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
