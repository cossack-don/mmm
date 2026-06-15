export function useFinance(income: string[], expenses: string[]): number {
  const incomeSum = income.reduce((sum, val) => {
    const num = Number(val);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const expensesSum = expenses.reduce((sum, val) => {
    const num = Number(val);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return incomeSum - expensesSum;
}

/**
 * Вычитает процент из числа.
 * @param value - исходное число
 * @param percent - сколько процентов вычесть
 * @returns результат: value - (value * percent / 100)
 */
export function subtractPercent(value: number, percent: number): number {
  return value - (value * percent) / 100;
}
