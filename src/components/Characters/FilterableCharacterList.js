import React, {useEffect, useState} from 'react';
import {Query} from 'react-apollo';
import CharacterCard from "./CharacterCard";
import helper from "../../shared/helper";
import {gql} from "apollo-boost";

const GetCharacters = (page, filter) => gql`{
        characters(page: ${page} filter: { ${filter} }) {
            info {
              count,
              pages,
              next
            },
            results {
                id,
                name,
                status,
                species,
                gender,
                image,
                episode {
                    id,
                    name
                }, 
                location {
                    id,
                    name,
                    dimension
                }
            }
        }
    }`

/**
 * Löst die gegebenen Daten als Characters auf und gibt die einzelnen Characters zurück
 * @param props - Array der Charactere
 * @returns {JSX.Element}
 * @constructor
 */

const CharacterController = (props) => {
    return props.characters.map((character) => {
            return <div key={character.id} id={character.id} className={"col-12 col-lg-6 col-xl-4"}>
                <CharacterCard character={character}/>
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

const CharacterQuery = (props) => {
    return (
        <Query query={props.query}>
            {({loading, error, data}) => {

                if (loading) return (
                    <div className="d-flex justify-content-center align-items-center vh-100 flex-column w-100 text-center">
                        <div className={"spinner-border"} role={"status"}></div>
                        <p className={"text-success"}>Collecting more Mortys...</p>
                    </div>
                )
                if (error) return <p>Looks like we've got a problem...</p>
                // Wir senden über einen Callback die Information zu den maximalen Pages
                // zurück an das Parent FilterableCharacterList
                props.maxPages(data.characters.info.pages)
                return (<CharacterController characters={data.characters.results}/>)
            }}
        </Query>
    )
}


/**
 * Filterbare Characters List
 *
 *  Filter:
 *  name: String
 *  status: String
 *  species: String
 *  type: String
 *  gender: String
 *
 * @param props : Filter für die Einträge der Charaktere Exp: filter={'name: "Annie"'}
 * @returns {JSX.Element}
 * @constructor
 */

const FilterableCharacterList = (props) => {

    /* Array der Pages, wird beim Scrollen erweitert*/
    const [pages, setPages] = useState([1]);
    const [maxPages, setMaxPages] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("name");

    const onSearch = (event) => {
        event.persist()
        setSearchTerm(event.target.value);
    }

    const onChangeFilterType = (event) => {
        event.persist()
        setFilterType(event.target.value)
    }

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
                <div className={"p-5 rounded bg-light mb-5"}>
                    <h4 className={"font-weight-black text-primary"}>Filter:</h4>
                    <div className={"form-inline"}>
                        <div className={"form-group"}>
                            <input className={"form-control mr-2"} id={"search"} placeholder={"Search"}
                                   onKeyUp={onSearch}/>
                            <select className={"form-control"} onChange={onChangeFilterType}>
                                <option>name</option>
                                <option>status</option>
                                <option>species</option>
                                <option>type</option>
                                <option>gender</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={"row"} id={"character-col"}>
                    {pages.map((page, index) => {
                            return <CharacterQuery key={index} page={page} maxPages={maxPagesCallback}
                                                   query={GetCharacters(page, `${filterType}: "${searchTerm}"`)}/>
                        }
                    )}
                </div>
            </div>

        </>
    );

}

export default FilterableCharacterList;
