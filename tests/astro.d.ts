declare module '*.astro' {
  type AstroContainer = import('astro/container').experimental_AstroContainer;
  const component: Parameters<AstroContainer['renderToString']>[0];
  export default component;
}
