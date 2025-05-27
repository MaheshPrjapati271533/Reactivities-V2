import { Box, Paper, TextField, Typography } from "@mui/material";
import { type FormEvent } from "react";
import { toast } from 'react-toastify';

import { useActivities } from "../../../lib/hooks/useActivities";
import CommonButton from "../../../app/shared/components/common/CommonButton";
import { useNavigate, useParams } from "react-router";



export default function ActivityForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
    if (isLoadingActivity) return <Typography>Loading...</Typography>

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });
        scrollToTop();
        try {
            if (activity) {
                data.id = activity.id;
                await updateActivity.mutateAsync(data as unknown as Activity);
                toast.success("Activity updated successfully!");
                navigate('/activities/' + activity.id)
            } else {
                createActivity.mutateAsync(data as unknown as Activity, {
                    onSuccess: (id) => {
                        toast.success("Activity created successfully!");
                        navigate('/activities/' + id)
                    }
                });


            }



        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
        }
    };

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
                <TextField name="title" label="Title" defaultValue={activity?.title} required />
                <TextField name="description" label="Description" multiline rows={3} required defaultValue={activity?.description} />
                <TextField name="category" label="Category" defaultValue={activity?.category} required />
                <TextField
                    name="date"
                    label="Date"
                    type="date"
                    defaultValue={
                        activity?.date
                            ? new Date(activity.date).toISOString().split('T')[0]
                            : new Date().toISOString().split('T')[0]
                    }
                    required
                />
                <TextField name="city" label="City" defaultValue={activity?.city} required />
                <TextField name="venue" label="Venue" defaultValue={activity?.venue} required />

                <Box display="flex" gap={2}>
                    <CommonButton label="Cancel" type="cancel" onClick={() => navigate('/activities')} />
                    <CommonButton
                        label="Submit"
                        type="submit"
                        style={{ minWidth: 120 }}
                        onClick={undefined} // handled by form
                    />
                </Box>
            </Box>
        </Paper>
    );
}