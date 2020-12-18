// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name({onNameChange}) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" onChange={onNameChange} />
    </div>
  )
}

function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={onAnimalChange}
      />
    </div>
  )
}

// 🐨 uncomment this
function Display({animal, name}) {
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}

function App() {
  const [name, setName] = React.useState('');
  const [animal, setAnimal] = React.useState('')
  
  return (
    <form>
      <Name onNameChange={event => setName(event.target.value)}  />
      <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)} />
      <Display animal={animal} name={name} />
    </form>
  )
}

export default App
