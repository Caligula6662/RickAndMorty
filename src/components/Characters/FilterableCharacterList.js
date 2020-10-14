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
                    episode,
                    name
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
                if (loading) return <p>Collecting all Mortis...</p>
                if (error) return <p>Looks like we've got a problem...</p>

                //Wir senden über einen Callback die Information zu den maximalen Pages zurück an das Parent
                props.maxPages(data.characters.info.pages)

                return (<CharacterController characters={data.characters.results}  />)

                return null
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
    const [maxPages, setMaxPages] = useState(-1)
    console.log("Pages: ", pages, "Max: ", maxPages)

    const maxPagesCallback = (maxPages) => {
        setMaxPages(maxPages)
    }

    /**
     * Controlliert, wie weit gescrollt wurde und fügt am Trigger eine weiter Page hinzu.
     * Dies löst das Nachladen von Daten aus.
     */

    useEffect(() => {
        const scroll = helper.debounce(() => {
            let fillSize = window.innerHeight;
            let offset = fillSize * 2;
            let scrollPosition = window.pageYOffset;
            let elementToWatchHeight = document.querySelector("#character-col").offsetHeight;

            if (scrollPosition + offset > elementToWatchHeight) {
                setPages(currentPages => [...currentPages, currentPages.length + 1])
            }
        }, 100)
        document.addEventListener("scroll", scroll)

        return () => document.removeEventListener("scroll", scroll)
    }, [])

    return (
        <>
            <div className={"row"} id={"character-col"}>
                {pages.map((page, index) => {
                        return <CharacterQuery key={index} page={page} maxPages={maxPagesCallback} query={GetCharacters(page, props.filter)}/>
                    }
                )}
            </div>
        </>
    );

}

export default FilterableCharacterList;
