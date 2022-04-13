
import { useState, useEffect } from "react";
const useFetch = (url) => {
    const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
      const abortCont = new AbortController();
      setTimeout(() => { // give some of seconds to laoding massage as write before
          fetch(url ,{ signal: abortCont.signal })
          .then(res => { //response
            if (!res.ok) { // error coming back from server
              throw Error('could not fetch the data for that resource');
            } 
            return res.json();
          })
          .then(data => { //in the case of appearing data another not found 
            setIsPending(false);
            setData(data);
            setError(null);
          })
          .catch(err => { // that mean there are two type of massage for two case
            // auto catches network connection error
            if(err.name==='AbortError'){
            console.log('fetch aborted')
            }else{
              setIsPending(false);
              setError(err.message);
            } 
          })
        }, 1000);
        return () => abortCont.abort();// not US
      }, [url]);

      return {data ,isPending , error};
}
export default useFetch;