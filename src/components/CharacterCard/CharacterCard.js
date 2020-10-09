import React from 'react';

const CharacterCard = () => {
    character = null;

    if (!char) return (null)

    return <>

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


    </>
}







export default CharacterCard;
