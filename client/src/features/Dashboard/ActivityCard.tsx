import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import { useActivities } from "../../lib/hooks/useActivities";
import { Link } from "react-router";

type Props = {
    activity: Activity


}
export default function ActivityCard({ activity, }: Props) {
    const { deleteActivity } = useActivities();
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography sx={{ color: 'text.secondray', mb: 1 }}>{activity.date}</Typography>
                <Typography variant="body2">{activity.description}</Typography>
                <Typography variant="subtitle1">{activity.city}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                <Chip label={activity.category} variant="outlined" />
                <Box display='flex' gap={3}>
                    <Button component={Link} to={'/activities/' + activity.id} size="medium" variant="contained">View</Button>
                    <Button onClick={() => (confirm('Are you sure you want to remove ?') ? deleteActivity.mutate(activity.id) : '')} size="medium" color="error"
                        variant="contained">Delete</Button>
                </Box>
            </CardActions>
        </Card>
    )
}
