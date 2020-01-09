import React from 'react';
import { Link } from 'react-router-dom';
import itemsData from '../../../Helpers/Data/itemsData';
import authData from '../../../Helpers/Data/authData';
import SingleStuff from '../SingleStuff/SingleStuff';

class MyStuff extends React.Component {
  state = {
    items: [],
  }

  getItems = () => {
    itemsData.getItemsByUid(authData.getUid())
      .then((items) => {
        this.setState({ items });
      })
      .catch((errorFromGetItems) => console.error(errorFromGetItems));
  }

  componentDidMount() {
    this.getItems();
  }

  render() {
    const { items } = this.state;
    return (
      <div>
      <h1>My Stuff</h1>
      <div className="d-flex flex-wrap justify-content-center">
        { this.state.items.map((item) => <SingleStuff key={item.id} item={item}/>)}
      </div>
      </div>
    );
  }
}

export default MyStuff;
