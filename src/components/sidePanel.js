import React, { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import { toggleShowTeamPanel } from '../redux/reducer';
import { getGames } from '../redux/actions';

const SidePanel = () => {
  const dispatch = useDispatch();
  const { showTeamPanel, showTeamId, teams } = useSelector(state => state.teams)
  const gamesData = useSelector(state => state.games.games)
  const teamName = teams.find(data => data.id === showTeamId)
  const teamData = showTeamId != null && gamesData.find(data => data.home_team.id === showTeamId)
  const totalGames = showTeamId != null && gamesData.filter(data => data.home_team.id === showTeamId)
  const date = showTeamId != null && teamData?.date?.split('T')?.[0]
  const handleClose = () => dispatch(toggleShowTeamPanel(null));
  useEffect(() => {
    dispatch(getGames())
  }, [])

  return (
    <Offcanvas show={showTeamPanel} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{teamData?.home_team?.name ? teamData?.home_team?.name : teamName?.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row>
          <Col>
            <ul className="list-unstyled">
              <li>Team Full Name</li>
              <li>Total Games in 2021</li>
            </ul>
          </Col>
          <Col>
            <ul className="list-unstyled">
              <li>{teamData?.home_team ? teamData?.home_team?.full_name : teamName?.full_name}</li>
              <li>{teamData?.home_team ? totalGames?.length : '-'}</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <div className='mb-3 fw-bold'>
            Random Game Details:
          </div>
          <Col className='game-details'>
            <ul className="list-unstyled fw-bold">
              <li>Date</li>
              <li>Home Team</li>
              <li>Home Team Score</li>
              <li>Visitor Team</li>
              <li>Visitor Team Score</li>
            </ul>
          </Col>
          <Col className='game-details'>
            <ul className="list-unstyled fw-bold">
              <li>{teamData?.home_team ? date : '-'}</li>
              <li>{teamData?.home_team ? teamData?.home_team?.name : '-'}</li>
              <li>{teamData?.home_team ? teamData?.home_team_score : '-'}</li>
              <li>{teamData?.home_team ? teamData?.visitor_team?.name : '-'}</li>
              <li>{teamData?.home_team ? teamData?.visitor_team_score : '-'}</li>
            </ul>
          </Col>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SidePanel;