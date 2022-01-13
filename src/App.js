import { useState, useCallback } from "react"

function App() {
    const [search, setSearch] = useState([])

    const debounce = (func) => {
        let timer
        return function (...args) {
            const context = this;

            if (timer) clearTimeout(timer)

            timer = setTimeout(() => {
                timer = null
                func.apply(context, args)
            }, 700);
        }
    }

    const handleChange = (e) => {
        const { value } = e.target
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
            .then(res => res.json())
            .then(json => setSearch(json.data.items))
    }


    const optimizeVersion = useCallback(debounce(handleChange), [])

    return (
        <div className="container">
            <input type="text" name="search" placeholder="Search..." onChange={optimizeVersion} className="search" autoComplete="off" />
            {
                search?.length > 0 &&

                <div className="autoComplete">
                    {
                        search?.map((item, index) =>
                            <div className="autoCompleteItems" key={index}>
                                <span>{item.name}</span>
                            </div>
                        )}
                </div>


            }
        </div>
    );
}

export default App;
