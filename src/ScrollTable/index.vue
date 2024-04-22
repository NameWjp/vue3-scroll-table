<template>
  <div
    class="scroll-table"
    :style="{ height: height === null ? 'auto' : `${height}px` }"
  >
    <div class="hidden-columns">
      <slot />
    </div>
    <table-header
      v-if="showHeader"
      :store="store"
    />
    <table-body
      :store="store"
      :data="data"
      :interval="interval"
      :transition="transition"
      :hover-stop="hoverStop"
      :show-header="showHeader"
      :scroll-count="scrollCount"
      @click="handleClick"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, provide } from 'vue';
import { removeStoreItemKey, updateStoreItemKey } from '../symbols';
import { DefaultRow, StoreItem } from '../types';
import useStore from './useStore';
import TableHeader from './table-header/index.vue';
import TableBody from './table-body/index.vue';

export default defineComponent({
  name: 'ScrollTable',
  components: {
    TableHeader,
    TableBody
  },
  props: {
    /**
     * 表格数据
     */
    data: {
      type: Array as PropType<DefaultRow[]>,
      default: () => []
    },
    /**
     * table 高，默认不滚动
     */
    height: {
      type: Number,
      default: null
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
  setup(_props, { emit }) {
    const { store, removeStoreItem, updateStoreItem } = useStore();

    provide(removeStoreItemKey, removeStoreItem);
    provide(updateStoreItemKey, updateStoreItem);

    const handleClick = (row: DefaultRow, column: StoreItem, event: MouseEvent) => {
      emit('click', row, column, event);
    };

    return {
      store,
      handleClick,
    };
  },
});
</script>

<style lang="scss">
.scroll-table {
  overflow: hidden;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  .hidden-columns {
    visibility: hidden;
    position: absolute;
    z-index: -1;
  }
}
</style>
