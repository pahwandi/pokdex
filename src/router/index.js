import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ScrollToTop from "router/scrollToTop";
import PokeList from "pages/pokeList";
import PokeDex from "pages/pokeDex";
import PokeDetail from "pages/pokeDetail";
import NotFound from "pages/notFound";
import Layout from "layout";

function Router() {
  return (
    <BrowserRouter>
      <Layout>
		    <ScrollToTop />
        <Switch>
          <Route exact path="/" component={PokeList}/>
          <Route path="/pokedex" component={PokeDex}/>
          <Route path="/pokemon-detail/:name/:id" component={PokeDetail}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;