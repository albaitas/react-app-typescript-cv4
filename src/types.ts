export interface IItem {
  id: number;
  title: string;
}
export interface IAlert {
  show: boolean;
  typ: string;
  msg: string;
}
export type RemoveItem = (id: number) => void;
export type EditItem = (item: IItem) => void;
export type ShowAlert = (show: boolean, typ: string, msg: string) => void;
