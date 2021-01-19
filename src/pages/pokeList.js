import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Row, Column, Card, Header } from "components/ui";
import { GET_POKEMONS } from "data/query";
import { Context } from "data/store";
import backpack from 'assets/backpack.png';

const gqlVariables = {
  limit: 20,
  offset: 1,
};

function PokeList() {
  const history = useHistory();
  const [state, dispatch] = useContext(Context);
  const {pokeDex} = state.pokemonReducer;
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  const countPoke = (id) => {
    return pokeDex.filter(obj => obj.id === id).length;
  }

  const onDataUpdate = () => {
    if(!loading && !error) { 
      dispatch({
        type: 'GET_POKEMONS',
        payload: data.pokemons.results
      })
    }

    return () => { }
  }
  useEffect(onDataUpdate, [data, error, loading])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <React.Fragment>
      <Header>
        <h1>Pokémons</h1>
        <h1>
          <img
            onClick={() => history.push('/pokedex')}
            src={backpack}
            width={30}
            height={30}
            alt="pokedex"
          />
        </h1>
      </Header>
      <Row>
        {data &&
          data.pokemons &&
          data.pokemons.results.map((pokemon, index) => (
            <Column xs="6" sm="4" md="2" key={index}>
              <Card onClick={() => history.push('/pokemon-detail/' + pokemon.name + '/' + pokemon.id)}>
                <img src={pokemon.image} alt={pokemon.name} />
                <div className="card-body">
                  <h3>{pokemon.name}</h3>
                  <p>{countPoke(pokemon.id)} on your pokedex</p>
                </div>
                <br />
              </Card>
            </Column>
          ))}
      </Row>
    </React.Fragment>
  );
}

export default PokeList;