import React from 'react';
import {Link} from "react-router-dom";

const CharacterCard = (props) => {

    const character = props.character

    let status = "bg-success";

    if (character.status == "Dead") {
        status = "bg-danger"
    }
    if (character.status == "unknown") {
        status = "bg-secondary"
    }

    return <>
        <div className={"card rounded-lg border-0 mb-4 text-secondary"}>
            <div className={"row no-gutters"}>
                <div className={"col-5"}>
                    <figure className={"card-img-top mb-0"}>
                        <img className={"w-100"} src={character.image}
                             alt={`${character.name} - ${character.species}`}/>
                    </figure>
                </div>
                <div className={"col-7"}>
                    <div className={"card-body h-100 d-flex flex-column justify-content-center"}>
                        <div>
                            <span className={`small ${status} py-1 px-2 text-white rounded-pill`}>{character.status}</span>
                            <h5 className={"font-weight-bolder text-primary my-2"}>
                                <Link to={`/character/${character.id}`}>{character.name}</Link>
                            </h5>
                            <p>{character.species}, {character.gender}</p>
                            <p className={"mb-0 small"}><span className={"font-weight-bold"}>Last Seen: </span>
                                {character.episode.map((episode, index, arr) => {
                                    if (arr.length - 1 === index) return <Link to={`/episode/${episode.id}`}>{episode.name}</Link>
                                })}
                            </p>
                            {/*
                                <p className={"mb-0 small"}><span
                                    className={"font-weight-bold"}>Last Location: </span><Link
                                    to={`/location/${character.location.id}`}>{character.location.name}, {character.location.dimension}</Link>
                                </p>
                            */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}


export default CharacterCard;
