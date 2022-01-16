import EmergencyContact from "../EmergencyContacts/EmergencyContact";

interface Position {
    id: string,
    name: string,
    shortName: string;
}

export default interface User {
    name: string;
    surname: string;
    positionId: string;
    position?: Position;
    phone: string;
    email: string;
    imageUrl?: string;
    id: string;
    birthDate: string;
    points: number;
    emergencyContacts: Array<EmergencyContact>
}