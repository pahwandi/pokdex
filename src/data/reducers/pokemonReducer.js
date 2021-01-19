import storage from "helpers/storage";

const pokedex = storage.get("pokedex", []);

const initState = {
  pokeList: [],
  pokeDex: pokedex.length > 0 ? pokedex : []
}

const pokemonReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokeList: action.payload
      };
    case "ADD_POKEMON":
      return {
        ...state,
        pokeDex: action.payload
      }
    case "RELEASE_POKEMON":
      return {
        ...state,
        pokeDex: action.payload
      };
    default: return state
  }
}

export default pokemonReducer


