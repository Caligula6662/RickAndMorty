import React from 'react';
import {Link} from "react-router-dom";

const EpisodeCard = (props) => {

    const episode = props.episode

    return <>

        <div className={"card rounded-lg border-0 mb-4 text-secondary"}>
            <div className={"row no-gutters"}>
                <div className={"bg-secondary text-white col-3"}>
                    <div className={"text-center h1 mb-0 font-weight-bold"}
                         style={{minHeight: 120, lineHeight: 120 + "px"}}>{episode.id}</div>
                </div>
                <div className={"col-9"}>
                    <div className={"card-body"}>
                        <Link to={`/episode/${episode.id}`}>
                            <h5 className={"font-weight-bolder text-primary mb-0"}>{episode.name}</h5>
                        </Link>
                        <p className={"small text-gray mb-0"}><span className={"font-weight-bold"}>Air Date:</span> {episode.air_date}</p>
                        <p className={"small text-gray mb-0"}><span className={"font-weight-bold"}>Episode:</span> {episode.episode}</p>
                    </div>
                </div>
            </div>
        </div>

    </>
}


export default EpisodeCard;
