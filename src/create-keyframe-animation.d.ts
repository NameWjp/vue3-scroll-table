/* eslint-disable */
declare module 'create-keyframe-animation' {
  type Options = {
    name: string,
    animation: Object | any[],
  }
  export function registerAnimation(opts: Options): void;
  export function runAnimation(el: HTMLElement, name: string | Object, cb?: Function): void;
}
