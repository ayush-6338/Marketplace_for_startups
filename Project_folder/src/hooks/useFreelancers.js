import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

const useFreelancers = () => {
    const [freelancers, setFreelancers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiClient
            .get('/users/freelancers')
            .then(res => setFreelancers(res.data))
            .catch(() => console.error('Failed to fetch freelancers'))
            .finally(() => setLoading(false));
    }, []);

    return { freelancers, loading };
};

export default useFreelancers;
