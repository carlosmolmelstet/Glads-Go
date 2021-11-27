import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import InputMask from "react-input-mask";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Tooltip,
} from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';

interface InputProps extends ChakraInputProps {
  name: string;
  error?: FieldError;
  label?: string;
}

const TextInputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, label = "", ...rest },
  ref
) => {
  return (
    <FormControl
      display="flex"
      flexDirection="column"
      alignItems="start"
      isInvalid={!!error}
    >
      <FormLabel ms="4px" fontWeight="normal">
        {label}
      </FormLabel>
      <ChakraInput
        aria-label={name}
        name={name}
        ref={ref}
        borderRadius="4px"
        {...rest}
      />
      {!!error && (
        <Tooltip label={error.message} bg="red.500">
          <FormErrorMessage ml="auto" mr={2} mt={-7} zIndex="tooltip">
            <Icon as={FiAlertCircle} color="red.500" w={4} h={4} />
          </FormErrorMessage>
        </Tooltip>
      )}
    </FormControl>
  );
};

export const TextInput = forwardRef(TextInputBase);
