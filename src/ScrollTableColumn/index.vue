<script lang='ts'>
import { defineComponent, inject, toRefs, watch, h, onMounted, onUnmounted } from 'vue';
import { updateStoreItemKey, removeStoreItemKey } from '../symbols';
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
    /**
     * 列宽
     */
    width: {
      type: [String, Number],
      default: null,
    }
  },
  setup(props, { slots }) {
    const { label, prop, width } = toRefs(props);
    const id = uniqueId();
    const updateStoreItem = inject(updateStoreItemKey);
    const removeStoreItem = inject(removeStoreItemKey);

    const getStoreItem = () => ({
      id,
      label: label.value,
      prop: prop.value,
      width: width.value,
      renderHeader: slots.header,
      renderCell: slots.default
    });

    watch([label, prop, width], () => {
      updateStoreItem?.(getStoreItem());
    });

    onMounted(() => {
      updateStoreItem?.(getStoreItem());
    });

    onUnmounted(() => {
      removeStoreItem?.(id);
    });
  },
  render() {
    return h('div');
  },
});
</script>

<style lang="scss">
</style>
