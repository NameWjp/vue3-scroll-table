import { onBeforeUnmount } from 'vue';
import throttle from 'lodash-es/throttle';

export default function useWindowResize(callback: () => void): void {
  const handleResize = throttle(callback, 8);

  window.addEventListener('resize', handleResize);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });
}
