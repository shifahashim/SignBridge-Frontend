// Mapping of Malayalam alphabets with their English transliterations
export interface MalayalamLetter {
  english: string
  malayalam: string
  pronunciation: string
}

// Updated class mapping from the backend model
export const classMapping = {
  a: 0, aa: 1, ae: 2, ai: 3, au: 4, ba: 5, bha: 6, cha: 7, chha: 8, 
  da: 9, dha: 10, dha_: 11, dhha: 12, e: 13, ee: 14, ga: 15, gha: 16, 
  ha: 17, i: 18, ja: 19, jha: 20, ka: 21, kha: 22, la: 23, lla: 24, 
  ma: 25, na: 26, na_: 27, nga: 28, nya: 29, o: 30, oo: 31, oo_: 32, 
  pa: 33, pha: 34, ra: 35, ra_: 36, ru: 37, sa: 38, sha: 39, ssha: 40, 
  ta: 41, tha: 42, tha_: 43, thha: 44, u: 45, va: 46, ya: 47, zha: 48
}

// Get all class names from the mapping
export const allGestureClasses = Object.keys(classMapping)

// Direct mapping from class names to Malayalam letters
export const gestureToMalayalam: Record<string, MalayalamLetter> = {
  a: { english: "a", malayalam: "അ", pronunciation: "ah" },
  aa: { english: "aa", malayalam: "ആ", pronunciation: "aah" },
  ae: { english: "ae",malayalam: "ഏ", pronunciation: "eeh" },
  ai: { english: "ai", malayalam: "ഐ", pronunciation: "ai" },
  au: { english: "au", malayalam: "ഔ", pronunciation: "au" },
  ba: { english: "ba", malayalam: "ബ", pronunciation: "ba" },
  bha: { english: "bha", malayalam: "ഭ", pronunciation: "bha" },
  cha: { english: "cha", malayalam: "ച", pronunciation: "cha" },
  chha: { english: "chha", malayalam: "ഛ", pronunciation: "chha" },
  da: { english: "da", malayalam: "ഡ", pronunciation: "da" },
  dha: { english: "dha", malayalam: "ഢ", pronunciation: " ɖʱa" },
  dha_: { english: "dha_", malayalam: "ദ", pronunciation: "d̪a" },
  dhha: { english: "dhha", malayalam: "ധ", pronunciation: "d̪ʱa" },
  e: { english: "e", malayalam: "എ", pronunciation: "ea" },
  ee: { english: "ee", malayalam: "ഈ", pronunciation: "eeh" },
  ga: { english: "ga", malayalam: "ഘ", pronunciation: "gha" },
  gha: { english: "gha", malayalam: "ഗ", pronunciation: "ga" },
  ha: { english: "ha", malayalam: "ഹ", pronunciation: "ha" },
  i: { english: "i", malayalam: "ഇ", pronunciation: "eh" },
  ja: { english: "ja", malayalam: "ജ", pronunciation: "ja" },
  jha: { english: "jha", malayalam: "ഝ", pronunciation: "jha" },
  ka: { english: "ka", malayalam: "ക", pronunciation: "ka" },
  kha: { english: "kha", malayalam: "ഖ", pronunciation: "kha" },
  la: { english: "la", malayalam: "ല", pronunciation: "la" },
  lla: { english: "lla", malayalam: "ള", pronunciation: "lla" },
  ma: { english: "ma", malayalam: "മ", pronunciation: "ma" },
  na: { english: "na", malayalam: "ണ", pronunciation: "nna" },
  na_: { english: "na_", malayalam: "ന", pronunciation: "na" },
  nga: { english: "nga", malayalam: "ങ", pronunciation: "nga" },
  nya: { english: "nya", malayalam: "ഞ", pronunciation: "nya" },
  o: { english: "o", malayalam: "ഒ", pronunciation: "oh" },
  oo: { english: "oo", malayalam: "ഊ", pronunciation: "uː" },
  oo_: { english: "oo_", malayalam: "ഓ", pronunciation: "ooh" },
  pa: { english: "pa", malayalam: "പ", pronunciation: "pa" },
  pha: { english: "pha", malayalam: "ഫ", pronunciation: "pʰa" },
  ra: { english: "ra", malayalam: "ര", pronunciation: "ra" },
  ra_: { english: "ra_", malayalam: "റ", pronunciation: "rra" },
  ru: { english: "ru", malayalam: "ഋ", pronunciation: "ru" },
  sa: { english: "sa", malayalam: "സ", pronunciation: "sa" },
  sha: { english: "sha", malayalam: "ശ", pronunciation: "sha" },
  ssha: { english: "ssha", malayalam: "ഷ", pronunciation: "ʂa" },
  ta: { english: "ta", malayalam: "ട", pronunciation: "ta" },
  tha: { english: "tha", malayalam: "ഠ", pronunciation: "ʈʰa" },
  tha_: { english: "tha_", malayalam: "ത", pronunciation: "tha" },
  thha: { english: "thha", malayalam: "ഥ", pronunciation: "thha" },
  u: { english: "u", malayalam: "ഉ", pronunciation: "uh" },
  va: { english: "va", malayalam: "വ", pronunciation: "va" },
  ya: { english: "ya", malayalam: "യ", pronunciation: "ya" },
  zha: { english: "zha", malayalam: "ഴ", pronunciation: "zha" }
}

// Utility functions
export function findMalayalamByEnglish(english: string): MalayalamLetter | undefined {
  const lowerEnglish = english.toLowerCase();

  // Look up the gesture in the mapping
  const malayalamLetter = gestureToMalayalam[lowerEnglish];

  // If the gesture is not found, return undefined or a fallback object
  if (!malayalamLetter) {
    console.warn(`No Malayalam translation found for gesture: ${lowerEnglish}`);
    return undefined; // Return undefined to indicate no translation is available
  }

  return malayalamLetter;
}

export function findMalayalamByCharacter(character: string): MalayalamLetter | undefined {
  return Object.values(gestureToMalayalam).find(letter => letter.malayalam === character)
}

// Get all gesture classes for simulation
export function getAllGestureClasses(): string[] {
  return allGestureClasses
}