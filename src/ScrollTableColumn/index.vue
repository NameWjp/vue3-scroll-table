<template>
  <slot />
</template>

<script lang='ts'>
import { defineComponent, inject, onBeforeMount, toRefs, watch } from 'vue';
import { addStoreItemKey, updateStoreItemKey } from '../symbols';
import uniqueId from 'lodash-es/uniqueId';

export default defineComponent({
  name: 'ScrollTableColumn',
  props: {
    /**
     * 列名称
     */
    label: {
      type: String,
      default: null
    },
    /**
     * 对应列内容的字段名
     */
    prop: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { label, prop } = toRefs(props);
    const id = uniqueId();
    const addStoreItem = inject(addStoreItemKey);
    const updateStoreItem = inject(updateStoreItemKey);

    onBeforeMount(() => {
      addStoreItem?.({
        id,
        label: label.value,
        prop: prop.value
      });
    });

    watch([label, prop], () => {
      updateStoreItem?.(id, {
        id,
        label: label.value,
        prop: prop.value
      });
    });
  },
});
</script>

<style scoped lang="scss">
</style>
