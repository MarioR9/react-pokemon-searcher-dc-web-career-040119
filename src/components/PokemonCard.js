import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
      
      state = {
        backImage: false
      }

  handleBackImage=()=>{
    if(this.state.backImage === false){
      return (
      <div onClick={this.handleCardFlip} className="image">
        <img src={this.props.pokemonObj.sprites.front}/>
      </div>
    )
    }else{
     return( <div onClick={this.handleCardFlip} className="image">
            <img src={this.props.pokemonObj.sprites.back}/>
      </div>
      )
    }
  }

   handleCardFlip=()=>{
 
      this.setState({
        backImage: !this.state.backImage
      })
   } 

  render() {

    // let t = this 
    //  debugger
    
     return (
      <Card>
        <div>
          {this.handleBackImage()}
          <div className="content">
            <div className="header">{this.props.pokemonObj.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemonObj.stats.slice(-1)[0].value}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
