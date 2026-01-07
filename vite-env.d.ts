/// <reference types="vite/client" />

declare module 'vite-plugin-webp' {
  import { Plugin } from 'vite';
  
  interface ViteWebpOptions {
    quality?: number;
    lossless?: boolean;
    alphaQuality?: number;
    method?: number;
    autoFilter?: boolean;
    sharpness?: number;
    verbose?: boolean;
    resize?: {
      width: number;
      height: number;
    };
  }

  export function webp(options?: ViteWebpOptions): Plugin;
  
  const viteWebp: (options?: ViteWebpOptions) => Plugin;
  export default viteWebp;
}
