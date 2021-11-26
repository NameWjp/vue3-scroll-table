/* eslint-disable */
declare module 'create-keyframe-animation' {
  type registerAnimationOptions = {
    name: string,
    animation: Object | any[],
  }
  export function registerAnimation(opts: registerAnimationOptions): void;
  type runAnimationOptions = {
    name: string,
    [propName: string]: any
  }
  export function runAnimation(el: HTMLElement, name: string | runAnimationOptions, cb?: Function): void;
}
