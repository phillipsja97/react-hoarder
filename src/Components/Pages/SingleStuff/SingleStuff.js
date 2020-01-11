import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import itemsData from '../../../Helpers/Data/itemsData';
import './SingleStuff.scss';


class SingleStuff extends React.Component {
  state = {
    item: [],
  }

  getSingleItemData = (itemId) => {
    itemsData.getSingleItem(itemId)
      .then((item) => {
        this.setState({ item: item.data });
      })
      .catch((errorFromSingleItem) => (errorFromSingleItem));
  }

  componentDidMount() {
    this.getSingleItemData(this.props.match.params.itemPathId);
    console.log(this.state.item);
  }

  render() {
    const { item } = this.state;
    return (
      <div className="item col-4">
      <div className="card" id="itemCard">
          <button className="btn btn-danger deleteItemButton col-1" onClick={this.deleteItemEvent}>X</button>
            <div className="card-body">
              <h5 className="card-title">{item.itemName}</h5>
              <p className="card-text">{item.itemDescription}</p>
        </div>
      </div>
    </div>
    );
  }
}


export default SingleStuff;
