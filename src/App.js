import React from 'react';
import './App.css';

import FilterableCharacterList from "./components/Characters/FilterableCharacterList";

const App = () => {

    return (
        <>
            <nav>

            </nav>
            <main className={"main"}>
                <div className={"container-fluid"}>
                    <FilterableCharacterList filter={'name: "Annie"'}/>
                </div>
            </main>

        </>
    );
}

export default App;
