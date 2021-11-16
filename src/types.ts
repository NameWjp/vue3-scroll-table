export type DefaultRow = {
  [propName: string]: any;
};

export type StoreItem = {
  id: string,
  prop: string,
  label?: string,
}

export type AddStoreItem = (item: StoreItem) => void;

export type RemoveStoreItem = (id: string) => void;

export type UpdateStoreItem = (id: string, newItem: StoreItem) => void;
