import React from 'react';
import itemsData from '../../../Helpers/Data/itemsData';
import authData from '../../../Helpers/Data/authData';

class Edit extends React.Component {
  state = {
    formItemName: '',
    formItemDescription: '',
    formItemImageUrl: '',
  }

  componentDidMount() {
    const itemId = this.props.match.params.itemPathId;
    console.log(itemId);
    if (itemId) {
      itemsData.getSingleItem(itemId)
        .then((response) => {
          this.setState({ formItemName: response.data.itemName, formItemDescription: response.data.itemDescription, formItemImageUrl: response.data.itemImage });
        })
        .catch((error) => console.error(error));
    }
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

  updateItemEvent = (e) => {
    e.preventDefault();
    const itemId = this.props.match.params.itemPathId;
    const updatedItem = {
      itemName: this.state.formItemName,
      itemDescription: this.state.formItemDescription,
      itemImage: this.state.formItemImageUrl,
      uid: authData.getUid(),
    };
    itemsData.updateItem(itemId, updatedItem)
      .then(() => this.props.history.push(`/Stuff/${itemId}`))
      .catch((errorFromEditBoard) => console.error(errorFromEditBoard));
  }

  render() {
    return (
      <div>
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
    <button className="btn btn-outline-primary" onClick={this.updateItemEvent}>Submit</button>
      </div>
    );
  }
}

export default Edit;
