import React from 'react';

//Leaflet maps
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

//Components
import { getMessages, getLocation, sendMessage } from './api/API';
import MessageCard from './components/MessageCard';

//Styles
import './App.css';

//Logo img component
import logo from './images/logo.png';

var myIcon = L.icon({
  iconUrl: logo,
  iconSize: [80, 80],
  iconAnchor: [40, 95],
  popupAnchor: [0, -90]
});

class App extends React.Component {
  state = {
    location: {
      lat: -25.2743988,
      lng: 133.7751312
    },
    haveUserLocation: false,
    zoom: 4,
    userMessage: {
      name: '',
      message: ''
    },
    sendingMessage: false,
    sendMessage: false,
    messages: []
  };

  componentDidMount() {
    getMessages().then(messages => {
      this.setState({
        messages
      });
    });

    getLocation().then(location => {
      this.setState({
        location,
        haveUserLocation: true,
        zoom: 13
      });
    });
  }

  formIsValid = () => {
    let { name, message } = this.state.userMessage;
    name = name.trim();
    message = message.trim();

    const validMessage =
      name.length > 0 &&
      name.length <= 500 &&
      message.length > 0 &&
      message.length <= 500;

    return validMessage && this.state.haveUserLocation ? true : false;
  };

  formSubmitted = event => {
    event.preventDefault();

    if (this.formIsValid()) {
      this.setState({
        sendingMessage: true
      });

      const message = {
        name: this.state.userMessage.name,
        message: this.state.userMessage.message,
        latitude: this.state.location.lat,
        longitude: this.state.location.lng
      };

      sendMessage(message).then(result => {
        setTimeout(() => {
          this.setState({
            sendingMessage: false,
            sendMessage: true
          });
        }, 4000);
      });
    }
  };

  valueChanged = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      userMessage: {
        ...prevState.userMessage,
        [name]: value
      }
    }));
  };

  render() {
    const position = [this.state.location.lat, this.state.location.lng];

    return (
      <div className='map'>
        <Map className='maps' center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm/org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {this.state.haveUserLocation ? (
            <Marker position={position} icon={myIcon} />
          ) : (
            ''
          )}
          {this.state.messages.map(message => (
            <Marker
              key={message._id}
              position={[message.latitude, message.longitude]}
              icon={myIcon}
            >
              <Popup>
                <p>
                  <em>{message.name}:</em> {message.message}
                </p>
                {message.otherMessages
                  ? message.otherMessages.map(message => (
                      <p key={message._id}>
                        <em>{message.name}:</em> {message.message}
                      </p>
                    ))
                  : ''}
              </Popup>
            </Marker>
          ))}
        </Map>
        <MessageCard
          sendingMessage={this.state.sendingMessage}
          sendMessage={this.state.sendMessage}
          haveUserLocation={this.state.haveUserLocation}
          formSubmitted={this.formSubmitted}
          valueChanged={this.valueChanged}
          formIsValid={this.formIsValid}
        />
      </div>
    );
  }
}

export default App;
