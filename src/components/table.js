import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams } from '../redux/actions';
import { toggleShowTeamPanel } from '../redux/reducer';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import SidePanel from './sidePanel';

const Teams = () => {
  const dispatch = useDispatch();
  const { showTeamPanel, searchTeams, teams, isFetching } = useSelector(state => state.teams)
  const [teamsData, setTeamData] = useState(teams)
  const [sortIcon, setSortIcon] = useState('asc');
  const handleShowPanel = (id) => {
    dispatch(toggleShowTeamPanel(id))
  }

  const sortData = () => {
    sortIcon === 'asc' ? setSortIcon('dsc') : setSortIcon('asc')
    const sortedData = sortIcon === 'asc' ? [...teamsData].sort((a, b) => a.city.toLowerCase() > b.city.toLowerCase() ? -1 : -1) : [...teamsData].sort((a, b) => a.city.toLowerCase() > b.city.toLowerCase() ? 1 : -1)
    setTeamData(sortedData)
  }

  useEffect(() => {
    dispatch(getTeams());
  }, [])
  useEffect(() => {
    const data = teams.filter(data => data?.name?.toLowerCase()?.includes(searchTeams?.toLowerCase()))
    setTeamData(data)
  }, [teams, searchTeams])

  return (
    <>
      {
        isFetching ? <span className='d-block text-center fs-1 pt-3'>Loading...</span> : (
          <div>
            <div className='table-responsive-md'>
              <Table striped hover className='mt-5 p-2'>
                <thead className='table-header'>
                  <tr>
                    <th>Team Name</th>
                    <th>City <span className='sort' onClick={sortData} data-testid='sort-id'>{sortIcon === 'asc' ? (<i className="bi bi-caret-down-fill"></i>) : (<i className="bi bi-caret-up-fill"></i>)}</span></th>
                    <th>Abbreviation</th>
                    <th>Conference</th>
                    <th>Division</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    teamsData.length > 0 && teamsData.map(row => (
                      <tr className='table-row' key={row.id} onClick={() => handleShowPanel(row.id)}>
                        <td>{row.name}</td>
                        <td>{row.city}</td>
                        <td>{row.abbreviation}</td>
                        <td>{row.conference}</td>
                        <td>{row.division}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              {
                teamsData.length === 0 && <span className='d-block text-center fs-1 pt-3'>No Data Found</span>
              }
            </div>
            <div className='d-flex justify-content-end'>
              {
                teamsData.length > 0 && (
                  <Pagination>
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Next />
                  </Pagination>
                )
              }
            </div>
            {
              showTeamPanel && <SidePanel />
            }
          </div>
        )
      }
    </>
  )
}

export default Teams;
