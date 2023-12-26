import type { LanguageName } from "@/types";

export type AppSupportedLanguage =
  (typeof APP_SUPPORTED_LANGUAGE_NAMES)[number];

/** 应用默认的语言 */
export const APP_SUPPORTED_LANGUAGE_DEFAULT = "en";

/** 应用支持的语言 */
export const APP_SUPPORTED_LANGUAGE_NAMES: LanguageName[] = [
  "zh", // 中文
  "en", // 英语
  "ja", // 日语
];
