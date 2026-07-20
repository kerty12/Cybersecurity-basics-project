/*
  quiz.js — grades the 5-question self-assessment on quiz.html
  Runs when the form is submitted: checks each answer, shows per-question
  feedback, and writes the overall score/pass-fail message. The reset
  button clears every input and feedback message back to its start state.
*/

// Wait for the page to finish loading before touching the DOM
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("quiz-form");
  const resetBtn = document.getElementById("reset-btn");
  const resultStatus = document.getElementById("result-status");
  const resultScore = document.getElementById("result-score");

  const TOTAL_QUESTIONS = 5;
  const PASS_PERCENT = 70;

  // Correct answers, referenced by each question's element id(s)
  const ANSWERS = {
    q1: "phishing",            // fill-in-the-blank (case-insensitive)
    q2: "b",                   // fingerprint = "something you are"
    q3: "c",                   // ransomware encrypts files for payment
    q4: "a",                   // length/passphrase beats complexity
    q5: ["q5a", "q5c", "q5d"], // correct checkboxes for the red-flags question
  };

  // Shows correct/incorrect text under a single question
  function showFeedback(id, isCorrect, correctText) {
    const el = document.getElementById(id);
    el.textContent = isCorrect
      ? "Correct!"
      : "Not quite — correct answer: " + correctText;
    el.classList.remove("correct", "incorrect");
    el.classList.add(isCorrect ? "correct" : "incorrect");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // this is a self-check quiz, not a real form post
    let score = 0;

    // Question 1: fill in the blank (trim + lowercase for a forgiving match)
    const q1Value = document.getElementById("q1-input").value.trim().toLowerCase();
    const q1Correct = q1Value === ANSWERS.q1;
    if (q1Correct) score++;
    showFeedback("q1-feedback", q1Correct, "phishing");

    // Question 2: single-choice radio buttons
    const q2Choice = form.querySelector('input[name="q2"]:checked');
    const q2Correct = !!q2Choice && q2Choice.value === ANSWERS.q2;
    if (q2Correct) score++;
    showFeedback("q2-feedback", q2Correct, "Something you are");

    // Question 3: single-choice radio buttons
    const q3Choice = form.querySelector('input[name="q3"]:checked');
    const q3Correct = !!q3Choice && q3Choice.value === ANSWERS.q3;
    if (q3Correct) score++;
    showFeedback("q3-feedback", q3Correct, "Ransomware");

    // Question 4: single-choice radio buttons
    const q4Choice = form.querySelector('input[name="q4"]:checked');
    const q4Correct = !!q4Choice && q4Choice.value === ANSWERS.q4;
    if (q4Correct) score++;
    showFeedback("q4-feedback", q4Correct, "Greater length, like a multi-word passphrase");

    // Question 5: multi-select — every correct box must be checked AND
    // no incorrect box may be checked
    const q5Ids = ["q5a", "q5b", "q5c", "q5d"];
    const q5Checked = q5Ids.filter((id) => document.getElementById(id).checked);
    const q5Correct =
      q5Checked.length === ANSWERS.q5.length &&
      q5Checked.every((id) => ANSWERS.q5.includes(id));
    if (q5Correct) score++;
    showFeedback(
      "q5-feedback",
      q5Correct,
      "Mismatched sender address, urgent language, and requests to bypass verification"
    );

    // Update the overall results box
    const percent = Math.round((score / TOTAL_QUESTIONS) * 100);
    const passed = percent >= PASS_PERCENT;
    resultStatus.textContent = passed ? "Pass" : "Try again";
    resultStatus.style.color = passed ? "#1a7f37" : "#c02b2b";
    resultScore.textContent = "You scored " + score + " out of " + TOTAL_QUESTIONS + " (" + percent + "%)";

    // Scroll the results box into view so the score is visible immediately
    document.getElementById("quiz-results").scrollIntoView({ behavior: "smooth" });
  });

  // Reset button: clear every input and feedback message
  resetBtn.addEventListener("click", function () {
    form.reset();
    document.querySelectorAll(".q-feedback").forEach((el) => {
      el.textContent = "";
      el.classList.remove("correct", "incorrect");
    });
    resultStatus.textContent = "\u2014"; // em dash, matches the initial state
    resultStatus.style.color = "";
    resultScore.textContent = "You scored 0 out of " + TOTAL_QUESTIONS;
  });
});
