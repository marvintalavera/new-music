import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import NavigateBar from './NavigateBar'

export default function ArtistView() {
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState({})
    const [ artistAlbums, setArtistAlbums ] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:4000/artist/${id}`)
            const resData = await res.json()
            if (resData.results.length > 0) {
                setArtistData(resData.results[0])
                setArtistAlbums(resData.results.filter(item => item.collectionType === 'Album'))
            }
        }
        fetchData()
    }, [id])

    return <div>
        <NavigateBar />
        <h2>{artistData.artistName}</h2>
        {
            artistAlbums.map(album => {
                return <div key={album.collectionId}>
                    <Link to={`/album/${album.collectionId}`}>
                        <h3>{album.collectionName}</h3>
                    </Link>
                    <img src={album.artworkUrl100} />
                </div>
            })
        }
    </div>
}