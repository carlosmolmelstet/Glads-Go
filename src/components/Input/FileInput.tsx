import {
  Box,
  FormLabel,
  CircularProgress,
  CircularProgressLabel,
  Icon,
  Image,
  Text,
  FormControl,
  FormErrorMessage,
  Flex,
  useToast,
  Tooltip,
} from '@chakra-ui/react';
import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';
import {
  useState,
  SetStateAction,
  Dispatch,
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect,
} from 'react';
import {
  FieldError,
  FieldValues,
  UseFormSetError,
  UseFormTrigger,
} from 'react-hook-form';
import { FiAlertCircle, FiCamera } from 'react-icons/fi';
import { api } from '../../services/api';

export interface FileInputProps {
  name: string;
  error?: FieldError;
  setImageUrl: Dispatch<SetStateAction<string>>;
  localImageUrl: string;
  setLocalImageUrl: Dispatch<SetStateAction<string>>;
  setError: UseFormSetError<FieldValues>;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<boolean | void>;
  trigger: UseFormTrigger<FieldValues>;
}

const FileInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  FileInputProps
> = (
  {
    name,
    error = null,
    setImageUrl,
    localImageUrl,
    setLocalImageUrl,
    setError,
    onChange,
    trigger,
    ...rest
  },
  ref
) => {
    const toast = useToast();
    const [progress, setProgress] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const [cancelToken, setCancelToken] = useState<CancelTokenSource>(
      {} as CancelTokenSource
    );

    const handleImageUpload = useCallback(
      async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (!event.target.files?.length) {
          return;
        }

        setImageUrl('');
        setLocalImageUrl('');
        setError('image', null);
        setIsSending(true);

        await onChange(event);
        trigger('image');

        const formData = new FormData();

        formData.append(event.target.name, event.target.files[0]);
        formData.append('key', process.env.NEXT_PUBLIC_IMGBB_API_KEY);

        const { CancelToken } = axios;
        const source = CancelToken.source();
        setCancelToken(source);

        const config = {
          headers: { 'content-type': 'multipart/form-data' },
          onUploadProgress: (e: ProgressEvent) => {
            setProgress(Math.round((e.loaded * 100) / e.total));
          },
          cancelToken: source.token,
        } as AxiosRequestConfig;

        try {
          const response = await axios.post(
            'https://api.imgbb.com/1/upload',
            formData,
            config
          );

          setImageUrl(response.data.data.url);
          setLocalImageUrl(URL.createObjectURL(event.target.files[0]));
        } catch (err) {
          if (err?.message === 'Cancelled image upload.') return;

          toast({
            title: 'Falha no envio',
            description: 'Ocorreu um erro ao realizar o upload da sua imagem.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setIsSending(false);
          setProgress(0);
        }
      },
      [onChange, setError, setImageUrl, setLocalImageUrl, trigger, toast]
    );

    useEffect(() => {
      if (error?.message && isSending && cancelToken?.cancel) {
        cancelToken.cancel('Cancelled image upload.');
        setCancelToken(null);
      }
    }, [cancelToken, error, isSending]);

    return (
      <FormControl isInvalid={!!error} w={20} h={20}>
        <FormLabel
          htmlFor={name}
          cursor={isSending ? 'progress' : 'pointer'}
          opacity={isSending ? 0.5 : 1}
        >
          {localImageUrl && !isSending ? (
            <Image
              src={localImageUrl}
              alt="Uploaded photo"
              borderRadius="md"
              objectFit="cover"
            />
          ) : (
            <Flex
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              borderRadius="md"
              w={20}
              h={20}
              bgColor="gray.600"
              color="gray.300"
              borderWidth={error?.message && 2}
              borderColor={error?.message && 'red.500'}
              cursor="pointer"
            >
              {isSending ? (
                <>
                  <CircularProgress
                    trackColor="pGray.200"
                    value={progress}
                    color="orange.500"
                  >
                    <CircularProgressLabel>{progress}%</CircularProgressLabel>
                  </CircularProgress>
                  <Text as="span" pt={2} textAlign="center">
                    Enviando...
                  </Text>
                </>
              ) : (
                <Box pos="relative" h="full">
                  {!!error && (
                    <Tooltip label={error.message} bg="red.500">
                      <FormErrorMessage
                        pos="absolute"
                        right={2}
                        top={2}
                        mt={0}
                        zIndex="tooltip"
                      >
                        <Icon as={FiAlertCircle} color="red.500" w={2} h={2} />
                      </FormErrorMessage>
                    </Tooltip>
                  )}

                  <Flex
                    h="full"
                    alignItems="center"
                    justifyContent="center"
                    flexDir="column"
                  >
                    <Icon
                      as={FiCamera} w={8} h={8} />
                  </Flex>
                </Box>
              )}
            </Flex>
          )}
          <input
            data-testid={name}
            disabled={isSending}
            id={name}
            name={name}
            onChange={handleImageUpload}
            ref={ref}
            type="file"
            style={{
              display: 'none',
            }}
            {...rest}
          />
        </FormLabel>
      </FormControl>
    );
  };

export const FileInput = forwardRef(FileInputBase);
