import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useColorModeValue
} from '@chakra-ui/react';
import { FormAddUser } from '../Form/FormAddUser';

interface ModalAddUserProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export function ModalAddUser({
  isOpen,
  onClose,
  userId
}: ModalAddUserProps): JSX.Element {
  const handleCloseModal = (): void => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="6xl">
      <ModalOverlay />
      <ModalContent
        bgColor={useColorModeValue("gray.50", "gray.800")}
        overflow="auto"
        maxH="80vh"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: useColorModeValue("#B3B5C6", "#353646"),
            borderRadius: '24px',
          },
        }}
      >
        <ModalCloseButton />
        <ModalBody >
          <FormAddUser closeModal={handleCloseModal} userId={userId != "" ? userId : undefined} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
