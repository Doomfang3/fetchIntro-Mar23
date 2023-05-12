import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [launches, setLaunches] = useState([]);
  const [needRefresh, setNeedRefresh] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.spacexdata.com/v4/launches"
      );
      console.log(response.status);
      if (response.status === 200) {
        setLaunches(response.data);
        setNeedRefresh(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (needRefresh) {
      fetchData();
    }
  }, [needRefresh]);

  return (
    <>
      <button
        type="button"
        onClick={() => setNeedRefresh(true)}
        disabled={needRefresh}
      >
        Refresh
      </button>
      {launches.map((launch) => (
        <h2>Launch Succeeded: {launch.success ? "Yes" : "No"}</h2>
      ))}
    </>
  );
}

export default App;
