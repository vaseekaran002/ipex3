document.addEventListener("DOMContentLoaded", () => {
  const cardArray = [
    {
      name: "ironman",
      img: "./assets/ironman.png",
    },
    {
      name: "ironman",
      img: "./assets/ironman.png",
    },
    {
      name: "captain",
      img: "./assets/captain.png",
    },
    {
      name: "captain",
      img: "./assets/captain.png",
    },
    {
      name: "blackwidow",
      img: "./assets/blackwidow.png",
    },
    {
      name: "blackwidow",
      img: "./assets/blackwidow.png",
    },
    {
      name: "hulk",
      img: "./assets/hulk.png",
    },
    {
      name: "hulk",
      img: "./assets/hulk.png",
    },
    {
      name: "hawkeye",
      img: "./assets/hawkeye.png",
    },
    {
      name: "hawkeye",
      img: "./assets/hawkeye.png",
    },
    {
      name: "thor",
      img: "./assets/thor.png",
    },
    {
      name: "thor",
      img: "./assets/thor.png",
    },
  ];

  const grid = document.querySelector(".grid");
  var levels = document.querySelector("#level");
  var res = document.querySelector(".result");
  var cardChosen = [];
  var cardChosenId = [];
  var carsdWon = [];
  var score = 0;
  var counter = 0;
  const result = document.querySelector("#result");
  const timer = document.getElementById("time");

  function checkMatch() {
    var cards = document.querySelectorAll("img");
    var option1 = cardChosenId[0];
    var option2 = cardChosenId[1];
    if (cardChosen[0] == cardChosen[1]) {
      cards[option1].setAttribute("src", "assets/white.png");
      cards[option2].setAttribute("src", "assets/white.png");
      carsdWon.push(cardChosen);
      score += 1;
    } else {
      cards[option1].setAttribute("src", "assets/blank.png");
      cards[option2].setAttribute("src", "assets/blank.png");
    }
    cardChosen = [];
    cardChosenId = [];
    result.textContent = score;
  }

  function flipCard() {
    var cardId = this.getAttribute("data-id");
    cardChosen.push(cardArray[cardId].name);
    cardChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardChosen.length == 2) {
      setTimeout(checkMatch, 500);
    }
  }

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement("img");
      card.setAttribute("src", "assets/blank.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);

      grid.appendChild(card);
    }
  }

  function resultChecker(time, scr) {
    counter = setTimeout(() => {
      if (score == scr) {
        res.textContent = "you won!";
        timer.innerHTML = "00 : 00";
        clearInterval(inter);
        if (lvl == "level1") {
          setTimeout(lvl2(), 1000);
        } else if (lvl == "level2") {
          setTimeout(lvl3(), 1000);
        }
      } else {
        var imgs = document.querySelectorAll("img");
        imgs.forEach((i) => {
          i.setAttribute("src", "assets/blank.png");
        });
        res.textContent = "yoy lost !";
        setTimeout(game(), 1000);
      }
    }, time);
  }

  function setTimer(time, scr, lvl) {
    let tottime = time * 60;
    var inter = setInterval(function () {
      if (score != scr) {
        const min = Math.floor(tottime / 60);
        var sec = tottime % 60;
        timer.innerHTML = `${min} : ${sec}`;
        if (min == 0 && sec == 0) {
          clearInterval(inter);
        }
        tottime--;
      } else {
        clearTimeout(counter);
        if (score == scr) {
          clearInterval(inter);
          res.textContent = "you won!";
          timer.innerHTML = "00 : 00";
          if (lvl == "level1") {
            setTimeout(lvl2(), 1000);
          } else if (lvl == "level2") {
            setTimeout(lvl3(), 1000);
          }
        } else {
          var imgs = document.querySelectorAll("img");
          imgs.forEach((i) => {
            i.setAttribute("src", "assets/blank.png");
          });
          res.textContent = "yoy lost !";
          setTimeout(game(), 1000);
        }
      }
    }, 1000);
  }

  var won = 0;

  function game() {
    cardArray.sort(() => 0.5 - Math.random());
    levels.textContent = "level 1";
    createBoard();
    setTimer(1, 6, "level1");

    resultChecker(60000, 6);
  }

  function lvl2() {
    res.textContent = "";
    cardArray.sort(() => 0.5 - Math.random());
    levels.textContent = "level 2";
    document.querySelectorAll("img").forEach((i) => {
      i.setAttribute("src", "assets/blank.png");
      i.addEventListener("click", flipCard);
    });
    setTimer(0.5, 12, "level2");
    resultChecker(30000, 12);
  }

  function lvl3() {
    res.textContent = "";
    cardArray.sort(() => 0.5 - Math.random());
    levels.textContent = "level 3";
    document.querySelectorAll("img").forEach((i) => {
      i.setAttribute("src", "assets/blank.png");
      i.addEventListener("click", flipCard);
    });
    setTimer(0.5, 18);
    resultChecker(30000, 12);
  }
  game();
});
