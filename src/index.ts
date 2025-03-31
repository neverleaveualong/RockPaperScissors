import { choices } from "./data";

const readlineSync = require("readline-sync");

// 최근 선택
let recentChoices: number[] = [];
let MAX_RECENT_CHOICES = 5;
let MIN_COUNT = 3;

function playChampionship(userName: string): void {
  console.log(`\n챔피언십 모드 시작! 3판 2선승제로 진행됩니다.`);

  recentChoices = [];
  let userWins = 0;
  let computerWins = 0;

  while (userWins < 2 && computerWins < 2) {
    // 라운드 시작
    process.stdout.write("가위(1), 바위(2), 보(3) 중 하나를 선택하세요: ");
    const userChoice = parseInt(readlineSync.question(""));

    // 입력값 검증
    if (![1, 2, 3].includes(userChoice)) {
      console.log(
        "잘못된 입력입니다. 숫자 '1', '2', '3' 중 하나를 입력해주세요.\n"
      );
      continue;
    }

    recentChoices.push(userChoice);
    if (recentChoices.length > MAX_RECENT_CHOICES) {
      recentChoices.shift();
    }

    checkPattern();

    const computerChoice = randomChoice();
    const result = determineWinner(userChoice, computerChoice);

    // 점수 업데이트
    if (result === "승리") userWins++;
    else if (result === "패배") computerWins++;

    // 결과 출력
    console.log(`컴퓨터: ${choices[computerChoice - 1]} (${computerChoice})`);
    console.log(`결과: ${result} (${userWins}:${computerWins})\n`);
  }

  // 최종 승자 결정
  if (userWins === 2) {
    console.log(`${userName}님이 2승을 달성하여 승리했습니다! 🎉\n`);
  } else {
    console.log("컴퓨터가 2승을 달성하여 승리했습니다!\n");
  }
}

// 기본 게임 시작
function main(): void {
  // 게임 시작
  console.log("가위 바위 보 게임을 시작합니다!");

  let isPlaying = true;

  while (isPlaying) {
    process.stdout.write(
      "새로운 게임을 시작하려면 '1', 기록을 보려면 2, 종료하려면 '9'를 입력하세요: "
    );
    const action = readlineSync.question("");

    if (action === "9") {
      console.log("게임을 종료합니다.");
      isPlaying = false;
    } else if (action === "1") {
      process.stdout.write("이름을 입력해주세요. ");
      const userName = readlineSync.question("");
      playChampionship(userName);
    } else {
      console.log("잘못된 입력입니다. '1' 또는 '9'를 입력해주세요.");
    }
  }
}

// 랜덤 선택
function randomChoice(): number {
  return Math.floor(Math.random() * 3 + 1);
}

// 승부 선택
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

function checkPattern(): void {
  if (recentChoices.length < MIN_COUNT) return;

  const frequency: Record<number, number> = { 1: 0, 2: 0, 3: 0 };

  recentChoices.forEach((choice) => {
    frequency[choice]++;
  });

  for (const [choice, count] of Object.entries(frequency)) {
    if (count >= 3) {
      console.log(
        `\n AI가 패턴을 감지했습니다: 당신은 '${
          choices[parseInt(choice) - 1]
        }(${choice})'를 자주 선택합니다.\n`
      );
      return;
    }
  }
}

main();
