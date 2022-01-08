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
  type: "text" | "phone" | "password" | "date" | "hidden";
}

const BaseInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, label = "", type, ...rest },
  ref
) => {
  if (type == "phone") {
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
          as={InputMask}
          mask="(99) 99999-9999"
          aria-label={name}
          name={name}
          ref={ref}
          size="md"
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
  } else if (type == "text") {
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
  } else if (type == "password") {
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
          type="password"
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
  }
  else if (type == "date") {
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
          type="date"
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
  } else if (type == "hidden") {
    return (
        <input
          type="hidden"
          ref={ref}
        />
    );
  }
};

export const Input = forwardRef(BaseInput);
