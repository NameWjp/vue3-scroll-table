<template>
  <div>
    这是 table next column 组件
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ScrollTableColumn',
  props: {
    /**
     * 列名称
     */
    label: String,
    /**
     * 对应列内容的字段名
     */
    prop: String
  },
});
</script>

<style scoped lang="scss">
</style>
