




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
  updateBar();
});

loanInput.addEventListener("input", () => {
  let val = Number(loanInput.value);
  const min = Number(loanSlider.min);
  const max = Number(loanSlider.max);

  if (val < min) val = min;
  if (val > max) val = max;

  loanSlider.value = val;
  updateBar();
});

creditSlider.addEventListener("input", (e) => {
  creditLength = e.target.value;
  creditInput.value = creditSlider.value;
  handleSlider();
  updateBar();
});

creditInput.addEventListener("input", () => {
  let val = Number(creditInput.value);
  const min = Number(creditSlider.min);
  const max = Number(creditSlider.max);

  if (val < min) val = min;
  if (val > max) val = max;

  creditSlider.value = val;
  updateBar();
});

const toggle = document.getElementById("emiToggle");
const toggleText = document.getElementById("toggleText");
// const value1=document.querySelector("[value1]")
toggle.addEventListener("change", () => {
  toggleText.textContent = toggle.checked ? "YES" : "NO";
  updateBar();
});

function updateBar() {
  const loan = parseInt(loanInput.value) || 0;
  const credit = parseInt(creditInput.value) || 0;
  const total = loan + credit;

  if (toggle.checked) {
    valueBar1.innerText = "₹  " + total;
    valueBar2.innerText = "₹ " + (total * 0.7).toFixed(2);
    valueBar3.innerText = "₹ " + total;
    valueBar4.innerText = "₹ " + (total * 0.7).toFixed(2);

    valueBar5.innerText = "₹ " + (total - total * 0.7).toFixed(2);
    const bHeight = (document.getElementById("bar").style.height =
      total / 100000 + "px");
    const b1Height = (document.getElementById("bar1").style.height =
      (total * 0.7) / 100000 + "px");
  } else {
    valueBar1.innerText = "₹  " + total;
    valueBar2.innerText = "₹  " + (total * 0.65).toFixed(2);
    valueBar3.innerText = "₹  " + total;
    valueBar4.innerText = "₹  " + (total * 0.65).toFixed(2);

    valueBar5.innerText = "₹  " + (total - total * 0.65).toFixed(2);
    const bHeight = (document.getElementById("bar").style.height =
      total / 100000 + "px");
    const b1Height = (document.getElementById("bar1").style.height =
      (total * 0.65) / 100000 + "px");
  }
}

function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

const faqItems = document.querySelectorAll(".faq_item");
const FfaqItems = document.querySelectorAll(".F_faq_item");
FfaqItems.forEach((item) => {
  const question = item.querySelector(".question");
  const answer1 = item.querySelector(".answer1");
  const btn = item.querySelector(".faq_btn");

  question.addEventListener("click", () => {
    const isOpen = answer1.style.display === "block";

    document
      .querySelectorAll(".answer1")
      .forEach((a) => (a.style.display = "none"));
    document.querySelectorAll(".faq_btn").forEach((b) => (b.textContent = "+"));

    if (!isOpen) {
      answer1.style.display = "block";
      btn.textContent = "−";
    } else {
      answer1.style.display = "none";
      btn.textContent = "+";
    }
  });
});




const FfaqItems2 = document.querySelectorAll(".F_faq_item2");
FfaqItems2.forEach((item) => {
  const question = item.querySelector(".question");
  const answer1 = item.querySelector(".answer1");
  const btn = item.querySelector(".faq_btn");

  question.addEventListener("click", () => {
    const isOpen = answer1.style.display === "block";

    document
      .querySelectorAll(".answer1")
      .forEach((a) => (a.style.display = "none"));
    document.querySelectorAll(".faq_btn").forEach((b) => (b.textContent = "+"));

    if (!isOpen) {
      answer1.style.display = "block";
      btn.textContent = "−";
    } else {
      answer1.style.display = "none";
      btn.textContent = "+";
    }
  });
});




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


const popupForm = document.getElementById("popup-form");

popupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = popupForm.querySelector("input[name='name']").value.trim();
  const phone = popupForm.querySelector("input[name='phone']").value.trim();
  const email = popupForm.querySelector("input[name='email']").value.trim();

  if (!name || !phone || !email) {
    alert("Please fill in all fields.");
    return;
  }

  db.collection("formSubmissions")
    .add({
      name: name,
      phone: phone,
      email: email,
      timestamp: new Date(),
    })
    .then(() => {
      
      closeModal(); 
      popupForm.reset();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
      alert("Something went wrong.");
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

const form1 = document.getElementById("form1");
const home1 = document.getElementById("home");
const overlay = document.querySelector(".overlay");

const wrapper = document.getElementById("wrapper");
window.onload = () => {
  setTimeout(() => {
    form1.style.display = "flex";
    overlay.classList.add("overlayActive");


    wrapper.style.overflow = "hidden";
    wrapper.classList.add("blurred");
  }, 5000);
}

const closeModal = () => {
  form1.style.display = "none";
  overlay.classList.remove("overlayActive");
  // home1.classList.remove("blurred");
  wrapper.style.overflowY = "auto";
  wrapper.classList.remove("blurred");
};


const clientNo = document.getElementById("clientNo");
const client = 15000;

const loanNo = document.getElementById("loanNo");
const loan = 23000;

const teamNo = document.getElementById("teamNo");
const team = 100;

const statesNo = document.getElementById("statesNo");
const states = 15;

let i = 0; 
let j = 0; 
let k = 0; 
let l = 0; 

const step = 150;
const step1 = 250;

  const interval = setInterval(() => {
    i += step;
    if (i >= client) {
      i = client;
      clearInterval(interval);
    }
    clientNo.innerText = i.toLocaleString() + " +";
  }, 25);

  const interval2 = setInterval(() => {
    j += step1;
    if (j >= loan) {
      j = loan;
      clearInterval(interval2);
    }
    loanNo.innerText = j.toLocaleString() + " +";
  }, 25);

  const interval3 = setInterval(() => {
    k += 5; 
    if (k >= team) {
      k = team;
      clearInterval(interval3);
    }
    teamNo.innerText = k.toLocaleString() + " +";
  }, 30);

  const interval4 = setInterval(() => {
    l += 1; 
    if (l >= states) {
      l = states;
      clearInterval(interval4);
    }
    statesNo.innerText = l.toLocaleString() + " +";
  }, 80); 


const all = document.querySelectorAll(".b_card");
const loanSettlement = document.querySelectorAll(".loanSettlement");
const debtManagement = document.querySelectorAll(".debtManagement");
const Financial = document.querySelectorAll(".Financial");
const creditScore = document.querySelectorAll(".creditScore");



function showOnly(categoryCards) {
  all.forEach((card) => {
    card.classList.remove("activeHe"); 
    card.classList.add("NoactiveHe"); 
  });

  categoryCards.forEach((card) => {
    card.classList.remove("NoactiveHe"); 
    card.classList.add("activeHe"); 
  });
}


function reset() {
  all.forEach((card) => {
    card.classList.remove("NoactiveHe");
    card.classList.add("activeHe");
  });
}

function category1() {
  reset(); 
}

function category2() {
  showOnly(loanSettlement);
}

function category3() {
  showOnly(debtManagement);
}

function category4() {
  showOnly(creditScore);
}

function category5() {
  showOnly(Financial);
}


const first = document.getElementById("B_main");
 const second = document.getElementById("B_second");




function openFirst() {
  first.classList.remove("activeHe", "activeHogya");
  first.classList.add("NoactiveHe");

  second.classList.remove("NoactiveHe");
  second.classList.add("activeHe");
}

function doSOmething() {
  first.classList.remove("NoactiveHe");
  first.classList.add("activeHogya");

  second.classList.remove("activeHe");
  second.classList.add("NoactiveHe");
}
