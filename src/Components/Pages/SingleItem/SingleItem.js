import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SingleItem.scss';


class SingleItem extends React.Component {
  state = {
    items: [],
  }

  deleteItemEvent = (e) => {
    e.preventDefault();
    const { deleteItem, item } = this.props;
    deleteItem(item.id);
  }


  render() {
    const { item } = this.props;
    const itemPathId = this.props.item.id;
    return (
      <div className="item col-4">
      <div className="card" id="itemCard">
          <button className="btn btn-danger deleteItemButton col-1" onClick={this.deleteItemEvent}>X</button>
            <div className="card-body">
              <h5 className="card-title">{item.itemName}</h5>
              <img className="itemImage" src={item.itemImage} alt={'item image'}></img>
              <p className="card-text">{item.itemDescription}</p>
          <Link className="btn btn-outline-primary" to={`/stuff/${itemPathId}`}>View Item</Link>
          <Link className="btn btn-outline-info" to={`/stuff/${item.id}/edit`}>Edit</Link>
        </div>
      </div>
    </div>
    );
  }
}

export default SingleItem;
