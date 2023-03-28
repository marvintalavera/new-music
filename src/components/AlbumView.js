import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import NavigateBar from './NavigateBar'

export default function AlbumView() {
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState({})
    const [ albumSongs, setAlbumSongs ] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:4000/album/${id}`)
            const resData = await res.json()
            if (resData.results.length > 0) {
                setAlbumData(resData.results[0])
                setAlbumSongs(resData.results.filter(item => item.wrapperType === 'track'))
            }
        }
        fetchData()
    }, [id])

    return <div>
        <NavigateBar />
        <h2>{albumData.collectionName}</h2>
        <Link to={`/artist/${albumData.artistId}`}>
            <p>{albumData.artistName}</p>
        </Link>
        {
            albumSongs.map(song => {
                return <div key={song.trackId}>
                    <h3>{song.trackName}</h3>
                    <img src={song.artworkUrl100} />
                </div>
            })
        }
    </div>
}