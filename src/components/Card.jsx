import { motion } from "framer-motion";

function Card({ card, handleClick, flipped, matchedCards }) {
  return (
    <div
  onClick={() => handleClick(card)}
   className={`aspect-square
w-full
rounded-xl cursor-pointer
shadow-lg hover:scale-105
transition-all duration-300
flex items-center justify-center
${matchedCards.includes(card.img) && "ring-4 ring-green-400 scale-105"}
`}
 

>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        {/* Front Side */}
        <div className="absolute inset-0 bg-gray-400 rounded [backface-visibility:hidden]" />

        {/* Back Side (Image) */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <img
            src={card.img}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Card;
