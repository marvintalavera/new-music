import { useContext } from 'react'
import { SearchContext } from '../context/SearchContext'

export default function SearchBar() {
  const {term, handleSearch} = useContext(SearchContext)

  return <form>
    <label htmlFor='searchQuery'></label>
    <input
      id='searchQuery'
      ref={term}
      placeholder='Search for music'
    />
    <button type='submit' onClick={e => handleSearch(e, term.current.value)}>Search</button>
  </form>
}