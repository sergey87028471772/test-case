export const generateBingoCard = (): number[][] => {
  const ROWS = 3;
  const COLS = 9;

  const card: number[][] = Array.from({ length: ROWS }, () =>
    Array(COLS).fill(-1)
  );

  for (let col = 0; col < COLS; col++) {
    const rangeStart = col * 10 + 1;

    const numbersInRange = Array.from(
      { length: COLS },
      (_, i) => i + rangeStart
    );

    const randomNumbers = shuffle(numbersInRange).slice(0, ROWS);

    randomNumbers.forEach((num, rowIndex) => {
      card[rowIndex][col] = num;
    });
  }

  const allEmptyIndexes: number[] = [];
  const excludedIndexes: number[] = [];

  for (const row of card) {
    let emptyIndexes: number[] = [];
    let isFound: boolean = false;

    while (!isFound) {
      emptyIndexes = getRandomUniqueIndexes(4, COLS, excludedIndexes);

      for (let i = 0; i < emptyIndexes.length; i++) {
        if (allEmptyIndexes.filter((x) => x === emptyIndexes[i]).length >= 2) {
          excludedIndexes.push(emptyIndexes[i]);
          break;
        }

        if (emptyIndexes.length - 1 === i) {
          isFound = true;
        }
      }
    }

    allEmptyIndexes.push(...emptyIndexes);

    for (const emptyIndex of emptyIndexes) {
      row[emptyIndex] = -1;
    }
  }

  return card;
};

const shuffle = (array: number[]): number[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const getRandomUniqueIndexes = (
  count: number,
  max: number,
  excludedIndexes: number[]
): number[] => {
  const indexes = new Set<number>();

  while (indexes.size < count) {
    const randomIndex = Math.floor(Math.random() * max);

    if (!excludedIndexes.includes(randomIndex)) {
      indexes.add(randomIndex);
    }
  }

  return Array.from(indexes).sort();
};
