import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams } from '../redux/actions';
import { toggleShowTeamPanel } from '../redux/reducer';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import SidePanel from './sidePanel';

const Teams = () => {
  const dispatch = useDispatch();
  const { showTeamPanel, searchTeams, teams, isFetching, showTeamId } = useSelector(state => state.teams)
  const [teamsData, setTeamData] = useState(teams)
  const [sortIcon, setSortIcon] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 5;
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const [lastPage, setLastPage] = useState(6);
  const handleShowPanel = (id) => {
    dispatch(toggleShowTeamPanel(id))
  }

  const sortData = () => {
    sortIcon === 'asc' ? setSortIcon('dsc') : setSortIcon('asc')
    const sortedData = sortIcon === 'asc' ? [...teamsData].sort((a, b) => a.city.toLowerCase() > b.city.toLowerCase() ? -1 : -1) : [...teamsData].sort((a, b) => a.city.toLowerCase() > b.city.toLowerCase() ? 1 : -1)
    setTeamData(sortedData)
  }

  const nextPage = () => {
    if (currentPage !== lastPage) setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1)
  }

  useEffect(() => {
    dispatch(getTeams());
  }, [])

  useEffect(() => {
    const data = teams.filter(data => data?.name?.toLowerCase()?.includes(searchTeams?.toLowerCase()));
    setLastPage(() => Math.ceil(data.length / teamsPerPage));
    const displayData = data.slice(indexOfFirstTeam, indexOfLastTeam);
    setTeamData(displayData);
  }, [teams, searchTeams, currentPage])

  useEffect(() => {
    if (currentPage > lastPage) setCurrentPage(1);
  }, [currentPage, lastPage])

  return (
    <>
      {
        isFetching ? <span className='d-block text-center fs-1 pt-3'>Loading...</span> : (
          <div>
            <div className='table-responsive-md'>
              <Table hover className='mt-5 p-2'>
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
                      <tr className={showTeamId === row.id ? 'table-row-higlight' : 'table-row'} key={row.id} onClick={() => handleShowPanel(row.id)}>
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
                    <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} data-testid="prev" />
                    <Pagination.Item>{currentPage}</Pagination.Item>
                    <Pagination.Next onClick={nextPage} disabled={currentPage === lastPage} data-testid="next" />
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
