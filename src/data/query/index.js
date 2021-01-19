import gql from "graphql-tag";

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        url
        name
        image
      }
    }
  }
`;

export const GET_DETAIL_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      abilities {
        ability {
          name
        }
      }
      sprites {
        front_default
        back_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

export const GET_EVOLUTION = gql`
  query evolutionChain($id: String!) {
    evolutionChain(id: $id) {
      response
    }
  }
`;