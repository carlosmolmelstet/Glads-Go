import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
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
    <Modal isOpen={isOpen} onClose={handleCloseModal} scrollBehavior='inside' isCentered size="6xl">
      <ModalOverlay />
      <ModalContent bgColor={useColorModeValue("gray.50", "gray.800")} >
        <ModalCloseButton />
        <ModalBody >
          <FormAddUser closeModal={handleCloseModal} userId={userId != "" ? userId : undefined} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
