import { useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import Gallery from './components/Gallery'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'

export default function App() {
  const [message, setMessage] = useState('Search for Music!!!')
  const [data, setData] = useState([])
  const searchInput = useRef('')

  async function handleSearch(e, term) {
    e.preventDefault()
    try {
      const res = await fetch(`https://itunes.apple.com/search?term=${term}`)
      const resData = await res.json()
      if (resData.results.length > 0) {
        setData(resData.results)
        setMessage('Search for more Music!!!')
      }
    } catch (err) {
      setMessage("Oopsie, that's not a valid search ...")
    }
  }

  return <main>
    <p>{message}</p>
    <Router>
      <Routes>
        <Route path='/' element={
          <>
            <SearchContext.Provider value={{
              term: searchInput,
              handleSearch: handleSearch
            }} >
              <SearchBar />
            </SearchContext.Provider>
            <DataContext.Provider value={data}>
              <Gallery />
            </DataContext.Provider>
          </>
        } />
        <Route path='/album/:id' element={<AlbumView />} />
        <Route path='/artist/:id' element={<ArtistView />} />
      </Routes>
    </Router>
  </main>
}