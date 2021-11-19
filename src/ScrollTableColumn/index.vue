<script lang='ts'>
import { defineComponent, inject, onBeforeMount, toRefs, watch, h } from 'vue';
import { updateStoreItemKey } from '../symbols';
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
  setup(props, { slots }) {
    const { label, prop } = toRefs(props);
    const id = uniqueId();
    const updateStoreItem = inject(updateStoreItemKey);
    const getStoreItem = () => ({
      id,
      label: label.value,
      prop: prop.value,
      renderHeader: slots.header,
      renderCell: slots.default
    });

    onBeforeMount(() => {
      updateStoreItem?.(getStoreItem());
    });

    watch([label, prop], () => {
      updateStoreItem?.(getStoreItem());
    });
  },
  render() {
    return h('div');
  },
});
</script>

<style lang="scss">
</style>
