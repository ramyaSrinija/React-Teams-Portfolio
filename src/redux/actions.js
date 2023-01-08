import { isFetchingTeams, isSuccessTeams, isFailTeams, isFetchingGames, isSuccessGames, isFailGames } from './reducer'

export const getTeams = () => async (dispatch) => {
  dispatch(isFetchingTeams())
  try {
    const response = await fetch('https://www.balldontlie.io/api/v1/teams')
    if (response.ok) {
      const body = await response.json()
      dispatch(isSuccessTeams(body.data))
    } else {
      const errMsg = `Something Went wrong. Please Try again (${response.status} ${response.statusText})`
      dispatch(isFailTeams(errMsg))
    }
  } catch (err) {
    dispatch(isFailTeams(err.message))
  }
};

export const getGames = () => async (dispatch) => {
  dispatch(isFetchingGames())
  try {
    const response = await fetch('https://www.balldontlie.io/api/v1/games')
    if (response.ok) {
      const body = await response.json()
      dispatch(isSuccessGames(body.data))
    } else {
      const errMsg = `Something Went wrong. Please Try again (${response.status} ${response.statusText})`
      dispatch(isFailGames(errMsg))
    }
  } catch (err) {
    dispatch(isFailGames(err.message))
  }
};
