import State from '../../hooks/State';
import Effect from '../../hooks/Effect';
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <div>
        <h1>About Page</h1>
        <Link to='/state'>UserState Example</Link>
        <br />
        <Link to='/form'>Form Example</Link>
        <br />
        <Link to='/Effect'>Effect</Link>
    </div>
  )
}

export default About