<template>
  <div
    ref="tableWrap"
    class="scroll-table-body-wrapper"
    :style="{
      borderBottom: ableScroll ? '1px solid #ebeef5' : 'none',
      borderTop: !showHeader ? '1px solid #ebeef5' : 'none',
    }"
  >
    <table
      ref="table"
      class="scroll-table-body"
      @mouseenter="handleHover"
      @mouseleave="handleLeave"
    >
      <colgroup>
        <col
          v-for="column in store"
          :key="column.id"
          :width="column.width"
        >
      </colgroup>
      <tbody>
        <tr
          v-for="(item, index) in tableData"
          :key="index"
          class="tr"
          :style="{ cursor: hoverStop ? 'pointer' : 'auto' }"
        >
          <td
            v-for="column in store"
            :key="column.id"
            colspan="1"
            rowspan="1"
            class="td"
            @click="handleClick(item, column, $event)"
          >
            <div class="cell">
              <v-nodes
                v-if="column.renderCell"
                :vnodes="column.renderCell({ row: item, column, $index: getItemIndex(item) })"
              />
              <template v-else>
                {{ item[column.prop] }}
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRefs, ref } from 'vue';
import { StoreItem, DefaultRow } from '../../types';
import VNodes from '../../VNodes/index';
import useScroll from './useScroll';

export default defineComponent({
  name: 'ScrollTableBody',
  components: {
    VNodes
  },
  props: {
    /**
     * 列数据
     */
    store: {
      type: Array as PropType<StoreItem[]>,
      default: () => []
    },
    /**
     * 用户传入的 data
     */
    data: {
      type: Array as PropType<DefaultRow[]>,
      default: () => []
    },
    /**
     * 滚动间隔
     */
    interval: {
      type: Number,
      default: 2,
    },
    /**
     * 滚动过渡时间
     */
    transition: {
      type: Number,
      default: 1,
    },
    /**
     * hover 状态下是否停止滚动
     */
    hoverStop: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否显示头部
     */
     showHeader: {
      type: Boolean,
      default: true
    },
    /**
     * 滚动个数
     */
     scrollCount: {
      type: Number,
      default: 1
    },
  },
  emits: ['click'],
  setup(props, {emit}) {
    const { store, data, interval, transition, hoverStop, scrollCount } = toRefs(props);
    const table = ref<HTMLElement | null>(null);
    const tableWrap = ref<HTMLElement | null>(null);

    const { tableData, ableScroll, pauseScroll, recoverScroll } = useScroll({ store, data, tableWrap, table, interval, transition, scrollCount });

    const handleHover = () => {
      if (hoverStop.value) {
        pauseScroll();
      }
    };
    const handleLeave = () => {
      if (hoverStop.value) {
        recoverScroll();
      }
    };
    const handleClick = (row: DefaultRow, column: StoreItem, event: MouseEvent) => {
      emit('click', row, column, event);
    };
    const getItemIndex = (item: DefaultRow): number => {
      return data.value.findIndex(i => i === item);
    };

    return {
      table,
      tableWrap,
      tableData,
      ableScroll,
      handleHover,
      handleLeave,
      handleClick,
      getItemIndex
    };
  }
});
</script>

<style lang="scss">
.scroll-table-body-wrapper {
  flex: 1;
  overflow: hidden;
  color: #606266;
  .scroll-table-body {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border-left: 1px solid #ebeef5;
    background-color: #fff;
    .tr {
      &:hover {
        background-color: #f5f7fa;
      }
      .td {
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
