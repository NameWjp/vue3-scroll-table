import { Ref, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { StoreItem, DefaultRow, AnimationEnum } from '../../types';
import useWindowResize from './useWindowResize';
import animations from 'create-keyframe-animation';

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
  startScroll: () => void,
  stopScroll: () => void,
  pauseScroll: () => void,
  recoverScroll: () => void,
} {
  const tableData = ref<DefaultRow[]>(data.value.slice());
  const timer = ref<number>();
  const needScroll = ref<boolean>(true);
  let animationEnum = AnimationEnum.Stop;

  const isAbleScroll = () => {
    if (tableWrap.value && table.value) {
      const wrapHeight = tableWrap.value.offsetHeight;
      const contentHeight = table.value.offsetHeight;
      return contentHeight > wrapHeight;
    }
    return false;
  };

  const addTimer = () => {
    const time = interval.value - transition.value;
    timer.value = window.setTimeout(() => {
      toScroll();
    }, time > 0 ? time * 1000 : 0);
  };

  const toScroll = () => {
    const head = tableData.value[0];
    if (head && table.value && animationEnum !== AnimationEnum.Run) {
      animationEnum = AnimationEnum.Run;
      tableData.value.push(head);
      const offsetHeight = table.value.getElementsByTagName('tr')[0].offsetHeight;
      animations.registerAnimation({
        name: 'move',
        animation: {
          0: {
            transform: `translate3d(0, 0, 0)`
          },
          100: {
            transform: `translate3d(0, ${-offsetHeight}px, 0)`
          }
        }
      });
      animations.runAnimation(table.value, {
        name: 'move',
        duration: transition.value * 1000,
      }, () => {
        tableData.value.shift();
        if (table.value) {
          table.value.style.animation = '';
          if (needScroll.value) {
            animationEnum = AnimationEnum.Await;
            addTimer();
          } else {
            animationEnum = AnimationEnum.Stop;
          }
        }
      });
    }
  };

  const startScroll = () => {
    if (!isAbleScroll()) return;
    needScroll.value = true;
    toScroll();
  };
  const stopScroll = () => {
    needScroll.value = false;
    if (animationEnum === AnimationEnum.Await) {
      window.clearTimeout(timer.value);
    }
  };
  const pauseScroll = () => {
    if (animationEnum === AnimationEnum.Run) {
      if (table.value) {
        table.value.style.animationPlayState = 'paused';
      }
    }
    if (animationEnum === AnimationEnum.Await) {
      window.clearTimeout(timer.value);
    }
  };
  const recoverScroll = () => {
    if (animationEnum === AnimationEnum.Run) {
      if (table.value) {
        table.value.style.animationPlayState = 'running';
      }
    }
    if (animationEnum === AnimationEnum.Await) {
      addTimer();
    }
  };

  const refresh = () => {
    tableData.value = data.value.slice();
    stopScroll();
    startScroll();
  };

  onMounted(startScroll);
  onBeforeUnmount(stopScroll);

  watch([store.value, data.value], refresh);
  useWindowResize(refresh);

  return {
    tableData,
    startScroll,
    stopScroll,
    pauseScroll,
    recoverScroll,
  };
}
