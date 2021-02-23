import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../common/header';
import SettingsContainer from './styles/settingsStyle';
import { fetchRooms, fetchUsers, deleteRoom } from '../../actions';
import SingleUserCard from './singleUserCard';

const BACKEND_URL =
  process.env.REACT_APP_DEPLOYED_URL || 'http://localhost:5000';

const AdminSettings = (props) => {
  const [currentMod, setCurrentMod] = useState('Users');

  useEffect(() => {
    props.fetchUsers();
    props.fetchRooms();
  }, []);

  const createRoom = (e) => {
    e.preventDefault();
  };

  const handleDeleteRoom = (id) => {
    props
      .deleteRoom(id)
      .then(() => {
        props.fetchRooms();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header history={props.history} />
      <SettingsContainer>
        <h2>Admin Settings</h2>
        <div className='display-name'>
          <button
            className='update'
            onClick={() => {
              setCurrentMod('Users');
            }}
          >
            Modify Users
          </button>
          <button
            className='update'
            onClick={() => {
              setCurrentMod('Rooms');
            }}
          >
            Modify Rooms
          </button>
          {/* {console.log(user.role_id)} */}
          {/* {console.log(users)} */}
        </div>
        {props.user.role_id === 3 ? (
          currentMod == 'Users' ? (
            <div>
              <h3>Users</h3>
              {props.users.map((item) => {
                return <SingleUserCard key={item.id} user={item} />;
              })}
            </div>
          ) : (
            <div>
              <h3>Rooms</h3>
              <div className='create-new-room'>
                <form onSubmit={createRoom}>
                  <input
                    type='text'
                    id='new-room'
                    name='new-room'
                    placeholder='Room Name'
                  />
                  <button>Create Room</button>
                </form>
              </div>
              {props.rooms.map((item) => {
                return (
                  <div
                    key={item.id}
                    style={{ background: 'grey', margin: '1rem' }}
                  >
                    <h4>{item.room_name}</h4>
                    <p>{item.description}</p>
                    <button>Update Name</button>
                    <button onClick={() => handleDeleteRoom(item.id)}>
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          ''
        )}
      </SettingsContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    rooms: state.rooms,
    users: state.users,
  };
};

export default connect(mapStateToProps, {
  fetchRooms,
  fetchUsers,
  deleteRoom,
})(AdminSettings);
