// Simple rolldice tool — returns an integer between 1 and `sides` (inclusive).
export function rollDice(sides: number): number {
  if (!Number.isInteger(sides) || sides <= 0) {
    throw new Error('sides must be a positive integer');
  }
  return Math.floor(Math.random() * sides) + 1;
}