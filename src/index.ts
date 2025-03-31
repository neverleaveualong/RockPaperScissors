import { choices } from "./data";

const readlineSync = require("readline-sync");

function main(): void {
  // 게임 시작
  console.log("가위 바위 보 게임을 시작합니다!");

  let isPlaying = true;

  while (isPlaying) {
    process.stdout.write("가위(1), 바위(2), 보(3) 중 하나를 선택하세요: ");

    // 유저 선택택
    const userChoice = parseInt(readlineSync.question(""));

    // 컴퓨터 선택
    const computerChoice = randomChoice();

    // 유효성 체크
    if (![1, 2, 3].includes(userChoice)) {
      console.log(
        "잘못된 입력입니다. 숫자 '1', '2', '3' 중 하나를 입려해주세요. "
      );
      return;
    }

    console.log(`컴퓨터: ${choices[computerChoice - 1]} (${computerChoice})`);
    console.log(`결과: ${determineWinner(userChoice, computerChoice)}!\n`);

    process.stdout.write(
      "새로운 게임을 시작하려면 '1', 종료하려면 '9'를 입력하세요: "
    );
    // 새로운 게임 여부 확인
    const nextAction = readlineSync.question("");

    if (nextAction === "9") {
      console.log("게임을 종료합니다.");
      isPlaying = false; // 게임 종료
    } else if (nextAction !== "1") {
      console.log("잘못된 입력으로 게임을 종료합니다.");
      isPlaying = false; // 잘못된 입력 시 종료
    }
  }
}

// 랜덤 선택
function randomChoice(): number {
  return Math.floor(Math.random() * 3 + 1);
}

// 승부 선택택
function determineWinner(userChoice: number, computerChoice: number): string {
  if (userChoice === computerChoice) {
    return "무승부";
  }
  if (
    (userChoice === 1 && computerChoice === 3) || // 가위 > 보
    (userChoice === 2 && computerChoice === 1) || // 바위 > 가위
    (userChoice === 3 && computerChoice === 2) // 보 > 바위
  ) {
    return "승리";
  }
  return "패배";
}

main();
