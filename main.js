const form = document.getElementById('search-bar')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const showsSection = document.getElementById('shows-section')




const handleClick = async (e) => {
  e.preventDefault()

  const inputValue = searchInput.value.trim() 

  if (!inputValue) {
    console.log('No user input')
    return
  }

  const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=96b4f733b8a3836c9dfb5ea5e1034a79&query=${encodeURIComponent(inputValue)}`)
  const data = await res.json()

  const showsArr = data.results
  console.log(data)
  showsSection.innerHTML = generateShowHtml(showsArr)
}


form.addEventListener('submit', handleClick)
