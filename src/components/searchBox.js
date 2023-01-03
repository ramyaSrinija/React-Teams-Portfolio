import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import { searchTeams } from '../redux/reducer';

function SearchBox() {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(searchTeams(e.target.value))
  }
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="search">
          <i className="bi bi-search"></i>
        </InputGroup.Text>
        <Form.Control
          aria-label="Search"
          aria-describedby="search"
          id="search-input"
          onChange={handleChange}
        />
      </InputGroup>
    </>
  );
}

export default SearchBox;