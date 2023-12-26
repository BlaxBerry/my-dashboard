/**
 * 根据当前时间判断应用是否应处于黑暗模式
 *
 * 主要用于定义 Redux 中 存储的默认值
 */
export const isSystemDarkMode = (): boolean => {
  const d = new Date();
  const h = d.getHours();

  return h >= 19 || h <= 6;
};
