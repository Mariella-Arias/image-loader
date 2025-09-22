import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const fetchApi = async () => {
    const res = await axios.get('http://localhost:3000/');
    console.log(res.data);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return <>Hello World</>;
}

export default App;
