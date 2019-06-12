import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
import PokemonCard from './PokemonCard';

class PokemonPage extends React.Component {
   
    constructor(){
        super()
        this.state = {
      allPokemon: [],
      search: ""
   }
  }

  fetchPokemon = () =>{
    fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(data => 
      this.setState({
        allPokemon: data
      }))
      console.log('fetched')
  }
  handlePokemonCard = () =>{
    return this.searchPokemon().map(pokemon =>{
     return <PokemonCard id={pokemon.id} backImage={this.state.backImage} pokemonObj={pokemon} />
    })
  }

  componentDidMount() {
    this.fetchPokemon()
  }

  onTypingChange = (event) => {
    this.setState({
      search : event.target.value
    })
  }
  handleNewPokemon=(newArrayOfPokemon)=>{
    this.setState({
        allPokemon: [...this.state.allPokemon, newArrayOfPokemon]
    })
  }

  onTypingChangeInput = (event) => {
    this.setState({
      name : event.currentTarget[0].value,
      hp : event.currentTarget[1].value,
      frontUrl : event.currentTarget[2].value,
      backUrl : event.currentTarget[3].value
      
    })
  }


  addPokemon=()=>{
    let data = {
      name: this.state.name,
      stats:[
        {value: this.state.hp,
        name: "hp"
         }],
      sprites:{
      front : this.state.frontUrl,
      back : this.state.backUrl
      }
    }
    if(data.includes("")){
    fetch("http://localhost:3000/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => {
      this.handleNewPokemon(data)
    })
  }else{
    console.log("enter Data")
  }
  }

  searchPokemon = () => {
    return this.state.allPokemon.filter(pokemon => pokemon.name.includes(this.state.search))
  }

  render() {
    // _.debounce(() => console.log('🤔'), 500)  showNoResults={false} 
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={this.onTypingChange} />
        <br />
        <PokemonCollection  pokemonCard={this.handlePokemonCard()}/>
        <br />
        {/* <PokemonCard /> */}
        <br />
        <PokemonForm handleNewPokemon={this.handleNewPokemon}  addPokemon={this.addPokemon} onTypingChangeInput={this.onTypingChangeInput}/>

      </div>
    )
  }
}

export default PokemonPage
