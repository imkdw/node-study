interface ICounter {
  [key: string]: number;
}

export function anagram(text1: string, text2: string) {
  if (text1.length !== text2.length) {
    return false;
  }

  const counter1: ICounter = {};
  const counter2: ICounter = {};

  for (const text of text1) {
    const str = text.toLowerCase();
    counter1[str] = (counter1[str] || 0) + 1;
  }

  for (const text of text2) {
    const str = text.toLowerCase();
    counter2[str] = (counter2[str] || 0) + 1;
  }

  for (const text in counter1) {
    if (!(text in counter2)) {
      return false;
    }

    if (counter1[text] !== counter2[text]) {
      return false;
    }
  }

  return true;
}
