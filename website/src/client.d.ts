declare module 'csstype' {
  interface Properties {
    // Permit arbitrary custom properties to be passed in styles
    [index: `--${string}`]: string;
  }
}
