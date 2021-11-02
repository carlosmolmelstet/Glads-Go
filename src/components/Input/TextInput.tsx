import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  Icon,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Tooltip,
} from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';

interface InputProps extends ChakraInputProps {
  name: string;
  error?: FieldError;
}

const TextInputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, ...rest },
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

export const TextInput = forwardRef(TextInputBase);
