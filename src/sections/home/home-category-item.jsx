import { Link, Paper, Stack, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { Image } from 'src/components/image';

const HomeCategoryItem = ({ category }) => (
  <Link href={`${paths.product.byCategory(category?.name)}`}>
    <Paper
      // alignItems="center"
      variant="outlined"
      square={false}
      sx={{
        // width: 300,
        //       height: 300,
        paddingX: { xs: 2, md: 4 },
        paddingY: { xs: 2, md: 4 },
        // padding: ,
        // borderRadius: '12px',
        // border: 'gray 5px solid',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        height: '100%',
        ':hover': {
          backgroundColor: (theme) => theme.palette.grey[300],
        },
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          padding: { xs: 1, md: 2 },
          backgroundColor: (theme) => theme.palette.grey[300],
          borderRadius: '100%',
          width: { xs: 50, md: 100 },
          height: { xs: 50, md: 100 },
          mb: { md: 2, xs: 1 },
          overflow: 'hidden',
        }}
      >
        <Image src={category?.image_url} sx={{ width: '100%' }} ratio="1/1" />
      </Stack>
      <Typography
        sx={{
          fontSize: {
            xs: 10,
            md: 16,
          },
        }}
        variant="subtitle1"
        align="center"
      >
        {category.name}
      </Typography>
    </Paper>
  </Link>
);

export default HomeCategoryItem;
