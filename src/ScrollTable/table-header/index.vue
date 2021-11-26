<template>
  <div class="scroll-table-header-wrapper">
    <table class="scroll-table-header">
      <colgroup>
        <col
          v-for="column in store"
          :key="column.id"
          :width="column.width"
        >
      </colgroup>
      <thead>
        <tr class="tr">
          <th
            v-for="(column, index) in store"
            :key="column.id"
            colspan="1"
            rowspan="1"
            class="th"
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
    </table>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { StoreItem } from '../../types';
import VNodes from '../../VNodes/index';

export default defineComponent({
  name: 'ScrollTableHeader',
  components: {
    VNodes
  },
  props: {
    store: {
      type: Array as PropType<StoreItem[]>,
      default: () => []
    }
  }
});
</script>

<style lang="scss">
.scroll-table-header-wrapper {
  color: #909399;
  .scroll-table-header {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border-left: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
    background-color: #fff;
    .tr {
      .th {
        text-align: center;
        border-bottom: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
        font-weight: 400;
        padding: 12px 0;
        .cell {
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
