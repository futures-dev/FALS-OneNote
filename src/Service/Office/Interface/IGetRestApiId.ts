export interface IGetRestApiId {
    getRestApiId(): IValue;
    restId: string;
}

interface IValue {
    value: string;
}