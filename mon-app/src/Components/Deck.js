import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'

 

  class Deck extends Component {
  
  
  
      constructor(props){
          super(props);
          this.state = {
            item : [],
            pic : "",
            isLoaded: false,
          }
        }
      componentDidMount(){
        fetch('https://denzel-movies-api-ey.herokuapp.com/movies/search?limit=5&metascore=77')
        .then(res => res.json())
        .then(json =>{
            this.setState({
              isLoaded : true,
              item : json,
              
            })
        }
          
        )
    
    }
    render() {
      var { isLoaded , item} = this.state
  
      if(!isLoaded){
        return <div>Loading....</div>
      }
      else{
      
          
      return (
        
        <div>
  <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
          <CardDeck className = "text-center">
        <Card style={{ width: '18rem' }} >
          <Card.Img top width="100%" variant="top" src={item.results[0].poster} alt="Card image cap" />
          <Card.Body>
            <Card.Title>{item.results[0].title}</Card.Title>
            <Card.Subtitle className="text-danger">Rating : {item.results[0].rating}</Card.Subtitle>
            <Card.Text>{item.results[0].synopsis}</Card.Text>
            <a href={item.results[0].link}><Button variant='primary'>View on IMDb !</Button></a>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img top width="100%" src={item.results[1].poster} alt="Card image cap" />
          <Card.Body>
            <Card.Title>{item.results[1].title}</Card.Title>
            <Card.Subtitle className="text-danger">Rating : {item.results[1].rating}</Card.Subtitle>
            <Card.Text>{item.results[1].synopsis}</Card.Text>
            <a href={item.results[1].link}><Button >View on IMDb !</Button></a>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img top width="100%" src={item.results[2].poster} alt="Card image cap" />
          <Card.Body>
            <Card.Title>{item.results[2].title}</Card.Title>
            <Card.Subtitle className="text-danger">Rating : {item.results[2].rating}</Card.Subtitle>
            <Card.Text>{item.results[2].synopsis}</Card.Text>
            <a href={item.results[2].link}><Button >View on IMDb !</Button></a>
          </Card.Body>
        </Card>
        
        <Card style={{ width: '18rem' }}>
          <Card.Img top width="100%" src={item.results[3].poster} alt="Card image cap" />
          <Card.Body>
            <Card.Title>{item.results[3].title}</Card.Title>
            <Card.Subtitle className="text-danger">Rating : {item.results[3].rating}</Card.Subtitle>
            <Card.Text> {item.results[3].synopsis}</Card.Text>
            <a href={item.results[3].link}><Button >View on IMDb !</Button></a>
          </Card.Body>
        </Card>

        
      </CardDeck>
       
          </div>
      );
    }
    }
  }
  
  export default Deck;