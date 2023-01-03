import {createSlice, combineReducers} from '@reduxjs/toolkit';

const teamsIntialState = {
    teams: [],
    error: null,
    isFetching: true,
    showTeamPanel: false,
    searchTeams: '',
    showTeamId: null,
}

const gamesIntialState = {
    games: [],
    error: null,
    isFetching: true,
}

const teamsReducer = createSlice({
    name: 'teams',
    initialState: teamsIntialState,
    reducers: {
        toggleShowTeamPanel: (state, action) => {
            state.showTeamPanel = !state.showTeamPanel
            state.showTeamId = action.payload
        },
        searchTeams: (state, action) => {
           state.searchTeams = action.payload
        },
        isFetchingTeams: (state) => {
            state.isFetching = true
        },
        isSuccessTeams: (state, action) => {
            state.isFetching = false;
            state.teams = action.payload
        },
        isFailTeams: (state, action) => {
            state.isFetching = false;
            state.error = action.payload
        }
    }
});

const gamesReducer = createSlice({
    name: 'games',
    initialState: gamesIntialState,
    reducers: {
        isFetchingGames: (state) => {
            state.isFetching = true
        },
        isSuccessGames: (state, action) => {
            state.isFetching = false;
            state.games = action.payload
        },
        isFailGames: (state, action) => {
            state.isFetching = false;
            state.error = action.payload
        }
    }
});


const rootReducer = combineReducers({
    teams: teamsReducer.reducer,
    games: gamesReducer.reducer,
});

export const {isFetchingGames, isSuccessGames, isFailGames} = gamesReducer.actions;
export const {isFetchingTeams, isSuccessTeams, isFailTeams, toggleShowTeamPanel, searchTeams} = teamsReducer.actions;

export default rootReducer;