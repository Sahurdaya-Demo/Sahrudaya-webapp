import { Home} from "./components";

import { useEffect, useState } from "react";
const Main=()=>{
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show the loading screen
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
       <link rel='stylesheet'type='text/css' href='../../../Homecss/style.css'></link>
      {loading ? (
        <div className="loading-screen">
          <img src="loading.gif" alt="Loading" />
        </div>
      ) : (
      <Home/>
    )}
    </>
    )
    
}

export default Main;