import React from 'react';
import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import './App.css';

// Random Funktion
const random = (min, max) => {
    if (max == null) {
        max = min;
        min = 0;
    }
    if (min > max) {
        var tmp = min;
        min = max;
        max = tmp;
    }
    return min + (max - min) * Math.random();
}

const getFixAmountOfDataById = (type, number) => {

}

const getSixRandomCharacters = gql`{
    characters(page: 1,filter: { }) {
    info {
      count,
      pages
      next,
      prev,
    }
    results {
      id,
      name,
      status,
      species,
      type,
      gender,
      image,
      created,
      episode{episode, name},
      location{
        name,
        dimension
      }
    }
  }
}`

const App = () => {
    return (
        <>
            <nav>

            </nav>
            <div className={"container"}>
                <div className={"row"}>
                    <Query query={getSixRandomCharacters}>
                        {({loading, error, data}) => {
                            if (loading) return <p>Relax, it's worth the wait...</p>
                            if (error) return <p>Looks like we've got a problem...</p>


                            return data.characters.results.map((character) =>
                                <div className={"col col-lg-6"} key={character.id}>
                                    <div className={"card rounded-lg border-0 mb-4 text-secondary"}>
                                        <div className={"row no-gutters"}>
                                            <div className={"col-5"}>
                                                <figure className={"card-img-top mb-0"}>
                                                    <img className={"w-100"} src={character.image} alt={`${character.name} - ${character.species}`}/>
                                                </figure>
                                            </div>
                                            <div className={"col-7"}>
                                                <div className={"card-body h-100 d-flex flex-column justify-content-center"}>
                                                    <p className={"small text-gray mb-0"}>{character.status}</p>
                                                    <h5 className={"font-weight-bolder text-primary mb-0"}>{character.name}</h5>
                                                    <p>{character.species}, {character.gender}</p>
                                                    <p className={"mb-0 small"}><span className={"font-weight-bold"}>Last Seen: </span>
                                                        {character.episode.map((episode, index, arr) => {
                                                            if (arr.length - 1 === index) return episode.name
                                                        })}
                                                    </p>
                                                    <p className={"mb-0 small"}><span className={"font-weight-bold"}>Location:</span> {character.location.name}, {character.location.dimension}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        }}
                    </Query>
                </div>
            </div>
        </>
    );
}

export default App;
