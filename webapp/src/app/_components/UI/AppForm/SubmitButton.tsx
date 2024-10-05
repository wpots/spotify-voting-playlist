'use client';

import { Button } from '@mui/material';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  buttonText: string;
};

export default function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 2 }}>
      {props.buttonText}
    </Button>
  );
}
