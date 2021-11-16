import { AddStoreItem, UpdateStoreItem, RemoveStoreItem } from './types';
import { InjectionKey } from 'vue';

export const addStoreItemKey: InjectionKey<AddStoreItem> = Symbol();

export const updateStoreItemKey: InjectionKey<UpdateStoreItem> = Symbol();

export const removeStoreItemKey: InjectionKey<RemoveStoreItem> = Symbol();
