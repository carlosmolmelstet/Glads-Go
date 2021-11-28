import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  Tooltip,
} from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';
import SelectData from '../../interfaces/Form/SelectData';

interface SelectProps extends ChakraSelectProps {
  name: string;
  error?: FieldError;
  label?: string;
  data: Array<SelectData<any>>
}

const BaseSelect: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, error = null, label = "", data, ...rest },
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
      <ChakraSelect
        placeholder="Posição"
        aria-label={name}
        name={name}
        ref={ref}
        {...rest}
      >
        {data.map(item => (
          <option key={item.id} value={item.id}>{item.description}</option>
        ))}
      </ChakraSelect>
      {!!error && (
        <Tooltip label={error.message} bg="red.500">
          <FormErrorMessage ml="auto" mr={2} mt={-7} zIndex="tooltip">
            <Icon as={FiAlertCircle} color="red.500" w={4} h={4} />
          </FormErrorMessage>
        </Tooltip>
      )}
    </FormControl>
  )
};

export const Select = forwardRef(BaseSelect);
