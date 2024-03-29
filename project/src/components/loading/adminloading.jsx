import Admin from "../admin/Admin";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Adminloading=()=>
{
  const navigate=useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  // console.log(location.state.token1)
  useEffect(() => {
    if(sessionStorage.getItem('type')==='counselor')
    {
      navigate('*')
    }
    // Simulate a delay to show the loading screen
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
    <link rel='stylesheet'type='text/css' href='../../../admincss/styles.css'></link>
    {/* <link rel='stylesheet' type='text/css' href='../../../empcss/styles.css'></link> */}
      {loading ? (
       
        <div className="loading-screen">
          <img src="../../../loading.gif" alt="Loading" />
        </div>
      ) : (
        
      <Admin/>
    )}
    
    </>
    )
}
export default  Adminloading;