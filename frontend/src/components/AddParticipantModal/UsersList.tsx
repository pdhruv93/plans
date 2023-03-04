import { PlanType, UserType } from '../../types';
import { firebaseAuth } from '../../firebase';
import { toast } from 'react-toastify';
import { useManageParticipation } from '../../queries/plans/useManageParticipation';
import { useState } from 'react';
import { useUsersData } from '../../queries/useUsersData';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function UsersList({ plan }: { plan: PlanType }) {
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const { data: users } = useUsersData();
  const { mutate: manageParticipation } = useManageParticipation();

  return (
    <>
      <Autocomplete
        multiple
        limitTags={2}
        id='multiple-limit-tags'
        options={users?.filter((user) => !plan.attendees.includes(user.userId)) || []}
        getOptionLabel={(option) => `${option.name} (${option.email})`}
        isOptionEqualToValue={(option, value) => option.email === value.email}
        renderInput={(params) => (
          <TextField {...params} fullWidth label='Type name to select' placeholder='more entries' />
        )}
        sx={{ width: '100%' }}
        onChange={(event, value) => setSelectedUsers(value)}
      />

      <Stack direction='row' spacing={1} style={{ marginTop: 15 }}>
        <Button
          variant='contained'
          disabled={selectedUsers.length <= 0 || plan.attendees?.length >= plan.maxAttendees}
          onClick={() => {
            manageParticipation({
              plan,
              userIdsToAdd: selectedUsers.map((user) => user.userId),
            });

            toast.success(`Successfully added ${selectedUsers.length} participant to plan!!`);
          }}
        >
          Add participants
        </Button>

        <Button
          variant='contained'
          color='primary'
          disabled={plan.attendees?.length >= plan.maxAttendees}
          onClick={() => {
            manageParticipation({
              plan,
              userIdsToAdd: [
                `Anonymous${
                  plan.attendees?.filter((attendee) => attendee.startsWith('Anonymous')).length + 1
                }:${firebaseAuth?.currentUser?.uid}`,
              ],
            });

            toast.success('Successfully added 1 anonymous participant to plan!!');
          }}
        >
          +1
        </Button>
      </Stack>
    </>
  );
}
