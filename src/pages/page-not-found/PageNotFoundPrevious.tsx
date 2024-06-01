import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PageNotFoundPrevious = () => {
    const navigate = useNavigate();

    const handlePrevious = () => {
        navigate(-1);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Typography
                variant="h1"
                className="text-6xl font-bold text-gray-800 mb-4"
            >
                404
            </Typography>
            <Typography variant="h5" className="text-2xl text-gray-600 mb-8">
                Oops! Page not found.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handlePrevious}
            >
                Go to previous
            </Button>
        </div>
    );
};

export default PageNotFoundPrevious;
