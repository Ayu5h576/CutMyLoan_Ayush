const valueBar1 = document.getElementById("valueBar1");
const valueBar2 = document.getElementById("valueBar2");
const valueBar3 = document.getElementById("valueBar3");
const valueBar4 = document.getElementById("valueBar4");
const valueBar5 = document.getElementById("valueBar5");
const loanInput = document.getElementById("loanInput");
const creditInput = document.getElementById("creditInput");
const loanSlider = document.querySelector("[loanAmount-slider ]");
const creditSlider = document.querySelector("[creditDebt-slider]");

let amountLength = 100000;
let creditLength = 100000;

function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}


function handleSlider() {
  loanSlider.value = amountLength;
  creditSlider.value = creditLength;
  const min = loanSlider.min || creditSlider.min;
  const max = loanSlider.max || creditSlider.max;

  loanSlider.style.backgroundSize =
    ((amountLength - min) * 100) / (max - min) + "% 100%";
  creditSlider.style.backgroundSize =
    ((creditLength - min) * 100) / (max - min) + "% 100%";
}

handleSlider();

loanSlider.addEventListener("input", (e) => {
  amountLength = e.target.value;
  loanInput.value = loanSlider.value;

  handleSlider();
});

loanInput.addEventListener("input", () => {
  let val = Number(loanInput.value);
  const min = Number(loanSlider.min);
  const max = Number(loanSlider.max);

  if (val < min) val = min;
  if (val > max) val = max;

  loanSlider.value = val;
});

creditSlider.addEventListener("input", (e) => {
  creditLength = e.target.value;
  creditInput.value = creditSlider.value;
  handleSlider();
});

creditInput.addEventListener("input", () => {
  let val = Number(creditInput.value);
  const min = Number(creditSlider.min);
  const max = Number(creditSlider.max);

  if (val < min) val = min;
  if (val > max) val = max;

  creditSlider.value = val;
});

const toggle = document.getElementById("emiToggle");
const toggleText = document.getElementById("toggleText");
// const value1=document.querySelector("[value1]")
toggle.addEventListener("change", () => {
  toggleText.textContent = toggle.checked ? "YES" : "NO";
});

function updateBar() {
  const loan = parseInt(loanInput.value) || 0;
  const credit = parseInt(creditInput.value) || 0;
  const total = loan + credit;
  valueBar1.innerText = total;
  valueBar2.innerText = (total * 0.7).toFixed(2);
  valueBar3.innerText = total;
  valueBar4.innerText = (total * 0.7).toFixed(2);

  valueBar5.innerText = (total - total * 0.7).toFixed(2);
  const bHeight = (document.getElementById("bar").style.height =
    total / 120000 + "px");
  const b1Height = (document.getElementById("bar1").style.height =
    (total * 0.7) / 120000 + "px");
}

const faqItems = document.querySelectorAll(".faq_item");

faqItems.forEach((item) => {
  const question = item.querySelector(".question");
  const answer = item.querySelector(".answer");
  const btn = item.querySelector(".faq_btn");

  question.addEventListener("click", () => {
    const isOpen = answer.style.display === "block";

    document
      .querySelectorAll(".answer")
      .forEach((a) => (a.style.display = "none"));
    document.querySelectorAll(".faq_btn").forEach((b) => (b.textContent = "+"));

    if (!isOpen) {
      answer.style.display = "block";
      btn.textContent = "−";
    } else {
      answer.style.display = "none";
      btn.textContent = "+";
    }
  });
});



const button1 = document.getElementById("c_button1");
const button2 = document.getElementById("c_button2");
const card = document.getElementById("c_card");
const form = document.getElementById("c_form");

window.onload = () => {
  card.classList.add("active2");
  button1.classList.add("active3");
};

button1.addEventListener("click", () => {
  card.classList.add("active2");
  form.classList.remove("active2");

  button1.classList.add("active3");
  button2.classList.remove("active3");
});

button2.addEventListener("click", () => {
  form.classList.add("active2");
  card.classList.remove("active2");

  button2.classList.add("active3");
  button1.classList.remove("active3");
});