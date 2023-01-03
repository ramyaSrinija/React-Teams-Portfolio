import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import SearchBox from './components/searchBox';
import Teams from './components/table';

const App = () => {
  const teamsError = useSelector(state => state.teams.error);
  const gamesError = useSelector(state => state.games.error);
  return (
    <>
      {
        teamsError || gamesError ? <span className='d-block text-center fs-1 pt-3'>Something went wrong. Please try again</span> : (
          <Container className='mt-4 app'>
            <h1 className='nba-teams'>NBA TEAMS</h1>
            <SearchBox />
            <Teams />
          </Container>
        )
      }
    </>
  );
}

export default App;
