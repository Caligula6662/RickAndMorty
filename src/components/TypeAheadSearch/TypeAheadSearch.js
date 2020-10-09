import React from 'react';
import {gql} from "apollo-boost";

let searchTerm;

const onSearch = (event) => {
    searchTerm = event.target.value();
}

const findCharacterByName = gql`{
    characters(filter: {name="searchTerm"}) {
    info {
      count,
      pages
      next,
      prev,
    }
    results {
      id,
      name,
    }
  }
}`

const TypeAheadSearch = () => (
    <div>
        <input name={"search"} className={"form-control"} placeholder={"Suche"} onKeyUp={onSearch}/>
    </div>
);

export default TypeAheadSearch;
