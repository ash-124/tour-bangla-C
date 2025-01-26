import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Package = async () => {
    const axiosPublic = useAxiosPublic();
    // TO:DO
    // remove async and use tanstack query to get package data
    const {data} = await axiosPublic.get('/packages');
    console.log(data)
    return (
        <div>
            packages
        </div>
    );
};

export default Package;