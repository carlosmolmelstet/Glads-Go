import { Box, Button, Flex } from "@chakra-ui/react";
import { Console } from "console";
import { useState } from "react";
import { FieldValues, FormState, useForm, UseFormRegister } from "react-hook-form";
import { Input } from "../Form/Input";

interface EmergencyContactsProps {
    register: UseFormRegister<FieldValues>;
    formState: FormState<FieldValues>;
}



export function EmergencyContacts({ register, formState }: EmergencyContactsProps) {
    const [contacts, setContacts] = useState<number[]>([]);

    function handleAddContact() {
        setContacts([...contacts, contacts.length])
    }

    return (
        <Box>
            <Button onClick={handleAddContact}>Adicionar</Button>
            {contacts.map((contact, index) => (
                <Flex key={index}>
                    <Input
                        placeholder="1.88"
                        label="Nome"
                        type="text"
                        w="50%"
                        {...register(`emergencyContacts[${index}].name`)}
                    />
                    <Input
                        placeholder="1.88"
                        label="Phone"
                        type="text"
                        w="50%"
                        {...register(`emergencyContacts[${index}].phone`)}
                    />
                </Flex>
            ))}

        </Box>
    );
}