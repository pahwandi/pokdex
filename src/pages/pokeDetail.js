import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { useQuery } from "@apollo/react-hooks";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useHistory, useLocation } from "react-router-dom";
import { Header, Row, Column, Card, CardFooter, H3, Tags, Tag, Button } from "components/ui";
import { GET_DETAIL_POKEMON } from "data/query";
import 'react-tabs/style/react-tabs.css';
import Evolution from "components/evolution";
import { Context } from "data/store";
import backpack from 'assets/backpack.png';
import storage from "helpers/storage";

function PokeDetail() {
  const history = useHistory();
  const {pathname} = useLocation();
  const name = pathname.split('/')[2];
  const id = pathname.split('/')[3];
  const [state, dispatch] = useContext(Context);
  const {pokeList, pokeDex} = state.pokemonReducer;
  const [total, setTotal] = useState(0);
  const [sprites, setSprites] = useState({});
  const [moves, setMoves] = useState([]);
  const [type, setType] = useState([]);

  if(!pokeList.length) {
    history.replace('/');
  }

  const { loading, error, data } = useQuery(GET_DETAIL_POKEMON, {
    variables: { name },
  });

  const catchPoke = () => {
    let selected = pokeList.filter(obj => obj.id === Number(id));

    let items = [true, false];
    let res = items[Math.floor(Math.random() * items.length)];

    if(res) {
      let poke = prompt('Yeah, kamu berhasil');
      if(!!poke) {
        selected[0]['as_name'] = poke;
        let payload = [
          ...pokeDex,
          ...selected
        ]

        dispatch({ type: 'ADD_POKEMON',  payload });
        storage.set('pokedex', payload)
      }
    } else {
      alert('Ayo coba lagi!!')
    }
  }

  const onDataUpdate = () => {
    if(!loading && !error) {
      setSprites(data.pokemon.sprites);
      setMoves(data.pokemon.moves);

      let tmpType = [];
      data.pokemon.types.map(obj =>
        tmpType.push(obj.type.name)
      );
      setType(tmpType);      
    }

    return () => {
      
    }
  }
  useEffect(onDataUpdate, [data, error, loading])

  const onPokeListUpdate = () => {
    let selected = pokeDex.filter(obj => obj.id === Number(id));
    setTotal(selected.length)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onPokeListUpdate, [pokeDex])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <React.Fragment>
      <Header>
        <h1>Pokémon Detail</h1>
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
        <Column xs="12" sm="4">
          <Card>
            <Slider
              arrows={false}
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}                      
            > 
              {Object.keys(sprites).map((key, i) => 
                key !== '__typename'
                  ? (<div key={i}>                          
                      <img src={sprites[key]} alt={data.pokemon.name} style={{margin: '0 auto'}}/>
                    </div>)
                  : null
              )}
            </Slider>
            <CardFooter>
              <H3 style={{ marginTop: 0 }}>
                {data.pokemon.name}
              </H3>
              <p style={{ marginTop: 0 }}>{total} on your pokedex</p>

              <Button onClick={() => catchPoke()}>Catch</Button>
            </CardFooter>
          </Card>
        </Column>
        
        <Column xs="12" sm="8">
          <Card>
            <Tabs
              selectedTabClassName="tab-selected"
              selectedTabPanelClassName="panel-selected"
            >
              <TabList className="tab-list">
                <Tab>Moves</Tab>
                <Tab>Type</Tab>
                <Tab>Evolution</Tab>
              </TabList>

              <TabPanel >
                <Tags center>
                  {moves.map((val, i) =>
                    <Tag key={i}>{val.move.name}</Tag>
                  )}
                </Tags>
              </TabPanel>
              <TabPanel>
                <Tags center>
                  {type.map((val, i) =>
                    <Tag key={i}>{val}</Tag>
                  )}
                </Tags>
              </TabPanel>
              <TabPanel>
                <Evolution id={id} />
              </TabPanel>
            </Tabs>
          </Card>
        </Column>
      </Row>
      
    </React.Fragment>
  );
}

export default PokeDetail;