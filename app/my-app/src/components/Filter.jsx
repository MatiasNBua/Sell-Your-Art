import { useState } from "react"
import withContext from "../utils/withContext"
import './Filter.css'
import SearchAuctions from "./SearchAuctions"

function Filter({ onChange }) {
    const [minPrice, setMinPrice] = useState(0)

    const handleChangeMinPrice = (event) => {
        setMinPrice(event.target.value)
        onChange(prevState => ({ 
            ... prevState,
            minPrice: event.target.value
        }))
    }  
    
    const handleChangeCategory = (event) => {
        onChange(prevState => ({
            ... prevState,
            category: event.target.value
        }))
    } 

    return (<div className="filterContainer"> 
        <div className="titleContainer">
            <h1 className="h1">Find the art that you like</h1>
            <div>
            <SearchAuctions />
            </div>
        </div>

        <section className="sectionContainer">
            <div className="filterCategorys">
                <label htmlFor="category">Categories</label>
                <select id="category" onChange={handleChangeCategory}>
                    <option value="all">All</option>
                    <option value="crafts">Crafts</option>
                    <option value="pictures">Pictures</option>
                </select>
            </div>

            <div className="filterRanges">
                <label htmlFor="price">Start in:</label>
                <input type="range"
                    id="price"
                    min="0"
                    max="5000"
                    onChange={handleChangeMinPrice}
                />
                <span className="minPrince">${minPrice}</span>
            </div>

        </section>
    </div>
    )
}

export default withContext(Filter)