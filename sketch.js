let questions = [];
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

let questionText;
let radio;
let submitButton;

function preload() {
  // 載入 CSV 檔案
  questions = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 初始化題目文字
  questionText = createElement('h2', '');
  questionText.position(width / 2 - 200, height / 2 - 150);
  questionText.style('color', 'black');
  questionText.style('font-size', '35px');

  // 初始化選項 (radio)
  radio = createRadio();
  radio.style('font-size', '35px');
  radio.style('color', 'yellow');
  radio.position(width / 2 - 100, height / 2 - 50);

  // 初始化按鈕
  submitButton = createButton('下一題');
  submitButton.position(width / 2 - 50, height / 2 + 100);
  submitButton.mousePressed(handleSubmit);

  // 顯示第一題
  displayQuestion();
}

function draw() {
  background(220);

  // 畫出中心的矩形
  fill('#FF359A');
  rect(width / 4, height / 4, width / 2, height / 2);
}

function displayQuestion() {
  if (currentQuestionIndex < questions.getRowCount()) {
    // 取得當前題目與選項
    let row = questions.getRow(currentQuestionIndex);
    let question = row.get('question');
    let option1 = row.get('option1');
    let option2 = row.get('option2');

    // 更新題目文字
    questionText.html(question);

    // 更新選項
    radio.html('');
    radio.option(option1);
    radio.option(option2);
    radio.selected(null);
  } else {
    // 顯示結果
    questionText.html(`測驗結束！答對：${correctCount} 題，答錯：${incorrectCount} 題`);
    radio.hide();
    submitButton.html('再試一次');

    // 移除舊的事件處理器，重新綁定
    submitButton.mousePressed(() => {
      currentQuestionIndex = 0;
      correctCount = 0;
      incorrectCount = 0;
      radio.show();
      submitButton.html('下一題');
      submitButton.mousePressed(handleSubmit); // 重新綁定 handleSubmit
      displayQuestion();
    });
  }
}

function handleSubmit() {
  if (currentQuestionIndex < questions.getRowCount()) {
    let row = questions.getRow(currentQuestionIndex);
    let correctAnswer = row.get('answer,answer2');
    let userAnswer = radio.value();

    if (userAnswer === correctAnswer) {
      correctCount++;
    } else {
      incorrectCount++;
    }

    currentQuestionIndex++;
    displayQuestion();
  }
}
