import React from 'react';
import {Link} from "react-router-dom";

const LocationCard = (props) => {

    const location = props.location

    return <>

        <div className={"card rounded-lg border-0 mb-4 text-secondary"}>
            <div className={"row no-gutters"}>
                <div className={"bg-secondary text-white col-3"}>
                    <div className={"text-center h1 mb-0 font-weight-bold"}
                         style={{minHeight: 120, lineHeight: 120 + "px"}}>{location.id}</div>
                </div>
                <div className={"col-9"}>
                    <div className={"card-body"}>

                        <Link to={`/location/${location.id}`}>
                            <h5 className={"font-weight-bolder text-primary mb-0"}>{location.name}</h5>
                        </Link>
                        <p className={"small text-gray mb-0"}><span className={"font-weight-bold"}>Dimension:</span> {location.dimension}</p>
                        <p className={"small text-gray mb-0"}><span className={"font-weight-bold"}>Type:</span> {location.type}</p>
                    </div>
                </div>
            </div>
        </div>

    </>
}


export default LocationCard;
