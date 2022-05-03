import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Error from "./Error";

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

/** App for generating Cards Game.
 *
 * Props: None
 *
 * State:
 * - deck:{deck , isLoading, error} keeps track of deck changes
 *
 * App -> Deck -> Card
 */

function Deck() {
  const [deckInfo, setDeckInfo] = useState({
    currCard: null,
    deckId: null,
    isLoading: true,
    error: null,
    shuffled: false,
  });

  // Runs after first render to get new deck
  useEffect(function getDeck() {
    (async function callDeckAPI() {
      const res = await axios.get(`${API_BASE_URL}/new`);
      setDeckInfo((prevDeck) => ({
        ...prevDeck,
        deckId: res.data.deck_id,
        isLoading: false,
        shuffled: true,
      }));
    })();
  }, []);

  // Shuffle cards and update state
  useEffect(
    function shuffleDeck() {
      if (deckInfo.deckId) {
        (async function callShuffleDeckAPI() {
          await axios.get(`${API_BASE_URL}/${deckInfo.deckId}/shuffle`);
        })();
      }
      setDeckInfo((prevDeck) => ({
        ...prevDeck,
        shuffled: true,
        isLoading: false,
      }));
    },
    [deckInfo.shuffled, deckInfo.deckId]
  );

  // Gets card from deck when 'Get card' button is clicked
  async function getCard() {
    const res = await axios.get(
      `${API_BASE_URL}/${deckInfo.deckId}/draw/?count=1`
    );

    if (res.data.error) {
      setDeckInfo((prevDeck) => ({ ...prevDeck, error: res.data.error }));
    } else {
      setDeckInfo((prevDeck) => ({ ...prevDeck, currCard: res.data.cards[0] }));
    }
  }

  // updates state when 'Shuffle' button is clicked
  function handleShuffle() {
    setDeckInfo((prevDeck) => ({
      ...prevDeck,
      isLoading: true,
      shuffled: false,
      currCard: null,
      error: null,
    }));
  }

  if (deckInfo.isLoading) return <div>...loading</div>;

  return (
    <div>
      {deckInfo.error && <Error error={deckInfo.error} />}
      <button className="btn btn-primary my-3" onClick={getCard}>
        Draw a card
      </button>
      <button className="btn btn-info mx-3 my-3" onClick={handleShuffle}>
        Shuffle
      </button>
      {deckInfo.currCard && <Card card={deckInfo.currCard} />}
    </div>
  );
}

export default Deck;
