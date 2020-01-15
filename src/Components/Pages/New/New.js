import React from 'react';
import authData from '../../../Helpers/Data/authData';
import itemsData from '../../../Helpers/Data/itemsData';
import './New.scss';

class New extends React.Component {
  state = {
    formItemName: '',
    formItemDescription: '',
    formItemImageUrl: '',
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ formItemName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ formItemDescription: e.target.value });
  }

  imageChange = (e) => {
    e.preventDefault();
    this.setState({ formItemImageUrl: e.target.value });
  }

  saveItemEvent = (e) => {
    e.preventDefault();
    const newItem = {
      itemName: this.state.formItemName,
      itemDescription: this.state.formItemDescription,
      itemImage: this.state.formItemImageUrl,
      uid: authData.getUid(),
    };
    itemsData.addAnItem(newItem)
      .then(() => this.props.history.push('/Stuff'))
      .catch((errorFromSaveBoard) => console.error(errorFromSaveBoard));
  }

  render() {
    return (
      <div className="New">
      <h1 className="d-flex justify-content-center">Add A New Item</h1>
      <form className='col-6 offset-3 HoardForm'>
      <div className="form-group">
        <label htmlFor="item-name">Item Name:</label>
        <input
          type="text"
          className="form-control"
          id="item-name"
          placeholder="Enter Item name"
          value={this.state.formItemName}
          onChange={this.nameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="item-image-url">Item Image Url:</label>
        <input
          type="text"
          className="form-control"
          id="item-image-url"
          placeholder="Enter photo URL"
          value={this.state.formItemImageUrl}
          onChange={this.imageChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="item-description">Item Description:</label>
        <input
          type="text"
          className="form-control"
          id="item-description"
          placeholder="Enter item description"
          value={this.state.formItemDescription}
          onChange={this.descriptionChange}
        />
      </div>
    </form>
    <button className="btn btn-outline-primary" onClick={this.saveItemEvent}>Submit</button>
      </div>
    );
  }
}

export default New;
