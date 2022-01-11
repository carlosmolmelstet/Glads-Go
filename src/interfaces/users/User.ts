interface Position {
    id: string,
    name: string,
    shortName: string;
}


export default interface User {
    name: string;
    positionId: string;
    position?: Position;
    phone: string;
    email: string;
    imageUrl?: string;
    id: string;
    birthDate: string;
}