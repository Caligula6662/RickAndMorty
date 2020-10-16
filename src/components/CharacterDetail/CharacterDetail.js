import React from 'react';
import {gql} from "apollo-boost";
import {Query} from "react-apollo";
import {useParams, useHistory, Link} from 'react-router-dom';
import EpisodeCard from "../FilterableEpisodesList/EpisodeCard";
import helper from "../../shared/helper";

const GetCharacter = (id) => gql`{
    character(id: ${id}) {
        id,
        name,
        status,
        species,
        type,
        gender,
        origin {
          id, 
          name,
          type,
          dimension,
        }
        location {
          id,
          name,
          type,
          dimension
        },
        image,
        episode {
            id,
            name,
            air_date,
            episode,
        }
    }
}`


const CharacterDetail = () => {

    const id = useParams().id;
    const history = useHistory();

    return (


        <Query query={GetCharacter(id)}>
            {({loading, error, data}) => {

                if (loading) return <p>Collecting all Character Informations...</p>
                if (error) return <p>Looks like we've got a problem...</p>

                let c = data.character;

                return (
                    <>
                        <div className={"container mb-5"}>
                            <div className={"row"}>
                                <div className={"col-12 col-lg-4"}>
                                    <figure className={"image image-sqare mb-0"}>
                                        <img src={c.image} alt={c.name}/>
                                    </figure>
                                </div>
                                <div className={"col-12 col-lg-8"}>
                                    <span className={`small ${helper.statusInfo(c.status)} py-1 px-3 text-white text-uppercase rounded-pill`}>{c.status}</span>
                                    <h1 className={"font-weight-black text-primary text-uppercase mt-3 mb-2"}>{c.name}</h1>
                                    <ul className={"list-unstyled"}>
                                        <li><span className={"font-weight-bold"}>Species:</span> {c.species}</li>
                                        <li><span className={"font-weight-bold"}>Type:</span> {c.type}</li>
                                        <li><span className={"font-weight-bold"}>Gender:</span> {c.gender}</li>
                                        <li><span className={"font-weight-bold"}>Origin:</span> {c.origin.name}</li>
                                        <li><span className={"font-weight-bold"}>Location: </span><Link to={`/location/${c.location.id}`}>{c.location.name}</Link></li>
                                    </ul>
                                    <button className={"btn btn-primary"} onClick={() => history.goBack()}>back</button>
                                </div>
                            </div>
                        </div>
                        <div className={"bg-dark py-5"}>
                            <div className={"container-fluid mt-4"}>
                                <h1 className={"text-white text-uppercase mb-5 font-weight-black"}>Acting in</h1>
                                <div className={"row"}>
                                    {c.episode.map(episode => {
                                        return (
                                            <div key={episode.id} className={"col-12 col-md-6 col-lg-4 col-xl-3"}>
                                                <EpisodeCard episode={episode} />
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

    )
}

export default CharacterDetail;
