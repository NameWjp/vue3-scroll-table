<template>
  <table class="scroll-table">
    <div class="hidden-columns">
      <slot />
    </div>
    <thead class="scroll-table-header">
      <tr class="tr">
        <th
          v-for="(column, index) in store"
          :key="column.id"
          colspan="1"
          rowspan="1"
          class="td"
        >
          <div class="cell">
            <v-nodes
              v-if="column.renderHeader"
              :vnodes="column.renderHeader({ column, $index: index })"
            />
            <template v-else>
              {{ column.label }}
            </template>
          </div>
        </th>
      </tr>
    </thead>
    <tbody class="scroll-table-body">
      <tr
        v-for="(item, index) in data"
        :key="index"
        class="tr"
      >
        <th
          v-for="column in store"
          :key="column.id"
          colspan="1"
          rowspan="1"
          class="td"
        >
          <div class="cell">
            <v-nodes
              v-if="column.renderCell"
              :vnodes="column.renderCell({ row: item, column, $index: index })"
            />
            <template v-else>
              {{ item[column.prop] }}
            </template>
          </div>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script lang='ts'>
import { defineComponent, PropType, provide } from 'vue';
import { removeStoreItemKey, updateStoreItemKey } from '../symbols';
import { DefaultRow } from '../types';
import useStore from './useStore';
import VNodes from '../VNodes/index';

export default defineComponent({
  name: 'ScrollTable',
  components: {
    VNodes
  },
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
    const { store, removeStoreItem, updateStoreItem } = useStore();

    provide(removeStoreItemKey, removeStoreItem);
    provide(updateStoreItemKey, updateStoreItem);

    return {
      store
    };
  },
});
</script>

<style lang="scss">
.scroll-table {
  width: 100%;
  font-size: 14px;
  background-color: #fff;
  border-collapse: collapse;
  border-left: 1px solid #ebeef5;
  border-top: 1px solid #ebeef5;
  .hidden-columns {
    visibility: hidden;
    position: absolute;
    z-index: -1;
  }
  .scroll-table-header {
    color: #909399;
  }
  .scroll-table-body {
    color: #606266;
    .tr:hover {
      background-color: #f5f7fa;
    }
  }
  .td {
    text-align: center;
    border-bottom: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    font-weight: 400;
    padding: 12px 0;
  }
  .cell {
    padding: 0 10px;
  }
}
</style>
