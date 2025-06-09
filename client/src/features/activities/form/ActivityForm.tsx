import { Box, Paper, Typography } from "@mui/material";
import { useEffect } from "react";


import { useActivities } from "../../../lib/hooks/useActivities";
import CommonButton from "../../../app/shared/components/common/CommonButton";
import { useNavigate, useParams } from "react-router";
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./CategoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activitySchema";
import type { Activity } from "../../../lib/types";

export default function ActivityForm() {
    const { reset, control, handleSubmit } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const { activity, isLoadingActivity, updateActivity, createActivity } = useActivities(id);

    useEffect(() => {
        if (activity) reset({
            ...activity,
            location: {
                city: activity.city,
                venue: activity.venue,
                longitude: activity.longitude,
                latitude: activity.latitude
            }
        });
    }, [activity, reset]);

    if (isLoadingActivity) return <Typography>Loading...</Typography>

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const onSubmit = (data: ActivitySchema) => {

        const { location, ...rest } = data;
        const flattenData = { ...rest, ...location };
        try {
            if (activity) {
                updateActivity.mutate({ ...activity, ...flattenData }, {

                    onSuccess: () => navigate('/activities/' + activity.id)
                }
                );
            }
            else {
                createActivity.mutate({
                    ...flattenData,
                    isCancelled: false,
                } as Activity, {

                    onSuccess: (id) => navigate('/activities/' + id)
                }
                );
            }
        } catch (error) {
            console.log(error)
        }
        scrollToTop();

    };

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={3}>
                <TextInput label={'Title'} control={control} name='title' />
                <TextInput label={'Dscription'} control={control} name='description' multiline rows={3} />
                <Box display='flex' gap={3}>
                    <SelectInput
                        item={categoryOptions}
                        label={'Category'}
                        control={control}
                        name='category'
                    />
                    <DateTimeInput label={'date'} name='date' control={control} />
                </Box>
                <LocationInput control={control} label='Enter the location' name="location" />




                <Box display="flex" gap={2}>
                    <CommonButton label="Cancel" type="cancel" onClick={() => navigate('/activities')} />
                    <CommonButton
                        label="Submit"
                        type="submit"
                        style={{ minWidth: 120 }}

                    />
                </Box>
            </Box>
        </Paper>
    );
}