import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { GET_EVOLUTION } from 'data/query';
import styled from '@emotion/styled';

function Evolution({id}) {
  const [evo, setEvo] = useState([]);
  
  const { loading, error, data } = useQuery(GET_EVOLUTION, {
    variables: { id },
  });

  const onDataUpdate = () => {
    let chain = data.evolutionChain.response.chain;
    let tmpEvo = [];

    if(!loading && !error) {
      if(!!chain.species.name) {
        tmpEvo.push(chain.species.name)
      }
      if(!!chain.evolves_to[0] && !!chain.evolves_to[0].species.name) {
        tmpEvo.push(chain.evolves_to[0].species.name)
      }
      if(!!chain.evolves_to[0].evolves_to[0] && !!chain.evolves_to[0].evolves_to[0].species.name) {
        tmpEvo.push(chain.evolves_to[0].species.name)
      }
      setEvo(tmpEvo)
    }

    return () => {
      
    }
  }
  useEffect(onDataUpdate, [data, error, loading])
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <React.Fragment>
      <EvoList center>
        {evo.map((val, i) =>
          <Evo key={i}>{val}</Evo>
        )}
      </EvoList>
    </React.Fragment>
  );
};

const EvoList = styled.div`
  display: inline-block;
`;

const Evo = styled.div`
  padding: 4px 24px;
  margin-bottom: 2rem;
  color: #01aefe;
  border: 1px solid #01aefe;
  border-radius: 6px;
  font-weight: 700;
  text-transform: uppercase;
  position: relative;
  &::after {
    content: ' ';
    width: 10px;
    height: 10px;
    border-right: 1px solid #01aefe;
    border-bottom: 1px solid #01aefe;
    position: absolute;
    bottom: -20px;
    right: calc(50% + -6px);
    transform: rotate(45deg);
  }
  &:last-child::after {
    display: none;
  }
`;

export default Evolution;