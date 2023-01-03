import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import { renderWithStore } from './utils';
import Teams from '../components/table';
import rootReducer from '../redux/reducer';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockData = {
  teams: {
    isFetching: false,
    teams: [
      { id: 15, abbreviation: "CLT", city: "Boston", conference: "East", division: "Atlantic", full_name: "Boston Celtics", name: "Celtics" },
      { id: 14, abbreviation: "LAL", city: "Los Angeles", conference: "West", division: "Pacific", full_name: "Los Angeles Lakers", name: "Lakers" },
    ],
    searchTeams: '',
    showTeamPanel: false,
    showTeamId: 15
  }
};

const sidePanelMockData = {
  teams: {
    isFetching: false,
    teams: [
      { id: 14, abbreviation: "LAL", city: "Los Angeles", conference: "West", division: "Pacific", full_name: "Los Angeles Lakers", name: "Lakers" },
      { id: 15, abbreviation: "CLT", city: "Boston", conference: "East", division: "Atlantic", full_name: "Boston Celtics", name: "Celtics" }
    ],
    searchTeams: '',
    showTeamPanel: true,
    showTeamId: 15
  },
  games: {
    games: [{ home_team: { id: 15, full_name: 'Boston Celtics', name: 'Celtics', visitor_team: { name: '76ers' } }, visitor_team_score: 87, home_team_score: 105 }]
  }
};


const TestTable = () => {
  describe('Test table component', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
      useSelector.mockImplementation((selector) => selector(sidePanelMockData));
      useDispatch.mockReturnValue(jest.fn());
      renderWithStore(
        <Teams />,
        {
          reducer: rootReducer
        }
      );
    })
    test('test to check sorting click event', () => {
      const sortElement = screen.getByTestId('sort-id');
      fireEvent.click(sortElement);
      expect(document.getElementsByClassName('bi-caret-up-fill')[0]).toBeInTheDocument();
      fireEvent.click(sortElement);
      expect(document.getElementsByClassName('bi-caret-down-fill')[0]).toBeInTheDocument();
    });
    test('test to check row click event', () => {
      const rowElement = screen.getAllByText('Celtics')[0];
      fireEvent.click(rowElement);
      expect(screen.getByText('Home Team Score')).toBeInTheDocument();
    });
  });
};

TestTable();

const TestTableNoData = (dataObj) => {
  describe('Test table component', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector(dataObj));
      useDispatch.mockReturnValue(jest.fn());
      renderWithStore(
        <Teams />,
        {
          reducer: rootReducer
        }
      );
    })
    if (dataObj.teams.isFetching) {
      test('test to text when isFetching is true', () => {
        const textElement = screen.getByText('Loading...');
        expect(textElement).toBeInTheDocument();
      });
    } else {
      test('test to text No data', () => {
        const textElement = screen.getByText('No Data Found');
        expect(textElement).toBeInTheDocument();
      });
    }
  })
}

TestTableNoData({ teams: { isFetching: true, teams: [], showTeamPanel: false, searchTeams: '' } });
TestTableNoData({ teams: { isFetching: false, teams: [], showTeamPanel: false, searchTeams: '' } });