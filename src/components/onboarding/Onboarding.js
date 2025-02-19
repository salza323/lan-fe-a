import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser, setTrack } from '../../store/actions';
import OnboardingContainer from './styles/onboardingStyle';

const Onboarding = props => {
  const [tracks, setTracks] = useState([
    { track: 'WEB', value: false },
    { track: 'DS', value: false },
    { track: 'iOS', value: false },
    { track: 'UX', value: false },
    { track: 'AND', value: false },
    { track: 'None', value: false}
  ]);
  const [error, setError] = useState('');

  useEffect(() => {
    props.fetchUser();
    console.log('PROPS IN ONBOARDING COMPONENT', props);
  }, []);

  useEffect(() => {
    setTracks(tracks.map(item => item.track === props.user.track ? { ...item, value: true } : { ...item, value: false }));
  }, [props.user]);

  const onClick = track => {
    setTracks(tracks.map(item => item.track === track ? { ...item, value: true } : { ...item, value: false }));
  };

  const onSubmit = () => {
    if (!tracks.find(item => item.value === true)) {
      setError('No track chosen');
    } else {
      props.setTrack(tracks.find(item => item.value === true).track, null)
        .then(() => props.history.push('/'))
        .catch(error => console.log(error));
    };
  };

  return (
    <OnboardingContainer tracks={tracks}>
      {props.user.displayName && <h1>{props.user.displayName.split(' ')[0]}, what track are you in?</h1>}
      <p className='instructions'>In the future we plan to make resources relevent to your track more readily available. If you are not in any cohort, choose None.</p>
      <div className='tracks'>
        <button className='track' onClick={() => onClick('WEB')}>Web Development</button>
        <button className='track' onClick={() => onClick('DS')}>Data Science</button>
        <button className='track' onClick={() => onClick('iOS')}>iOS</button>
        <button className='track' onClick={() => onClick('UX')}>UX Design</button>
        <button className='track' onClick={() => onClick('AND')}>Android</button>
        <button className='track' onClick={() => onClick('None')}>None</button>
      </div>
      <div className='continue'>
        <p className='error'>{error}</p>
        <button onClick={onSubmit}>Continue<i className='fas fa-chevron-right'></i></button>
      </div>
    </OnboardingContainer>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { fetchUser, setTrack })(Onboarding);
