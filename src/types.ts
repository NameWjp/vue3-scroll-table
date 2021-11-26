import { Slot } from 'vue';

export type DefaultRow = {
  [propName: string]: any;
};

export type StoreItem = {
  id: string,
  prop: string,
  label?: string,
  width?: string | number,
  renderHeader?: Slot,
  renderCell?: Slot,
}

export type RemoveStoreItem = (id: string) => void;

export type UpdateStoreItem = (newItem: StoreItem) => void;

export enum AnimationEnum {
  Stop,
  Run,
  Await
}
