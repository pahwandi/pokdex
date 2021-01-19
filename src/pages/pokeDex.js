import React, { useContext } from "react";
import { Row, Column, Card } from "components/ui";
import { Context } from "data/store";
import storage from "helpers/storage";

function PokeDex() {
  const [state, dispatch] = useContext(Context);
  const {pokeDex} = state.pokemonReducer;

  const releasePoke = (index) => {
    let r = window.confirm("Yakin ingin melepaskan ?");
    if (r) {
      let payload = pokeDex.splice((index + 1), 1);
      console.log(payload)

      dispatch({ type: 'ADD_POKEMON',  payload });
      storage.set('pokedex', payload)
    }
  }

  return (
    <React.Fragment>
      <h1>Pokédex</h1>
      <Row>
        {pokeDex &&
          pokeDex.map((pokemon, index) => (
            <Column xs="6" sm="4" md="2" key={index}>
              <Card onClick={() => releasePoke(index)}>
                <img src={pokemon.image} alt={pokemon.name} />
                <div className="card-body">
                  <h3>{pokemon.as_name}</h3>
                  <h4>{pokemon.name}</h4>
                </div>
              </Card>
            </Column>
          ))
        }
        
        {!pokeDex &&
          <h4>Pokedex mu masih kosong T_T</h4>
        }
      </Row>
    </React.Fragment>
  );
}

export default PokeDex;