import { Box, Button, HStack, Input as ChakraInput } from "@chakra-ui/react";
import { Console } from "console";
import { useEffect, useState } from "react";
import { FieldValues, FormState, useForm, UseFormRegister } from "react-hook-form";
import EmergencyContact from "../../interfaces/EmergencyContacts/EmergencyContact";
import { Input } from "../Form/Input";

interface EmergencyContactsProps {
    register: UseFormRegister<FieldValues>;
    formState: FormState<FieldValues>;
    data?: EmergencyContact[];
    userId?: string;
}

export function EmergencyContacts({ register, formState, data, userId }: EmergencyContactsProps) {
    const [contacts, setContacts] = useState<EmergencyContact[]>([]);

    useEffect(() => {
        setContacts(data);
    }, [data]);

    function handleAddContact() {
        const newContact: EmergencyContact = {
            name: "",
            phone: "",
            id: "",
            userId: ""
        };
        setContacts([...contacts, newContact])
    }

    return (
        <Box w="100%">
            <Button mb={4} onClick={handleAddContact}>Adicionar</Button>
            {contacts.map((contact, index) => (
                <HStack key={index} w="100%" spacing={4} mb={4}>
                    <Input
                        placeholder="1.88"
                        label="Nome"
                        type="text"
                        w="100%"
                        defaultValue={contact.name}
                        {...register(`emergencyContacts[${index}].name`)}
                    />
                    <Input
                        placeholder="1.88"
                        label="Phone"
                        type="text"
                        w="100%"
                        defaultValue={contact.phone}
                        {...register(`emergencyContacts[${index}].phone`)}
                    />
                    {userId && (
                        <ChakraInput
                            type="hidden"
                            value={userId}
                            {...register(`emergencyContacts[${index}].userId`)}
                        />
                    )}
                </HStack>
            ))}

        </Box>
    );
}