import React from 'react';
import { func, number, string } from 'prop-types';
import { contains } from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Button from 'components/controls/button';
import mapStateToProps from './selector/mapStateToProps';
import mapDispatchToProps from './actions/mapDispatchToProps';

import './currentPlayerHeader.scss';

const CurrentPlayerHeader = ({ currentPlayer, endTurn }) => {
  const username = currentPlayer.get('username');
  const money = currentPlayer.getIn(['status', 'money']);
  const specialPoints = currentPlayer.getIn(['status', 'specialPoints']);
  const className = classNames('current-player-header');

  return (<div className={className} >
    <div className="user">
      <div className="avatar" >
        <img alt={`${username} Avatar`} src={currentPlayer.get('avatarUrl')} />
      </div>
      <div className="username" >{username}</div>
    </div>
    <div className="status" >
      <div className="money">{money}</div>
      <div className="special-points">{specialPoints}</div>
      <div className="end-turn-button">
        <Button onClick={endTurn} className="end-turn-button" disabled={false} text="End Turn" />
      </div>
    </div>
  </div>);
};

CurrentPlayerHeader.propTypes = {
  currentPlayer: contains({
    username: string.isRequired,
    avatarUrl: string.isRequired,
    status: contains({
      money: number.isRequired,
      specialPoints: number.isRequired,
    }),
  }).isRequired,
  endTurn: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPlayerHeader);
