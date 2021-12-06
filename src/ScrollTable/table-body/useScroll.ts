import { Ref, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { StoreItem, DefaultRow, AnimationEnum } from '../../types';
import useWindowResize from './useWindowResize';
import keyframeAnimation from 'easy-keyframe-animation';

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
  ableScroll: Ref<boolean>,
  startScroll: () => void,
  stopScroll: () => void,
  pauseScroll: () => void,
  recoverScroll: () => void,
} {
  // 数据源
  const tableData = ref<DefaultRow[]>(data.value.slice());
  // 定时器
  const timer = ref<number>();
  // 是否需要滚动
  const needScroll = ref<boolean>(true);
  // 是否能够滚动
  const ableScroll = ref<boolean>(false);
  // 动画类型
  let animationEnum = AnimationEnum.Stop;

  const computedAbleScroll = () => {
    if (tableWrap.value && table.value) {
      const wrapHeight = tableWrap.value.offsetHeight;
      const contentHeight = table.value.offsetHeight;
      ableScroll.value = contentHeight > wrapHeight;
    } else {
      ableScroll.value = false;
    }
    return ableScroll.value;
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

      keyframeAnimation.registerKeyframe('move', {
        0: {
          transform: `translate3d(0, 0, 0)`
        },
        100: {
          transform: `translate3d(0, ${-offsetHeight}px, 0)`
        }
      });

      keyframeAnimation.addAnimation(table.value, {
        name: 'move',
        duration: `${transition.value}s`,
      }, () => {
        tableData.value.shift();
        if (table.value) {
          keyframeAnimation.removeAnimation(table.value);
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
    if (!computedAbleScroll()) return;
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
        keyframeAnimation.pauseAnimation(table.value);
      }
    }
    if (animationEnum === AnimationEnum.Await) {
      window.clearTimeout(timer.value);
    }
  };
  const recoverScroll = () => {
    if (animationEnum === AnimationEnum.Run) {
      if (table.value) {
        keyframeAnimation.recoverAnimation(table.value);
      }
    }
    if (animationEnum === AnimationEnum.Await) {
      addTimer();
    }
  };

  const refresh = () => {
    stopScroll();
    startScroll();
  };

  onMounted(startScroll);
  onBeforeUnmount(stopScroll);

  watch([store.value, data.value], refresh);
  useWindowResize(refresh);

  return {
    tableData,
    ableScroll,
    startScroll,
    stopScroll,
    pauseScroll,
    recoverScroll,
  };
}
