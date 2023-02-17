import withContext from "../utils/withContext"
import './Filter.css'
import SearchAuctions from "./SearchAuctions"

function filter() {
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
                <select id="category">
                    <option value="all">All</option>
                    <option value="crafts">Crafts</option>
                    <option value="pictures">Pictures</option>
                </select>
            </div>

            <div className="filterRanges">
                <label htmlFor="price">Price</label>
                <input type="range"
                    id="price"
                    min="0"
                    max="100.000"
                />
            </div>

        </section>
    </div>
    )
}

export default withContext(filter)