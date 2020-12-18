// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'

import {
  PokemonForm,
  fetchPokemon, 
  PokemonInfoFallback,
  PokemonDataView
} from '../pokemon'

const statusCode = {
  PENDING: 'PENDING',
  IDLE: 'IDLE',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
}


function updateUtil(oldProps, newProps) {
  return {
    ...oldProps,
    ...newProps,
  }
}

function ErrorFallBack({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error: 
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

// class ErrorBoundary extends React.Component {
  
//   state = { error: null }

//   static getDerivedStateFromError(error) {
//     return {error}
//   }

//   render() {
//     if (this.state.error) {
//       return (
//         <div role="alert">
//           There was an error: 
//           <pre style={{whiteSpace: 'normal'}}>{this.state.error.message}</pre>
//         </div>
//       )
//     }

//     return this.props.children;
//   }
// }

function PokemonInfo({pokemonName}) {

  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: pokemonName ? statusCode.PENDING : statusCode.IDLE,
  })

  React.useEffect(() => {
    if (pokemonName.trim() !== '') {
      setState(updateUtil(state, {status: statusCode.PENDING}))
      fetchPokemon(pokemonName).then(response => {
        setState(
          updateUtil(state, {status: statusCode.RESOLVED, pokemon: response}),
        )
      }, err => {
        setState(updateUtil(state, { status: statusCode.REJECTED, error: err }))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonName])

  switch (state.status) {
    case statusCode.PENDING:
      return <PokemonInfoFallback name={pokemonName} />
    case statusCode.REJECTED:
      throw state.error;   
    case statusCode.RESOLVED:
      return <PokemonDataView pokemon={state.pokemon} />
    default:
      return 'Submit a pokemon'
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('');
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm 
        pokemonName={pokemonName} 
        onSubmit={handleSubmit}
      />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary 
          FallbackComponent={ErrorFallBack}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
