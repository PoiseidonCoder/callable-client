interface CalcGridFillParams {
  containerWidth: number;
  minWidth: number;
  gap: number;
  currentItems: number;
  minRows?: number;
}

export const calcMissingItemsToFillGrid = ({ containerWidth, minWidth, gap, currentItems, minRows = 3 }: CalcGridFillParams): number => {
  if (!containerWidth) return 0;

  const columns = Math.max(Math.floor((containerWidth + gap) / (minWidth + gap)), 1);

  const neededItems = columns * minRows;

  return Math.max(neededItems - currentItems, 0);
};
