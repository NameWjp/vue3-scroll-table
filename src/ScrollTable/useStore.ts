import { ref, Ref } from 'vue';
import { StoreItem, RemoveStoreItem, UpdateStoreItem } from '../types';

type UseStoreReturn = {
  store: Ref<StoreItem[]>,
  removeStoreItem: RemoveStoreItem,
  updateStoreItem: UpdateStoreItem,
}

export default function useStore(): UseStoreReturn {
  const store = ref<StoreItem []>([]);

  const removeStoreItem = (id: string) => {
    const index = store.value.findIndex(item => item.id === id);
    if (index !== -1) {
      store.value.splice(index, 1);
    }
  };

  const updateStoreItem = (newItem: StoreItem) => {
    const index = store.value.findIndex(item => item.id === newItem.id);
    if (index !== -1) {
      store.value.splice(index, 1, newItem);
    } else {
      store.value.push(newItem);
    }
  };

  return {
    store,
    removeStoreItem,
    updateStoreItem
  };
}
