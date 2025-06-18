
const chapters = [
  { chapter: "The Last Lesson", qs: [
    {q:"Why was Franz surprised at school?", a:["No German lesson","Teacher absent","Extra homework"], ans:"No German lesson"},
    {q:"Who taught the lesson?", a:["M Hamel","Franz","Authority"], ans:"M Hamel"}]},
  { chapter: "My Mother at Sixty-Six", qs:[
    {q:"Poet worries about mother’s ___?", a:["sleep","health","travel"], ans:"health"}]},
  { chapter: "Deep Water", qs:[
    {q:"What fear did Douglas have?", a:["Dogs","Water","Flying"], ans:"Water"}]},
  { chapter: "Lost Spring", qs:[
    {q:"Who is Saheb?", a:["Worker","Child","Teacher"], ans:"Child"}]}
];

let pos = -1, score = 0;
const board = document.getElementById("board");
const totalTiles = 30;
for (let i = 0; i < totalTiles; i++) {
  const div = document.createElement("div");
  div.className = "tile";
  div.innerText = i + 1;
  board.appendChild(div);
}

document.getElementById("roll-btn").onclick = () => {
  if (pos >= totalTiles - 1) return;
  const roll = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice").innerText = `You rolled: ${roll}`;
  pos += roll;
  if (pos >= totalTiles - 1) {
    pos = totalTiles - 1;
    highlight();
    endGame();
    return;
  }
  highlight();
  if (Math.random() < 0.6) askQuestion();
};

function highlight() {
  board.querySelectorAll(".tile").forEach(t => t.style.background="white");
  board.children[pos].style.background = "#ffb347";
}

const popup = document.getElementById("question-popup");
function askQuestion() {
  const ch = chapters[Math.floor(Math.random() * chapters.length)];
  const q = ch.qs[Math.floor(Math.random() * ch.qs.length)];
  popup.querySelector("#question-text").innerText = q.q;
  const buttons = popup.querySelector("#answer-buttons");
  buttons.innerHTML = "";
  q.a.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => {
      if (opt === q.ans) {
        score += 10;
        alert("Correct! +10 points");
      } else {
        alert(`Wrong! Correct is: "${q.ans}"`);
      }
      popup.classList.add("hidden");
    };
    buttons.appendChild(btn);
  });
  popup.classList.remove("hidden");
}

function endGame() {
  document.getElementById("result-text").innerText = `Game Over! Your score: ${score}`;
  document.getElementById("result-popup").classList.remove("hidden");
}

document.getElementById("again-btn").onclick = () => location.reload();
