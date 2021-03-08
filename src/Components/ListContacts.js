import React from 'react';
import { Notification } from './Notification';
import { Modal, Button } from 'react-bootstrap';

class ListContact extends React.Component {
  constructor(props) {
    super(props);
    let contacts = localStorage.getItem('contacts');
    if (contacts !== null) {
      contacts = JSON.parse(contacts);
      contacts.sort(function (a, b) {
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else contacts = [];
    let favs = [];
    contacts.map((elem) => {
      if (elem.isFav) {
        favs.push(elem);
      }
      return elem;
    });
    this.state = {
      contactList: contacts,
      favs: favs,
      name: '',
      phone: '',
      editModal: false,
      editPhone: '',
      editName: '',
    };
  }
  async componentDidMount() {}
  _onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  _createContact = (e) => {
    e.preventDefault();
    if (this.state.name === '') {
      Notification('warning', 'Invalid!', 'Please Enter Proper Contact Name');
      return;
    }
    if (this.state.phone === '') {
      Notification('warning', 'Invalid!', 'Please Enter Proper Contact Number');
      return;
    }
    if (this.state.phone.length !== 10 && this.state.phone.match(/^[0-9]+$/)) {
      Notification('warning', 'Invalid!', 'Contact Number Length Invalid');
      return;
    }
    let data = localStorage.getItem('contacts');
    if (data != null) {
      data = JSON.parse(data);
      let duplicate = false;
      let phone = '';
      let name = '';
      data.map((elem) => {
        if (this.state.phone === elem.phone || this.state.name === elem.name) {
          duplicate = true;
          name = elem.name;
          phone = elem.phone;
        }
        return elem;
      });
      if (duplicate) {
        Notification('danger', 'Duplicate!', `Duplicate contact found ${name} : ${phone}`);
      } else {
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        data.push({ name: this.state.name, phone: this.state.phone, isFav: false });
        this.setState({ contactList: data });
        localStorage.setItem('contacts', JSON.stringify(data));
        Notification('success', 'Success!', `Contact Added Successfully`);
      }
    } else {
      document.getElementById('name').value = '';
      document.getElementById('phone').value = '';
      let contacts = [{ name: this.state.name, phone: this.state.phone, isFav: false }];
      this.setState({ contactList: contacts });
      localStorage.setItem('contacts', JSON.stringify(contacts));
      Notification('success', 'Success!', `Contact Added Successfully`);
    }
  };
  _removeFav = (phone) => {
    let data = JSON.parse(localStorage.getItem('contacts'));
    data = data.map((elem) => {
      if (elem.phone === phone) {
        elem.isFav = false;
      }
      return elem;
    });
    localStorage.setItem('contacts', JSON.stringify(data));
    this._updateDisplay();
    Notification('info', 'Info!', 'Contact removed from favourites');
  };
  _addFav = (phone) => {
    let data = JSON.parse(localStorage.getItem('contacts'));
    data = data.map((elem) => {
      if (elem.phone === phone) {
        elem.isFav = true;
      }
      return elem;
    });
    localStorage.setItem('contacts', JSON.stringify(data));
    this._updateDisplay();
    Notification('info', 'Info!', 'Contact added to favourites');
  };
  _updateDisplay = () => {
    let contacts = localStorage.getItem('contacts');
    if (contacts !== null) {
      contacts = JSON.parse(contacts);
      contacts.sort(function (a, b) {
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else contacts = [];
    let favs = [];
    contacts.map((elem) => {
      if (elem.isFav) {
        favs.push(elem);
      }
      return elem;
    });
    this.setState({ contactList: contacts, favs: favs });
  };
  _delete = (phone) => {
    let conf = window.confirm('Delete the contact?');
    if (conf) {
      let data = JSON.parse(localStorage.getItem('contacts'));
      data = data.filter((elem) => {
        if (elem.phone !== phone) return elem;
      });
      localStorage.setItem('contacts', JSON.stringify(data));
      this._updateDisplay();
      Notification('success', 'Success!', 'Contact deleted successfully');
    }
  };
  _editEntry = (name, phone, isFav) => {
    this.setState({ editName: name, editPhone: phone, editFav: isFav });
    this.setState({ editModal: true });
  };
  _editContact = (e) => {
    e.preventDefault();
    let name = document.getElementById('editName').value;
    let phone = document.getElementById('editPhone').value;
    if (name === '') {
      Notification('warning', 'Invalid!', 'Please Enter Proper Contact Name');
      return;
    }
    if (phone === '') {
      Notification('warning', 'Invalid!', 'Please Enter Proper Contact Number');
      return;
    }
    if (phone.length !== 10) {
      Notification('warning', 'Invalid!', 'Contact Number Length Invalid');
      return;
    }
    let data = localStorage.getItem('contacts');
    if (data != null) {
      data = JSON.parse(data);
      let duplicate = false;
      let nameInner = '';
      let phoneInner = '';
      data = data.filter((elem) => {
        if (elem.phone !== this.state.editPhone) return elem;
      });
      data.map((elem) => {
        if (phone === elem.phone || name === elem.name) {
          duplicate = true;
          nameInner = elem.name;
          phoneInner = elem.phone;
        }
        return elem;
      });
      if (duplicate) {
        Notification('danger', 'Duplicate!', `Duplicate contact found ${nameInner} : ${phoneInner}`);
      } else {
        data.push({ name: name, phone: phone, isFav: this.state.editFav });
        this.setState({ contactList: data, editModal: false, editName: '', editPhone: '' });
        localStorage.setItem('contacts', JSON.stringify(data));
        Notification('success', 'Success!', `Contact Edited Successfully`);
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="add-contact-wrapper">
          <div className="form-wrapper">
            <form className="">
              <p>Add New Contact</p>
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <input className="form-control" id="name" name="name" placeholder="Name" onChange={this._onChange} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <input className="form-control" id="phone" type="number" name="phone" placeholder="Phone Number" onChange={this._onChange} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-3">
                    <button className="btn btn-primary" onClick={this._createContact}>
                      Add Contact
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <form></form>
        </div>
        <div className="contact-list-wrapper">
          {this.state.favs.length > 0 && (
            <div className="favourites-list">
              <p className="favourites-title">Favourite Contacts</p>
              <div className="table-responsive-xl">
                <table className="table table-hover table">
                  <tbody>
                    {this.state.favs.map((elem) => {
                      return (
                        <tr key={elem.phone}>
                          <th scope="row">
                            <i className="fas fa-user fa-1x"></i>
                            <span>&nbsp; {elem.name}</span>
                          </th>
                          <th>
                            <i className="fas fa-phone-alt fa-1x"></i>
                            <span>&nbsp;{elem.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</span>
                            <i
                              onClick={() => {
                                this._editEntry(elem.name, elem.phone, elem.isFav);
                              }}
                              style={{ marginLeft: '8px' }}
                              className="fas fa-pen-square"
                            ></i>
                          </th>
                          <td>
                            <i
                              className="fas fa-star fa-1x"
                              key={elem.phone}
                              onClick={() => {
                                this._removeFav(elem.phone);
                              }}
                            ></i>
                          </td>
                          <td>
                            <i
                              className="fas fa-trash fa-1x"
                              onClick={() => {
                                this._delete(elem.phone);
                              }}
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {this.state.contactList.length > 0 && (
            <div className="contact-list">
              <p className="favourites-title">All Contacts</p>
              <div className="table-responsive-xl">
                <table className="table table-hover table">
                  <tbody>
                    {this.state.contactList.map((elem) => {
                      return (
                        <tr key={elem.phone}>
                          <th scope="row">
                            <i className="fas fa-user fa-1x"></i>
                            <span>&nbsp; {elem.name}</span>
                          </th>
                          <th>
                            <i className="fas fa-phone-alt fa-1x"></i>
                            <span>&nbsp;{elem.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</span>
                            <i
                              onClick={() => {
                                this._editEntry(elem.name, elem.phone, elem.isFav);
                              }}
                              style={{ marginLeft: '8px' }}
                              className="fas fa-pen-square"
                            ></i>
                          </th>
                          <td>
                            <i
                              className={elem.isFav ? 'fas fa-star fa-1x' : 'far fa-star fa-1x'}
                              onClick={
                                elem.isFav
                                  ? () => {
                                      this._removeFav(elem.phone);
                                    }
                                  : () => {
                                      this._addFav(elem.phone);
                                    }
                              }
                            ></i>
                          </td>
                          <td>
                            <i
                              className="fas fa-trash fa-1x"
                              onClick={() => {
                                this._delete(elem.phone);
                              }}
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {this.state.contactList.length === 0 && (
            <div>
              <p className="no-data-text">No Contacts Added</p>
            </div>
          )}
        </div>
        <Modal
          show={this.state.editModal}
          onHide={() => {
            this.setState({ editModal: false });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <input id="editName" type="text" defaultValue={this.state.editName} className="form-control" />
              </div>
              <div className="form-group"></div>
              <input id="editPhone" type="text" defaultValue={this.state.editPhone} className="form-control" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.setState({ editModal: false });
              }}
            >
              Close
            </Button>
            <Button variant="primary" onClick={this._editContact}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ListContact;
