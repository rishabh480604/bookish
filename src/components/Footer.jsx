import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm py-8 px-6 mt-10  w-full">
        <br/>
      <div className="max-w-5xl mx-auto space-y-4 text-center">
        <p>
          Bookish, Book Search, and related logos are trademarks or service marks of Bookish, Inc.
          Use of the software and content is subject to applicable licenses.
        </p>
        <p>
          Bookish software is licensed under open-source licenses; use and distribution are defined
          by each software license.
        </p>
        <p>
          Design by <span className="text-indigo-400">Made By Rishabh</span>. Some icons are licensed
          under <span className="underline">CC BY-SA 3.0+</span>.
        </p>
        <p>
          Book cover placeholder icons designed by <span className="underline">OpenLibrary</span>.
          Other icons used in the website designed by <span className="underline">FontAwesome</span>.
        </p>
      </div>
    </footer>
  )
}

export default Footer
