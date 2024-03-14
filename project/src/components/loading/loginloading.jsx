import Login from "../login/Login";
import { useEffect, useState } from "react";
const Loginloading=()=>
{
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
      {loading ? (
        <div className="loading-screen">
          <img src="loading.gif" alt="Loading" />
        </div>
      ) : (
      <Login/>
    )}
    </>
    )
}
export default Loginloading;