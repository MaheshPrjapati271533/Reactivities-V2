// src/components/GlobalLoader.tsx
import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';
import { useLoader } from '../Loader';


const GlobalLoader: React.FC = () => {
    const { loading } = useLoader();

    return (
        <Backdrop open={loading} sx={{ color: '#fff', zIndex: 1300 }}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default GlobalLoader;
