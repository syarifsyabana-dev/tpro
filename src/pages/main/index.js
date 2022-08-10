import React, { useState } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { Button, Col, Row, Space, Typography } from 'antd';

const { Text } = Typography;
const markerImg = `${window.location.origin}/marker.png`;

const mapStyles = {
  width: '100vw',
  height: '100vh',
};

const MainPage = ({ google }) => {
  const [location, setLocation] = useState([process.env.REACT_APP_LAT, process.env.REACT_APP_LONG])
  const [senderAddress, setSenderAddress] = useState('')

  const handlePosition = (ref, map, ev) => {
    const geocoder = new ref.google.maps.Geocoder;
    const latlng = { lat: ev.latLng.lat(), lng: ev.latLng.lng() }
    geocoder.geocode({ 'location': latlng }, (res, stat) => {
      if (stat === 'OK') {
        setSenderAddress(res[0].formatted_address)
      }
    });

    setLocation([ev.latLng.lat(), ev.latLng.lng()])
  }

  return (
    <div className='main'>
      <div>
        <Map
          google={google}
          zoom={15}
          style={mapStyles}
          initialCenter={{ lat: location[0], lng: location[1] }}
        >
          <Marker
            position={{ lat: location[0], lng: location[1] }}
            draggable
            icon={{
              url: markerImg,
              // anchor: new google.maps.Point(32, 32),
              scaledSize: new google.maps.Size(50, 50)
            }}
            onDragend={handlePosition}
          />
        </Map>
      </div>

      <div className='akun'>
        <Row gutter={7.5} align="middle">
          <Col span={18}>
            <div>
              <strong>
                Muhamad Syarif Sya'bana
              </strong>
            </div>
            <Text type="secondary" style={{ fontSize: '.8rem' }}>
              {process.env.REACT_APP_USER}
            </Text>
          </Col>
          <Col span={6}>

            <Button
              type='primary'
              className='button-100'
              danger
            >
              LogOut
            </Button>
          </Col>
        </Row>
      </div>

      <div className='checkbutton'>
        <div style={{ marginBottom: '.5rem' }}>
          <Text type="secondary" style={{ fontSize: '.6rem' }}>
            LatLong: {`${location[0]}, ${location[0]}`}
          </Text>
        </div>

        <Row gutter={7.5}>
          <Col span={12}>
            <Button
              type='primary'
              className='button-100'
            >
              Check In
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type='primary'
              className='button-100'
              danger
            >
              Check Out
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyANh0YzZG-vsBwun96VJTXO6OGqnjIpzCE' })(MainPage);