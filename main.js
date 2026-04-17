const form = document.getElementById('search-bar')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')



const handleClick = async (e) => {
  e.preventDefault()

  const inputValue = searchInput.value
   
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=96b4f733b8a3836c9dfb5ea5e1034a79&query=${encodeURIComponent(inputValue)}`, options)
  const data = await res.json()

  console.log(data)
}


form.addEventListener('submit', handleClick)
