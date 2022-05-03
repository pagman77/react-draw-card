import React from "react";

/** Card component that shows a card
 *
 * Props:
 * - card: {code, image, images, value, suit}
 *
 * State: none
 *
 * App -> Deck -> Card
 */

function Card({ card }) {
  return (
    <div>
      {card && (
        <div>
          <img src={card.image} alt={`${card.value} of ${card.suit}`} />
        </div>
      )}
    </div>
  );
}

export default Card;
