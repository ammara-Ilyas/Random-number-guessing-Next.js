"use client";

import { useState } from "react";
import style from "./page.module.css";
export default function page() {
  const [guess, setGuess] = useState("");
  const [guessingArray, setGuessingArray] = useState([]);
  const [attempts, setAttempts] = useState(10);
  const [guessNo, setGuessNo] = useState(Math.floor(Math.random() * 100));
  const [message, setMessage] = useState("");
  const [gamePlay, setGamePlay] = useState(true);
  console.log(guessNo);
  const startGame = () => {
    setGamePlay(true);
    setAttempts(10);
    setGuessingArray([]);
  };
  const checkingGuessNo = () => {
    if (guess == guessNo) {
      setGamePlay(false);
      return setMessage("Congratulation,You win! ");
    } else if (guess > guessNo) {
      return setMessage("Your number is Too greater than guessing Number");
    } else if (guess < guessNo) {
      return setMessage("Your number is Too smaller than guessing Number");
    }
  };

  const checkAttempt = () => {
    if (attempts == 1) {
      setMessage("Oh no, you lost the game!  ");
      setGamePlay(false);
    }
  };
  const checkNum = () => {
    const parsedGuess = parseInt(guess);
    if (isNaN(parsedGuess)) {
      alert("Please enter a valid number between 1 and 100.");
      setMessage("");
    } else {
      if (parsedGuess > 100) {
        alert("The number should be smaller than 100");
        return setMessage("The number should be smaller than 100");
      } else if (parsedGuess < 0) {
        alert("The number should be greater than zero");
        return setMessage("The number should be greater than zero");
      } else {
        setGuessingArray((preArr) => [parsedGuess, ...preArr]);
        console.log(guessingArray);
        setAttempts(attempts - 1);
      }
    }
    console.log(typeof parsedGuess);
    setGuess("");
  };

  const submitGuessNo = (e) => {
    e.preventDefault();
    checkNum();

    setGuess("");
    checkingGuessNo();
    checkAttempt();
  };
  return (
    <div>
      <div className={`${style.container_ran}`}>
        <div className={`${style.heading}`}>
          <h1>Number Guessing Game</h1>
          <p>Guess the number between 1 and 100</p>
          <p>You have 10 attempts to guess the number</p>
        </div>
        <form action="" className={`${style.form}`} onSubmit={submitGuessNo}>
          <h1>Guess the Number</h1>
          <input
            type="text"
            className={`${style.inp}`}
            value={guess}
            onChange={gamePlay ? (e) => setGuess(e.target.value) : undefined}
          />
          <input type="submit" className={`${style.bttn}`} />
        </form>
        <div className={`${style.result}`}>
          <p>
            Previous guesses
            {`[ ${guessingArray} ]`}
            {/* [
            {guessingArray.map((guess, index) => (
              <span key={index}> {guess} </span>
            ))}
            ] */}
          </p>
          <p>Guesses remaining {attempts}</p>
          <div className={`${style.newGame}`}>
            <h2>{message}</h2>
            {gamePlay ? (
              ""
            ) : (
              <button className={`${style.newGame}`} onClick={startGame}>
                Start new Game
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
