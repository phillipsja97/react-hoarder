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
      <div className="d-flex justify-content-center">
      <div className="item col-4 d-flex justify-content-center">
      <div className="card" id="itemCard">
            <div className="card-body">
              <h5 className="card-title">{item.itemName}</h5>
              <img className="itemImage" src={item.itemImage} alt={'item image'}></img>
              <p className="card-text">{item.itemDescription}</p>
        </div>
      </div>
    </div>
    </div>
    );
  }
}


export default SingleStuff;
