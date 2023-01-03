import {isFetchingTeams, isSuccessTeams, isFailTeams, isFetchingGames, isSuccessGames, isFailGames} from './reducer'

export const getTeams = () => async (dispatch) => {
  dispatch(isFetchingTeams())
  try{
    const response = await fetch('https://www.balldontlie.io/api/v1/teams')
    const body = await response.json()
    dispatch(isSuccessTeams(body.data))
  } catch{
    const errMsg = 'Something Went wrong. Please Try again'
    dispatch(isFailTeams(errMsg))
  }
};

export const getGames = () => async (dispatch) => {
    dispatch(isFetchingGames())
    try{
      const response = await fetch('https://www.balldontlie.io/api/v1/games')
      const body = await response.json()
      dispatch(isSuccessGames(body.data))
    } catch{
      const errMsg = 'Something Went wrong. Please Try again'
      dispatch(isFailGames(errMsg))
    }
};
