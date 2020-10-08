{
  // Show difficulties

  let start = document.getElementById("start_game");
  let options = document.getElementById("difficulties");

  start.onclick = function () {
    options.style.display = "flex";
    this.remove();
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // COLORS

  let easy_colors = [
    "#F44174",
    "#F44174",
    "#FA7E61",
    "#FA7E61",
    "#4C1E4F",
    "#4C1E4F",
    "#758BFD",
    "#758BFD",
  ];
  let medium_colors = ["#2D3142", "#2D3142", "#CCA43B", "#CCA43B"].concat(
    easy_colors
  );

  let hard_colors = [
    "#65743A",
    "#65743A",
    "#EFDD8D",
    "#EFDD8D",
    "#A3B18A",
    "#A3B18A",
    "#A30015",
    "#A30015",
  ].concat(medium_colors);

  let color_setter = function (colors_list) {
    let list_cards = document.querySelectorAll(".front_card");
    for (let i = 0; i < list_cards.length; i++) {
      let rand_color =
        colors_list[Math.floor(Math.random() * colors_list.length)];
      let index = colors_list.indexOf(rand_color);

      list_cards[i].style.backgroundColor = rand_color;
      list_cards[i].parentNode.setAttribute("id", rand_color);
      console.log(list_cards[i].parentNode);

      if (index > -1) {
        colors_list.splice(index, 1);
      }
    }
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Create board

  let board_creator = function (n) {
    let board = document.getElementById("main");
    for (let i = 0; i < n; i++) {
      let card = document.createElement("div");
      let back = document.createElement("div");
      let front = document.createElement("div");

      card.setAttribute("class", "card");
      back.setAttribute("class", "back_card");
      front.setAttribute("class", "front_card");
      card.appendChild(front);
      card.appendChild(back);
      board.appendChild(card);
    }
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // FLIP CARDS

  let hasFlipped = false;
  let firstCard = 0;
  let secondCard = 0;
  let lockBoard = false;
  let counter = 0;
  let tries = document.getElementById("tries");
  tries.innerHTML = `Tries: ${counter}`;

  let flipCard = function () {
    if (lockBoard) return;

    if (this === firstCard) return;
    this.classList.add("flip");

    if (!hasFlipped) {
      hasFlipped = true;
      firstCard = this;
    } else {
      hasFlipped = false;
      secondCard = this;

      if (firstCard.id == secondCard.id) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
      } else {
        lockBoard = true;
        setTimeout(() => {
          firstCard.classList.remove("flip");
          secondCard.classList.remove("flip");
          lockBoard = false;
        }, 1000);
        counter += 1;
        tries.innerHTML = `Tries: ${counter}`;
      }
    }
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // DELETE BUTTONS

  let delete_buttons = function () {
    document.getElementById("difficulties").innerHTML = "";
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // CREATE BOARD FOR DIFFICULTY CHOSEN

  let easy = document.getElementById("one");
  let medium = document.getElementById("two");
  let hard = document.getElementById("three");

  easy.onclick = function () {
    document.getElementById("reveal").style.visibility = "visible";
    document.getElementById("new_game").style.visibility = "visible";
    document.getElementById("tries").style.visibility = "visible";

    board_creator(8);
    delete_buttons();
    color_setter(easy_colors);
    let cards = document.querySelectorAll(".card");
    cards.forEach((card) => card.addEventListener("click", flipCard));
  };

  medium.onclick = function () {
    document.getElementById("reveal").style.visibility = "visible";
    document.getElementById("new_game").style.visibility = "visible";
    document.getElementById("tries").style.visibility = "visible";

    board_creator(12);
    delete_buttons();
    color_setter(medium_colors);
    let cards = document.querySelectorAll(".card");
    cards.forEach((card) => card.addEventListener("click", flipCard));
    document.getElementById("tries").style.visibility = "visible";
  };

  hard.onclick = function () {
    document.getElementById("reveal").style.visibility = "visible";
    document.getElementById("new_game").style.visibility = "visible";
    document.getElementById("tries").style.visibility = "visible";

    board_creator(20);
    delete_buttons();
    color_setter(hard_colors);
    let cards = document.querySelectorAll(".card");
    cards.forEach((card) => card.addEventListener("click", flipCard));
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // REVEAL BUTTON
  let reveal_button = document.getElementById("reveal");

  reveal_button.onclick = function () {
    let cards = document.querySelectorAll(".card");
    let loop = cards.length;
    let i = 0;

    function f() {
      cards[i].classList.add("flip");
      i++;
      if (i < loop) {
        setTimeout(f, 200);
      }
    }
    setTimeout(f, 200);
  };
}
