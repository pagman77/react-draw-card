import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import Error from './Error'

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

function Deck() {

  const [deck, setDeck] = useState({ deck: null, isLoading: true, error: null });

  useEffect(function getDeck() {
    (async function callDeckAPI() {
      const res = await axios.get(`${API_BASE_URL}/new`);
      setDeck({ isLoading: false, deck: res.data });
    })();
  }, []);

  async function getCard() {
    const deckId = deck.deck.deck_id;
    const res = await axios.get(
      `${API_BASE_URL}/${deckId}/draw/?count=1`);

    if (res.data.error) setDeck({...deck, error: true})

    setDeck({ ...deck, deck: res.data });
  }



  if (deck.isLoading) return <div>...loading</div>;

  return (

    <div>
      {deck.error && <Error error={deck.error}/>}
      <button onClick={getCard}>Draw a card</button>
      {deck.deck?.cards
        &&
        <Card card={deck.deck.cards[0]} />
      }
    </div>
  );
}

export default Deck;