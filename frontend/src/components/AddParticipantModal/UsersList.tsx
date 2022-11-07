import { PlanType, UserType } from '../../types';
import { toast } from 'react-toastify';
import { useManageParticipation } from '../../queries/plans/useManageParticipation';
import { useState } from 'react';
import { useUsersData } from '../../queries/useUsersData';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
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
          <TextField {...params} label='Type name to select' placeholder='more entries' />
        )}
        sx={{ width: '500px' }}
        onChange={(event, value) => setSelectedUsers(value)}
      />

      <Button
        variant='contained'
        style={{ marginTop: 15 }}
        disabled={selectedUsers.length <= 0}
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
    </>
  );
}
