import { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import GalleryItem from './GalleryItem'

export default function Gallery() {
    const data = useContext(DataContext)

    return <div className="gallery">
        {
            data.map((item, i) => {
                return <GalleryItem key={`track ${i}`} data={item} />
            })
        }
    </div>
}