import React, {useState} from 'react';
import './App.css';
import {Route, Switch, Redirect, NavLink} from "react-router-dom";
import FilterableCharacterList from "./components/Characters/FilterableCharacterList";
import FilterableEpisodesList from "./components/FilterableEpisodesList/FilterableEpisodesList";
import FilterableLocationList from "./components/FilterableLocationList/FilterableLocationList";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
import EpisodeDetail from "./components/EpisodeDetail/EpisodeDetail";
import LocationDetail from "./components/LocationDetail/LocationDetail";


const App = () => {


    /*
    const [searchTerm, setSearchTerm] = useState("")

    const onSearch = (event) => {
        event.persist()
        setSearchTerm(event.target.value);
    }
    */

    return (
        <>
            <nav className={"navbar navbar-expand-lg navbar-fixed navbar-dark bg-dark px-0"}>
                <div className={"container-fluid"}>
                    <button className={"navbar-toggler"} type={"button"} data-toggle={"collapse"}
                            data-target={"#navigation"}>
                        <span className={"navbar-toggler-icon"}></span>
                    </button>

                    <div className={"collapse navbar-collapse"} id={"navigation"}>
                        <div className={"navbar-nav mr-auto"}>
                            <NavLink to={"/home"} className={"nav-link"} activeClassName={"active"}>
                                Home
                            </NavLink>
                            <NavLink to={"/episodes"} className={"nav-link"} activeClassName={"active"}>
                                Episodes
                            </NavLink>
                            <NavLink to={"/locations"} className={"nav-link"} activeClassName={"active"}>
                                Locations
                            </NavLink>
                        </div>
                        {/*
                            <div className={"search"}>
                                <input className={"form-control"} id={"search"} placeholder={"Suche"}
                                       onKeyUp={onSearch}/>
                            </div>
                        */}
                    </div>
                </div>
            </nav>


            <main className={"main my-5"}>

                    <Switch>
                        <Route path='/character/:id'>
                            <CharacterDetail />
                        </Route>
                        <Route path='/location/:id'>
                            <LocationDetail />
                        </Route>
                        <Route path='/episode/:id'>
                            <EpisodeDetail />
                        </Route>
                        {/*
                            <Route path='/episodes'>
                                <FilterableEpisodesList filter={`name: "${searchTerm}"`}/>
                            </Route>
                            <Route path='/locations'>
                            <FilterableLocationList filter={`name: "${searchTerm}"`} />
                            </Route>
                            <Route path='/home'>
                            <FilterableCharacterList filter={`name: "${searchTerm}"`}/>
                            </Route>
                        */}
                        <Route path='/episodes'>
                            <FilterableEpisodesList />
                        </Route>
                        <Route path='/locations'>
                            <FilterableLocationList />
                        </Route>
                        <Route path='/home'>
                            <FilterableCharacterList />
                        </Route>

                        <Route exact path=''>
                            <Redirect to="/home"/>
                        </Route>
                    </Switch>


            </main>

        </>
    );
}

export default App;
