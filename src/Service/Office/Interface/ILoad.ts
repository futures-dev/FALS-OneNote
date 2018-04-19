export interface ILoad<T> {
  load(option?: string | string[] | OfficeExtension.LoadOption): T;
}
