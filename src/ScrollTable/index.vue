<template>
  <table class="scroll-table">
    <div class="hidden-columns">
      <slot />
    </div>
    <thead class="scroll-table-header">
      <tr>
        <th
          v-for="column in store"
          :key="column.id"
          colspan="1"
          rowspan="1"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody class="scroll-table-body">
      <tr
        v-for="(item, index) in data"
        :key="index"
      >
        <th
          v-for="column in store"
          :key="column.id"
          colspan="1"
          rowspan="1"
        >
          {{ item[column.prop] }}
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script lang='ts'>
import { defineComponent, PropType, provide } from 'vue';
import { addStoreItemKey, removeStoreItemKey, updateStoreItemKey } from '../symbols';
import { DefaultRow } from '../types';
import useStore from './useStore';

export default defineComponent({
  name: 'ScrollTable',
  props: {
    /**
     * 表格数据
     */
    data: {
      type: Array as PropType<DefaultRow[]>,
      default: () => []
    }
  },
  setup() {
    const { store, addStoreItem, removeStoreItem, updateStoreItem } = useStore();

    provide(addStoreItemKey, addStoreItem);
    provide(removeStoreItemKey, removeStoreItem);
    provide(updateStoreItemKey, updateStoreItem);

    return {
      store
    };
  },
});
</script>

<style scoped lang="scss">
.scroll-table {
  .hidden-columns {
    visibility: hidden;
    position: absolute;
    z-index: -1;
  }
}
</style>
