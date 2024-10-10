import { Typography, Avatar, Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Comfortaa } from 'next/font/google';
import { grey } from '@mui/material/colors';
// https://mui.com/material-ui/customization/color/

const headerFont = Comfortaa({
  subsets: ['latin'],
  display: 'swap',
});

type AppBannerProps = {
  title: string;
  subTitle?: string;
  avatar?: string;
};
export default function AppBanner(props: PropsWithChildren<AppBannerProps>) {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      sx={{ px: '2rem', backgroundColor: grey[200], m: '.5rem', mb: '2rem' }}
    >
      <Typography component='h1' variant='h4' sx={{ p: '1rem', textAlign: 'center' }} className={headerFont.className}>
        {props.title}
      </Typography>
      {props.subTitle && (
        <Typography
          component='p'
          variant='subtitle1'
          sx={{ p: '1rem', textAlign: 'center' }}
          className={headerFont.className}
        >
          {props.subTitle}
        </Typography>
      )}
      {props.avatar && <Avatar src={props.avatar} sx={{ width: 72, height: 72, mb: '-1rem' }} variant='rounded' />}
    </Box>
  );
}
