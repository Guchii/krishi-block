import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import useUserStore from '../../utils/store';
import { ConnectWallet } from './ConnectWallet';

interface AdminModalProps {
  isOpen: boolean,
  onClose: () => void,
}

export const UserModal : FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const setUserType = useUserStore((state) => state.setUserType);
  useEffect(() => {
    setUserType("4");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(45deg)"
        />
        <ModalContent>
          <ModalHeader>Oh Hellow User 👋</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">Just click on the connect wallet button</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <ConnectWallet disabled={true}/>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}