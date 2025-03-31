import * as readline from "readline";

// readline 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 타입 정의
type Choice = 1 | 2 | 3; // 가위(1), 바위(2), 보(3)
type Result = "승리" | "패배" | "무승부";

// 선택지 매핑
const choices: Record<Choice, string> = {
  1: "가위",
  2: "바위",
  3: "보",
};

// 승패를 결정하는 함수
function determineWinner(userChoice: Choice, computerChoice: Choice): Result {
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

// 컴퓨터의 랜덤 선택 함수
function getRandomChoice(): Choice {
  return Math.floor(Math.random() * 3 + 1) as Choice; // 무작위로 1,2,3 중 하나 반환
}

// 사용자 입력을 처리하는 함수
function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

// 게임 로직 함수
async function playGame(): Promise<boolean> {
  const userInput = await askQuestion(
    "가위(1), 바위(2), 보(3) 중 하나를 선택하세요: "
  );

  const userChoice = parseInt(userInput) as Choice;

  if (![1, 2, 3].includes(userChoice)) {
    console.log(
      '잘못된 입력입니다. 숫자 "1", "2", "3" 중 하나를 입력해주세요.\n'
    );
    return true; // 잘못된 입력이면 게임을 계속 진행
  }

  const computerChoice = getRandomChoice();
  const result = determineWinner(userChoice, computerChoice);

  console.log(`\n사용자: ${choices[userChoice]} (${userChoice})`);
  console.log(`컴퓨터: ${choices[computerChoice]} (${computerChoice})`);
  console.log(`결과: ${result}!\n`);

  const continueInput = await askQuestion(
    '새로운 게임을 시작하려면 "1", 종료하려면 "9"를 입력하세요: '
  );

  if (continueInput === "9") {
    console.log("게임을 종료합니다.");
    return false; // 게임 종료
  } else if (continueInput !== "1") {
    console.log("잘못된 입력으로 게임을 종료합니다.");
    return false; // 잘못된 입력 시 게임 종료
  }

  return true; // 새로운 게임 시작
}

// 게임 루프 함수
async function gameLoop() {
  let isPlaying = true;

  while (isPlaying) {
    isPlaying = await playGame();
  }

  rl.close();
}

// 게임 시작
gameLoop();
