const readline = require("readline");

// readline 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin, // 터미널에서 사용자 입력 받음
  output: process.stdout, // 터미널에 출력
});

console.log("Welcome to RockPaperSissors!!!");
// 질문을 던지고 사용자 입력 받기
rl.question("What is your name? ", (answer: string) => {
  console.log(`Hello, ${answer}!`);

  // 인터페이스 닫기
  rl.close();
});
