import React, { useEffect, useState } from "react";
import rocket from "./assets/rocket.png";
import star from "./assets/star.png";
import dog from "./assets/dogFace.jpeg";
import icecream from "./assets/icecream.jpeg";
import football from "./assets/football.jpeg";
import apple from "./assets/apple.jpeg";
import Card from "./components/Card";

const images = [rocket, star, dog, icecream, football, apple];

const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  const handleClick = (card) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(card)) return;
    setFlippedCards((prev) => [...prev, card]);

    if (flippedCards.length === 1) {
      setMoves((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const mapped = images.map((img, index) => ({
      id: index,
      img: img,
    }));

    const pairedCards = [...mapped, ...mapped]

      .map((card, index) => ({
        ...card,
        id: index,
      }))

      .sort(() => Math.random() - 0.5);

    setCards(pairedCards);
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      if (first.img === second.img) {
        setMatchedCards((prev) => [...prev, first.img]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 800);
      }
    }
  }, [flippedCards]);

  return (
    <div className="min-h-screen flex flex-col  justify-center items-center bg-gradient-to-br from-slate-900 via-black to slate-800 text-white px-4  py-6">
      <h1
        className="text-3xl sm:text-4xl  font-extrabold text-center tracking-wider
drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
      >
        Find all Pairs!
      </h1>

      <h2
        className="mt-4 py-2 rounded-full
bg-white/10 backdrop-blur-md
text-white text-lg sm:text-xl font-semibold border border-white/20 shadow-lg"
      >
        Moves: {moves}
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-6   mt-8 max-w-xl w-full">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleClick={handleClick}
            matchedCards={matchedCards}
            flipped={
              flippedCards.some((c) => c.id === card.id) ||
              matchedCards.includes(card.img)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default App;
