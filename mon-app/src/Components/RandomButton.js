import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
class RandomButton extends Component {
    constructor(props) {
      super(props);
      this.state = { loading: false, show:false, msg: [] };
    }
  
    handleClick = api => e => {
      e.preventDefault();
  
      this.setState({ loading: true , show: true});
      fetch('https://denzel-movies-api-ey.herokuapp.com/movies')
        .then(response=>response.json())
        .then(json => this.setState({ loading: false, msg: json }))
    };
  
    render() {
      const { loading, show, msg} = this.state;
  if (show)
  { 
     
          return (     <span>
         <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
           
            <Card id="random" style={{ width: '18rem' }} >
            <Card.Img top width="100%" variant="top" src={msg.poster} alt="Card image cap" />
            <Card.Body>
              <Card.Title>{msg.title}</Card.Title>
              <Card.Subtitle className="text-danger">Rating : {msg.rating}</Card.Subtitle>
              <Card.Text>{msg.synopsis}</Card.Text>
              <a href={msg.link}><Button variant='primary'>View on IMDb !</Button></a>
            </Card.Body>
            </Card>
            <Button variant="primary" onClick={this.handleClick('movies')}>
          {loading ? 'Loading..' : 'You can watch this Random Movie.. 🍿'}
          </Button>
            </span>
         
            );
          }
            else
            {
          

                return (
                  
          
          <Button variant="primary" onClick={this.handleClick('movies')}>
          {loading ? 'Loading..' : 'You can watch this Random Movie.. 🍿'}
          </Button>
                  
                );

    }
}
  }
  export default RandomButton;