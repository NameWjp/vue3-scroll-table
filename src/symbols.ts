import { UpdateStoreItem, RemoveStoreItem } from './types';
import { InjectionKey } from 'vue';

export const updateStoreItemKey: InjectionKey<UpdateStoreItem> = Symbol();

export const removeStoreItemKey: InjectionKey<RemoveStoreItem> = Symbol();
