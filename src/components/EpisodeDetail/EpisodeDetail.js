import React from 'react';
import {gql} from "apollo-boost";
import {Query} from "react-apollo";
import {useParams, useHistory} from 'react-router-dom';
import CharacterCard from "../Characters/CharacterCard";

const GetEpisode = (id) => gql`{
    episode(id: ${id}) {
        id,
        name,
        air_date,
        episode,
        characters {
          id,
          name,
          image,
          species,
          status,
          episode {
            id,
            name
          },
          location {
            name,
            dimension,
            id
          }
        }
    }
}`

const EpisodeDetail = () => {

    const id = useParams().id;
    const history = useHistory();



    return (
        <>
            <Query query={GetEpisode(id)}>
                {({loading, error, data}) => {

                    if (loading) return <p>Collecting all Character Informations...</p>
                    if (error) return <p>Looks like we've got a problem...</p>

                    let e = data.episode

                    return (
                        <>
                            <div className={"container mb-5"}>
                                <div className={"col-12 col-lg-8"}>
                                    <span
                                        className={`small text-uppercase text-success`}>{e.air_date}
                                    </span>
                                    <h1 className={"font-weight-black text-primary text-uppercase mt-2 mb-2"}>{e.name}</h1>
                                    <p className={"small text-muted"}>{e.episode}</p>
                                    <button className={"btn btn-primary"} onClick={() => history.goBack()}>back
                                    </button>
                                </div>

                            </div>
                            <div className={"bg-dark py-5"}>
                                <div className={"container-fluid mt-4"}>
                                    <h1 className={"text-white text-uppercase mb-5 font-weight-black"}>Actors</h1>
                                    <div className={"row"}>
                                        {e.characters.map(character => {
                                            return (
                                                <div className={"col-12 col-lg-6 col-xl-4"}>
                                                    <CharacterCard key={character.id} character={character}/>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }}
            </Query>
        </>
    )
};

export default EpisodeDetail;

