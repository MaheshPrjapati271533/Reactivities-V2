import { Avatar, Box, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material"
// import { useActivities } from "../../lib/hooks/useActivities";
import { Link, useNavigate } from "react-router";
import CommonButton from "../../app/shared/components/common/CommonButton";
import { AccessTime, Place } from "@mui/icons-material";
//import { format } from 'date-fns'
import { formatDate } from "../../lib/util/util";
import { useActivities } from "../../lib/hooks/useActivities";
type Props = {
    activity: Activity


}
export default function ActivityCard({ activity, }: Props) {
    const { deleteActivity } = useActivities();
    const navigate = useNavigate();

    const isHost = false;
    const isGoing = false;
    const label = isHost ? 'You are hosting' : 'You are going';
    const isCancelled = false;
    const colors1 = isHost ? 'secondary' : (isGoing ? 'warning' : 'default');


    return (
        <Card sx={{ borderRadius: 3 }} elevation={3}>

            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <CardHeader
                    avatar={<Avatar sx={{ height: 80, width: 80 }} />}
                    title={activity.title}
                    titleTypographyProps={{ fontWeight: 'bold', fontSize: 20 }}
                    subheader={
                        <>
                            Hosted By{''} <Link to={'/profiles/bob'}>Bob</Link>
                        </>
                    }
                />

                <Box display='flex' flexDirection='column' gap={2} mr={2}>
                    {(isHost || isGoing) && <Chip label={label} color={colors1} sx={{ borderRadius: 2 }} />}
                    {isCancelled && <Chip label={label} color='error' sx={{ borderRadius: 2 }} />}
                </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <CardContent>
                <Box display='flex' alignItems='center' mb={2} px={2}>
                    <Box display='flex' flexGrow={0} alignItems='center' >
                        <AccessTime sx={{ mr: 1 }} />
                        <Typography variant="body2" noWrap>
                            {formatDate(activity.date)}
                        </Typography>
                    </Box>
                    <Place sx={{ ml: 3, mr: 1 }} />
                    <Typography variant="body2">{activity.venue}</Typography>

                </Box>
                <Divider />
                <Box display='flex' gap={2} sx={{ backgroundColor: 'lightgray', py: 3, pl: 3 }}>
                    Attendees go here
                </Box>
            </CardContent>
            <CardContent sx={{ pb: 2 }}>
                <Typography variant="body2">
                    {activity.description}
                </Typography>
                <CommonButton label="View" style={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3 }} type="submit" onClick={() => navigate('/activities/' + activity.id)}  ></CommonButton>
                <CommonButton label="Delete" style={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3 }} type="delete" onClick={() => (confirm('Are you sure you want to remove ?') ? deleteActivity.mutate(activity.id) : '')} ></CommonButton>

            </CardContent>


            {/* <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography sx={{ color: 'text.secondray', mb: 1 }}>{activity.date}</Typography>
                <Typography variant="body2">{activity.description}</Typography>
                <Typography variant="subtitle1">{activity.city}</Typography>
            </CardContent> */}
            {/* <Button component={Link} to={'/activities/' + activity.id} size="medium" variant="contained">View</Button> 
                     <Button  size="medium" color="error" onClick={() => (confirm('Are you sure you want to remove ?') ? deleteActivity.mutate(activity.id) : '')}
                        variant="contained">Delete</Button> */}
        </Card>


    )
}
