import { VNode } from 'vue';

export default function VNodes(props: { vnodes: VNode }): VNode {
  return props.vnodes;
}
