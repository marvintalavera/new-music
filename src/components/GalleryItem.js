import { useState } from "react"
import { Link } from "react-router-dom"

export default function GalleryItem({ data }) {
    const [view, setView] = useState(false)

    const style = view 
        ? {
            'width': '90vw',
            'border': '1px solid black',
            'margin': '2px',
            'backgroundImage': `url(${data.artworkUrl100})`,
            'backgroundRepeat': 'no-repeat',
            'backgroundSize': 'cover',
            'color': 'yellow'
        }
        : {
            'width': '45vw',
            'border': '1px solid black',
            'margin': '2px'
        }
    

    function simpleView() {
        return <>
            <h2>{data.trackName}</h2>
            <p>{data.collectionName}</p>
        </>
    }

    function detailedView() {
        return <>
            <h2>{data.trackName}</h2>
            <h3>
                <Link to={`/artist/${data.artistId}`}>
                    {data.artistName}
                </Link>
            </h3>
            <h3>
                <Link to={`/album/${data.collectionId}`}>
                    {data.collectionName}
                </Link>
            </h3>
            <h4>{data.primaryGenreName}</h4>
            <h4>{data.releaseDate}</h4>
        </>
    }

    return <div className="item" style={{...style, display: 'inline-block'}} onClick={() => setView(!view)}>
        { view ? detailedView() : simpleView() }
    </div>
}