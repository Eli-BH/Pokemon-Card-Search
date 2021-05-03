import { useState } from "react";
import axios from "axios";
import ReactCardFlip from "react-card-flip";

import SearchBar from "./components/SearchBar";
import Header from "./images/Pokemon-Card-Search.png";
import "./styles/CardStyles.css";
import "./styles/App.css";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [move, setMove] = useState(null);
  const [ability, setAbility] = useState(null);
  const [isFlipped, setIsFlipped] = useState(true);

  const submitSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchText.trim().toLowerCase()}`
      );

      //call for the move data from the api / different from general info
      const resMove = await axios.get(res.data.moves[0].move.url);

      //set the pokemon move data to state
      setMove(resMove.data);

      //call for the pokemon ability using the response from
      //the pokemon info
      const resAbility = await axios.get(res.data.abilities[0].ability.url);

      //get the pokemon ability which is on a alt api query
      setAbility(resAbility.data);

      //get pokemon main info
      setPokemon(res.data);
    } catch (error) {
      setPokemon(null);
      alert("Not found");
    }
  };

  return (
    <div className="App">
      <img src={Header} alt="Pokemon Card Search" id="header" />
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        submitSearch={submitSearch}
      />

      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div
          className={`card-container`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={`card-face background-${pokemon?.types[0].type.name}`}
          >
            <div className="card-header">
              <h2 className="pokemon-name">{pokemon?.name}</h2>
            </div>

            <div className="card-img-container">
              <div className="card-img">
                <img
                  src={
                    pokemon?.sprites?.other["official-artwork"].front_default
                  }
                  alt={pokemon?.name}
                />
              </div>

              <div className="pokemon-measurements">
                <p>Height:{Math.floor(pokemon?.height * 3.937)} in</p>
                <p>Weight: {Math.floor(pokemon?.weight * 0.220462)} lbs</p>
              </div>
            </div>

            <div className="card-content">
              <div className="stats">
                <div className="stats-left">
                  <p>
                    Type:
                    <strong> {pokemon?.types[0].type.name}</strong>
                    <span>
                      {pokemon?.types?.length > 1 &&
                        `|${pokemon?.types[1].type.name}`}
                    </span>
                  </p>
                  <p>
                    Base xp:
                    <strong>
                      {pokemon?.base_experience || "not yet known"}
                    </strong>
                  </p>
                  <p>
                    Base Hp: <strong>{pokemon?.stats[0]?.base_stat}</strong>
                  </p>
                  <p>
                    Base Attack: <strong>{pokemon?.stats[1].base_stat}</strong>
                  </p>
                </div>

                <div className="stats-right">
                  <p>
                    Base Defence: <strong>{pokemon?.stats[2].base_stat}</strong>
                  </p>
                  <p>
                    Base Special ATK:{" "}
                    <strong>{pokemon?.stats[3].base_stat}</strong>
                  </p>
                  <p>
                    Base Special DEF:{" "}
                    <strong>{pokemon?.stats[4].base_stat}</strong>
                  </p>
                  <p>
                    Base Speed: <strong>{pokemon?.stats[5].base_stat}</strong>
                  </p>
                </div>
              </div>

              <div className="moves">
                <p>
                  Move: <strong>{move?.name}</strong> -{" "}
                  {move?.effect_entries[0].effect}
                </p>

                <p className="abilities">
                  Ability: <strong>{ability?.name}</strong> -
                  {
                    ability?.effect_entries.filter(
                      (item) => item.language.name === "en"
                    )[0].effect
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card-container-back"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="card-back">
            <div className="card-content-back"></div>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default App;
