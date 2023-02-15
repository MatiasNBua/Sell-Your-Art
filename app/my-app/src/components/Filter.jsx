import withContext from "../utils/withContext"
import './Filter.css'

function filter (){
    return(
        <section className="filterContainer">
        <div className="filterRanges">
            <label htmlFor="price">Price</label>
            <input type="range"
             id="price"
             min="0"
             max="100.000"
             />
        </div>
        <div className="filterCategorys">
            <label htmlFor="category">Categories</label>
            <select id="category">
                <option value="all">All</option>
                <option value="crafts">Crafts</option>
                <option value="pictures">Pictures</option>
            </select>
        </div>
        </section>
    )
}

export default withContext(filter)