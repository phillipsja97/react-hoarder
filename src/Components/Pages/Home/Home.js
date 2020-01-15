import React from 'react';
import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
      <h1 className="homeTitle">Welcome To My Collection</h1>
        <img className="homeImage" src="https://secureservercdn.net/50.62.88.95/b7k.68d.myftpupload.com/wp-content/uploads/2018/04/Hoarder.jpg?time=1564639017"/>
      </div>
    );
  }
}

export default Home;
