export default function Button ({ onClick, text }) {

    return (
        <button className="button" type="submit" onClick={onClick}> {text} </button>
    )
}