import { setQuizSettings, StartGame, startTimer } from "./questionLoader.js";


document.getElementById("submit-button").addEventListener("click", () => {
  const selectedQuestions = document.querySelector('input[name="questions"]:checked');
  const selectedTime = document.querySelector('input[name="time"]:checked');

  const questionsValue = selectedQuestions ? parseInt(selectedQuestions.value) : 10;
  const timeValue = selectedTime ? parseInt(selectedTime.value) : 60;

  setQuizSettings(questionsValue, timeValue);

  startTimer(timeValue)
  StartGame();
});

