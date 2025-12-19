import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

const useGigs = () => {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiClient
            .get('/gigs')
            .then(res => setGigs(res.data))
            .catch((err) => {
                console.error('Failed to fetch gigs', err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, []);

    return { gigs, loading, error };
};

export default useGigs;
