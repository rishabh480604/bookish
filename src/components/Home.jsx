import React from 'react'
import BookRow from './BookRow'


const Home = () => {
  return (
    <div className='min-w-full'>
      <div className=" min-h-screen p-8">
      <BookRow title="Trending" subject="bestsellers" />
      <BookRow title="Thriller" subject="thriller" />
      <BookRow title="Kids" subject="children" />
      <BookRow title="Romantic" subject="romance" />
      <BookRow title="Spy" subject="spy_stories" />
    </div>
    </div>
  )
}

export default Home
