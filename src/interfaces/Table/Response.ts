export default interface ResponseTable<Type> {
    total: number;
    data: Array<Type>;
}