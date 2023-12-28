import type { SongData } from "../../types/api";
import type { ContextMusicValue } from "../contexts";

export const MOCK_SONG_URL: ContextMusicValue["songUrl"] =
  "https://mp3.chillhop.com/serve.php/?mp3=9272";

export const MOCK_SONG_DETAIL: ContextMusicValue["songDetail"] = {
  id: 32063399,
  name: "Daylight",
  al: {
    id: 3152080,
    name: "Sample",
    picUrl:
      "https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg",
  },
  ar: [{ id: 213431, name: "Aiguille" }],
  dt: 141000,
};

export const MOCK_FAVORITE_LIST: SongData[] = [
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
  {
    id: 2014200813,
    name: "Flowers",
    dt: 200666,
    al: {
      id: 158181585,
      name: "Flowers",
      picUrl:
        "https://p2.music.126.net/0jQ3JrVAmoPcsjDgYEJEFw==/109951168231543153.jpg",
    },
    ar: [{ id: 66361, name: "Miley Cyrus" }],
  },
  {
    id: 1329183592,
    name: "WTF",
    dt: 160686,
    al: {
      id: 74637625,
      name: "WTF",
      picUrl:
        "https://p2.music.126.net/GGdCgUSn7QNsJ4fUl-cQtA==/109951163691835025.jpg",
    },
    ar: [
      { id: 12024477, name: "Hugel" },
      { id: 27777576, name: "Amber Van Day" },
    ],
  },
  {
    id: 1480204501,
    name: "Salt",
    dt: 180283,
    al: {
      id: 95589461,
      name: "Heaven & Hell",
      picUrl:
        "https://p2.music.126.net/-NYPVmEa2h6mm6-RSO572w==/109951165324860695.jpg",
    },
    ar: [{ id: 14486166, name: "Ava Max" }],
  },
];
