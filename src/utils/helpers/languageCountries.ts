import type { CountryName, LanguageName } from "@/types";

/**
 * 将语言名转为国家名
 * @see https://www.kanzaki.com/docs/html/lang.html
 * @example
 * // "united-kingdom"
 * const country = transformLanguageToCountry("en")
 * // "south-korea"
 * const country = transformLanguageToCountry("ko")
 */
export const transformLanguageToCountry = (
  language: LanguageName,
): CountryName => {
  switch (language) {
    case "zh":
      return "china";

    case "en":
      return "united-kingdom";

    case "ja":
      return "japan";

    case "ko":
      return "south-korea";

    case "fr":
      return "france";

    case "de":
      return "germany";

    case "it":
      return "italy";

    case "ru":
      return "russia";
  }
};
