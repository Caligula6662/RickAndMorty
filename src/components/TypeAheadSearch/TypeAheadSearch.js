import React from 'react';

let searchTerm;

const onSearch = (event) => {
    searchTerm = event.target.value();
}

const TypeAheadSearch = () => (
    <div>
        <input name={"search"} className={"form-control"} placeholder={"Suche"} onKeyUp={onSearch}/>
    </div>
);

export default TypeAheadSearch;
