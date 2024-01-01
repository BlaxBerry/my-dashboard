import type { SongData } from "../../types/api";
import type { ContextMusicValue } from "../contexts";

export const MOCK_SONG_URL: ContextMusicValue["songUrl"] =
  "https://mp3.chillhop.com/serve.php/?mp3=9272";

// FIXME: player 默认展示的内容
export const MOCK_SONG_DETAIL: ContextMusicValue["songDetail"] = {
  id: 0,
  name: "Daylight",
  al: {
    id: 0,
    name: "Sample",
    picUrl:
      "https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg",
  },
  ar: [{ id: 0, name: "Aiguille" }],
  dt: 141000,
};

export const MOCK_FAVORITE_LIST: SongData[] = [
  {
    id: 32063399,
    name: "Hunt or Be Hunted",
    dt: 145000,
    al: {
      id: 3152080,
      name: "The Witcher 3: Wild Hunt (Soundtrack)",
      picUrl:
        "https://p2.music.126.net/cGtyjLew7JwUq__YCRd0TA==/2893914605754636.jpg",
    },
    ar: [{ id: 213431, name: "Marcin Przybyłowicz" }],
  },
  {
    id: 32063372,
    name: "Silver for Monsters...",
    dt: 139000,
    al: {
      id: 3152080,
      name: "The Witcher 3: Wild Hunt (Soundtrack)",
      picUrl:
        "https://p2.music.126.net/cGtyjLew7JwUq__YCRd0TA==/2893914605754636.jpg",
    },
    ar: [{ id: 213431, name: "Marcin Przybyłowicz" }],
  },
  {
    id: 36307475,
    name: "Mystery Man",
    dt: 160615,
    al: {
      id: 3394117,
      name: "The Witcher 3: Wild Hunt - Hearts of Stone (Original Game Soundtrack)",
      picUrl:
        "https://p1.music.126.net/o1mlEtOmzqVuCgtdm-KOsg==/109951166485891288.jpg",
    },
    ar: [{ id: 213431, name: "Marcin Przybyłowicz" }],
  },
  {
    id: 1851465379,
    name: "EveryTime I Cry",
    dt: 177855,
    al: {
      id: 128596513,
      name: "EveryTime I Cry",
      picUrl:
        "https://p2.music.126.net/vjfjolbvVqz9xizJ09urvQ==/109951166069549943.jpg",
    },
    ar: [{ id: 14486166, name: "Ava Max" }],
  },
  {
    id: 5052317,
    name: "Lose Yourself",
    dt: 322014,
    al: {
      id: 501243,
      name: "8 Mile",
      picUrl:
        "https://p1.music.126.net/cdEfys0mWiyV4Ywp5GW9Tw==/6656443395492431.jpg",
    },
    ar: [{ id: 32665, name: "Eminem" }],
  },
  {
    id: 21803530,
    name: "The Way I Are",
    dt: 179146,
    al: {
      id: 2005743,
      name: "Shock Value",
      picUrl:
        "https://p1.music.126.net/RrIxAIKAcrVTudK12OO4MA==/109951166737877936.jpg",
    },
    ar: [
      { id: 44263, name: "Timbaland" },
      { id: 62893, name: "Keri Hilson" },
      { id: 196400, name: "D.O.E." },
    ],
  },
];
