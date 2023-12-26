/**
 * 获取`src/assets/`目录下的资源文件的路径
 * @example
 * // src/assets/images/assets/usa.svg
 * const flag_USA = getAssetsImageURL('images/flags/usa.svg')
 */
export function getViteAssetsURL(pathname: string): string {
  return new URL(`../../assets/${pathname}`, import.meta.url).href;
}
