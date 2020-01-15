import React from 'react';
import { Link } from 'react-router-dom';
import itemsData from '../../../Helpers/Data/itemsData';
import authData from '../../../Helpers/Data/authData';
import SingleItem from '../SingleItem/SingleItem';

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

  deleteItem = (itemId) => {
    itemsData.deleteAnItem(itemId)
      .then(() => {
        this.getItems();
      })
      .catch((errorFromDelete) => (errorFromDelete));
  }

  addNewItem = (newItem) => {
    itemsData.addAnItem(newItem)
      .then(() => {
        this.getItems();
      })
      .catch((errorFromSaveWalk) => console.error(errorFromSaveWalk));
  }

  render() {
    const { items } = this.state;
    return (
      <div>
      <h1>My Stuff</h1>
      <Link className="btn btn-outline-primary" to={'/stuff/new'}>Add A New Item</Link>
      <div className="d-flex flex-wrap justify-content-center">
        { this.state.items.map((item) => <SingleItem key={item.id} item={item} deleteItem={this.deleteItem} addNewItem={this.addNewItem} />)}
      </div>
      </div>
    );
  }
}

export default MyStuff;
