import CharacterCard from "./components/Characters/CharacterCard";
import React from "react";
import {Query} from "react-apollo";

return (
    characters.map((character) => {
        return (
            <div key={character.id} id={character.id} className={"col-12 col-lg-6 col-xl-4"}>
                <CharacterCard character={character}/>
            </div>
        )
    })
)


setNext(data.characters.info.next)
setCharacters(() => {
    const newArray = [...characters]
    data.characters.results.map((character) => {
        newArray.push(character)
    })
    return newArray
})
console.log(characters)
return null





