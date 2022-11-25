import { useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import useWeb3Store from "../../utils/web3store";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const ConfirmModal: FC<{ isOpen: boolean; onClose: () => void; data: any }> = ({
  isOpen,
  onClose,
  data,
}) => {
  const toast = useToast();
  const contract = useWeb3Store((state) => state.contract);
  const mutation = useMutation(async () => {
    await sleep(2000);
    return "nice";
  });
  const confirmHandler = () => {
    mutation.mutate();
  };
  useEffect(() => {
    if (mutation.isSuccess) {
      toast({
        title: "Land Added",
        description: "Land added successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      onClose();
      console.log({ data: mutation.data });
    }
  }, [mutation.isSuccess]);
  return (
    <>
      <Modal isOpen={isOpen} colorScheme="yellow" onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Confirm Adding Land</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Add land owner with the following details
            <Text>{JSON.stringify(data, null, 8)}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant={"outline"}
              colorScheme="red"
              mr={3}
              onClick={onClose}
            >
              Go Back
            </Button>
            <Button
              colorScheme={"green"}
              onClick={confirmHandler}
              loadingText="Submitting"
              isLoading={mutation.isLoading}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};