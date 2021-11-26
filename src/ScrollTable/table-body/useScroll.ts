import { Ref, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { StoreItem, DefaultRow } from '../../types';
import useWindowResize from './useWindowResize';
// import animations from 'create-keyframe-animation';

export default function useScroll({
  store, data, tableWrap, table, interval, transition
}: {
  store: Ref<StoreItem[]>,
  data: Ref<DefaultRow[]>,
  tableWrap: Ref<HTMLElement | null>,
  table: Ref<HTMLElement | null>,
  interval: Ref<number>,
  transition: Ref<number>,
}): {
  tableData: Ref<DefaultRow[]>,
} {
  const tableData = ref<DefaultRow[]>(data.value.slice());
  const timer = ref<number>();
  const needScroll = () => {
    if (tableWrap.value && table.value) {
      const wrapHeight = tableWrap.value.offsetHeight;
      const contentHeight = table.value.offsetHeight;
      return contentHeight > wrapHeight;
    }
    return false;
  };
  const resetTable = () => {
    tableData.value.shift();
    if (table.value) {
      table.value.style.transition = 'none';
      table.value.style.transform = 'none';
    }
  };
  const startScroll = () => {
    const head = tableData.value[0];
    if (head && table.value) {
      tableData.value.push(head);
      const offsetHeight = table.value.getElementsByTagName('tr')[0].getBoundingClientRect().height;
      table.value.style.transition = `all ${transition.value}s`;
      table.value.style.transform = `translateY(${-offsetHeight}px)`;
    }
  };
  const init = () => {
    if (!needScroll()) return;
    if (table.value) {
      table.value.addEventListener('transitionend', resetTable);
      timer.value = window.setInterval(() => {
        startScroll();
      }, Math.max(interval.value * 1000,transition.value * 1000 + 100));
    }
  };
  const destroyed = () => {
    clearInterval(timer.value);
    if (table.value) {
      table.value.removeEventListener('transitionend', resetTable);
      table.value.style.transition = 'none';
      table.value.style.transform = 'none';
    }
  };
  const refresh = () => {
    tableData.value = data.value.slice();
    destroyed();
    init();
  };

  onMounted(init);
  onBeforeUnmount(destroyed);

  watch([store.value, data.value], refresh);
  useWindowResize(refresh);

  return {
    tableData
  };
}
