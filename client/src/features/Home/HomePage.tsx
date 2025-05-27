import { Group } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import CommonButton from "../../app/shared/components/common/CommonButton";
import { useNavigate } from "react-router";

export default function HomePage() {
    const navigate = useNavigate();
    return (
        <Paper
            sx={{
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundImage: 'linear-gradient(135deg,#182a73 0%, #218aae 69%, #20a7ac 89%)'

            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
                color: 'white', gap: 3
            }}>
                <Group sx={{ height: 110, width: 110 }} />
                <Typography variant="h1">Reactivities</Typography>

            </Box>
            <Typography variant="h2"> Wel Come to reactivities</Typography>
            <CommonButton label="Take me to activities !" type="submit" style={{ height: 80, borderRadius: 4, fontSize: '1.5rem' }}
                onClick={() => navigate('/activities')}
            ></CommonButton>
        </Paper>
    )
}
