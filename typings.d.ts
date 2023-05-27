declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare global {
  interface Window {
    $: JQueryStatic;
    jQuery: JQueryStatic;
  }
}

export {};
