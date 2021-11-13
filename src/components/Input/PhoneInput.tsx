import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import InputMask from "react-input-mask";
import {
  FormControl,
  FormErrorMessage,
  Icon,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Tooltip,
} from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';

interface PhoneProps extends ChakraInputProps {
  name: string;
  error?: FieldError;
}

const PhoneInputBase: ForwardRefRenderFunction<HTMLInputElement, PhoneProps> = (
  { name, error = null,...rest },
  ref
) => {
  return (
    <FormControl
      display="flex"
      flexDirection="row"
      alignItems="center"
      isInvalid={!!error}
    >
      <ChakraInput
        as={InputMask}
        mask="(99) 99999-9999"
        aria-label={name}
        name={name}
        ref={ref}
        borderColor="gray.500"
        color="gray.50"
        _placeholder={{
          color: 'gray.200',
        }}
        _hover={{
          borderColor: 'gray.200',
        }}
        size="lg"
        {...rest}
      />

      {!!error && (
        <Tooltip label={error.message} bg="red.500">
          <FormErrorMessage ml={-6} mt={0} zIndex="tooltip">
            <Icon as={FiAlertCircle} color="red.500" w={4} h={4} />
          </FormErrorMessage>
        </Tooltip>
      )}
    </FormControl>
  );
};

export const PhoneInput = forwardRef(PhoneInputBase);
