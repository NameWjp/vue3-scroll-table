<template>
  <div class="TableNext">
    <div class="TableNext-Header">
      这是头部
    </div>
    <div class="TableNext-Body">
      这是身体
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { DefaultRow } from '../types';

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
  setup(props) {
    console.log(props);
  }
});
</script>

<style scoped lang="scss">
.TableNext {
  color: red;
}
</style>
