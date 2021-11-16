import { ref, Ref } from 'vue';
import { StoreItem, AddStoreItem, RemoveStoreItem, UpdateStoreItem } from '../types';

type UseStoreReturn = {
  store: Ref<StoreItem[]>,
  addStoreItem: AddStoreItem,
  removeStoreItem: RemoveStoreItem,
  updateStoreItem: UpdateStoreItem,
}

export default function useStore(): UseStoreReturn {
  const store = ref<StoreItem []>([]);

  const addStoreItem = (item: StoreItem) => {
    store.value.push(item);
  };

  const removeStoreItem = (id: string) => {
    const index = store.value.findIndex(item => item.id === id);
    if (index !== -1) {
      store.value.splice(index, 1);
    }
  };

  const updateStoreItem = (id: string, newItem: StoreItem) => {
    const index = store.value.findIndex(item => item.id === id);
    if (index !== -1) {
      store.value.splice(index, 1, newItem);
    } else {
      store.value.push(newItem);
    }
  };

  return {
    store,
    addStoreItem,
    removeStoreItem,
    updateStoreItem
  };
}
