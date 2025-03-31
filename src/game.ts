import { Choice, Result } from "./types";

export function determineWinner(
  userChoice: Choice,
  computerChoice: Choice
): Result {
  if (userChoice === computerChoice) return "무승부";

  if (
    (userChoice === 1 && computerChoice === 3) || // 가위 > 보
    (userChoice === 2 && computerChoice === 1) || // 바위 > 가위
    (userChoice === 3 && computerChoice === 2) // 보 > 바위
  ) {
    return "승리";
  }

  return "패배";
}
