import { useEffect, useState } from 'react';


const useFetch=(url: string) => {

    const [data, setData] = useState(null);
    const  [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const abortCont = new AbortController();
        fetch(url, {signal:abortCont.signal})
            .then(res => {
                if (!res.ok){
                    throw Error('Unable to fetch required data for that resource')
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch( err => {
                if(err.name === 'AbortError') {
                    console.log('fetch aborted');
                }
                else{
                    setIsPending(false);
                    setError(err.message);
                }
            });

            return () => abortCont.abort();
    });

    return { data, isPending, error};

};

export default useFetch;