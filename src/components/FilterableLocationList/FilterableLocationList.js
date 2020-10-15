import React, {useEffect, useState} from 'react';
import {Query} from 'react-apollo';
import LocationCard from "./LocationCard";
import helper from "../../shared/helper";
import {gql} from "apollo-boost";

const GetLocations = (page, filter) => gql`{
        locations(page: ${page} filter: { ${filter} }) {
            info {
              count,
              pages,
              next
            },
            results {
                id,
                name,
                type,
                dimension,
                residents {
                    image,
                    name,
                    species,
                    status,
                    id,
                    gender
                }
            }
        }
    }`

/**
 * Löst die gegebenen Daten als Characters auf und gibt die einzelnen Characters zurück
 * @param props - Array der Episodes
 * @returns {JSX.Element}
 * @constructor
 */

const LocationController = (props) => {
    return props.locations.map((location) => {
            return <div key={location.id} id={location.id} className={"col-12 col-lg-6 col-xl-4"}>
                <LocationCard location={location}/>
            </div>
        }
    )
}

/**
 * Lädt die Daten für die jeweilige Seite und gibt diese als Array mit der Seitennummer
 * an den CharacterController weiter
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

const LocationQuery = (props) => {
    return (
        <Query query={props.query}>
            {({loading, error, data}) => {

                if (loading) return (
                    <div className="d-flex justify-content-center align-items-center vh-100 flex-column w-100 text-center">
                        <div className={"spinner-border"} role={"status"}></div>
                        <p className={"text-success"}>Collecting more Adventures...</p>
                    </div>
                )

                if (error) return <p>Looks like we've got a problem...</p>
                // Wir senden über einen Callback die Information zu den maximalen Pages
                // zurück an das Parent FilterableCharacterList
                props.maxPages(data.locations.info.pages)
                return (<LocationController locations={data.locations.results}/>)
            }}
        </Query>
    )
}


/**
 * Filterbare Episodes List
 *
 *  Filter:
 *  name: String
 *  episode: String
 *
 * @param props : Filter für die Einträge der Charaktere Exp: filter={'name: "Annie"'}
 * @returns {JSX.Element}
 * @constructor
 */

const FilterableLocationList = (props) => {
    /* Array der Pages, wird beim Scrollen erweitert*/
    const [pages, setPages] = useState([1]);
    const [maxPages, setMaxPages] = useState(null)

    const maxPagesCallback = (maxPages) => {
        setMaxPages(maxPages)
    }

    /**
     * Controlliert, wie weit gescrollt wurde und fügt am Trigger eine weiter Page hinzu.
     * Dies löst das Nachladen von Daten aus.
     */

    useEffect(() => {
        const scroll = helper.debounce(() => {
            console.log("Max: ", maxPages)
            let fillSize = window.innerHeight;
            let offset = fillSize * 3;
            let scrollPosition = window.pageYOffset;
            let elementToWatchHeight = document.querySelector("#character-col").offsetHeight;
            if (scrollPosition + offset > elementToWatchHeight) {
                setPages(
                    currentPages => currentPages.length < maxPages ? [...currentPages, currentPages.length + 1] : currentPages
                )
            }
        }, 100)
        document.addEventListener("scroll", scroll)

        return () => document.removeEventListener("scroll", scroll)
    }, [maxPages])


    return (
        <>
            <div className={"container-fluid"}>
                <div className={"row"} id={"character-col"}>
                    {pages.map((page, index) => {
                            return <LocationQuery key={index} page={page} maxPages={maxPagesCallback}
                                                 query={GetLocations(page, props.filter)}/>
                        }
                    )}
                </div>
            </div>

        </>
    );
}

export default FilterableLocationList;
