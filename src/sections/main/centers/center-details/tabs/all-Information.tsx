'use client';

import { Box, Card, Container, Divider, ListItemText, Rating, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useSettingsContext } from 'src/components/settings';
import { useTranslate } from 'src/locales';
import i18n from 'src/locales/i18n';
type Props = {
  CenterInfo: any;
};
const AllInformation = ({ CenterInfo }: Props) => {
  const { t } = useTranslate();
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{ margin: 0, padding: '!0px' }}>
      <Card
        sx={{
          minHeight: '100px',
          mb: 2,
          py: 2,
        }}
      >
        <Typography variant="h5" color="secondary" sx={{ px: 4 }}>
          {t('LABEL.ABOUT_CENTER')}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'grid', gridTemplateColumns: '1.2fr  repeat(5, 1fr)', gap: 4, px: 2 }}>
          <ListItemText
            sx={{ gridColumn: 'span', color: 'primary.main' }}
            primary={t('LABEL.DESCRIPTION')}
            secondary={
              i18n.language === 'ar' ? CenterInfo?.description_ar : CenterInfo?.description_en
            }
            secondaryTypographyProps={{ color: 'info.dark', fontSize: '12px' }}
          />
          <ListItemText
            sx={{ gridColumn: 'span', color: 'primary.main' }}
            primary={t('LABEL.WEBSITE')}
            secondary={
              <Link href={`${CenterInfo?.website}`} passHref>
                {CenterInfo?.website}
              </Link>
            }
            secondaryTypographyProps={{ color: 'info.dark', fontSize: '12px' }}
          />
          <ListItemText
            sx={{ gridColumn: 'span', color: 'primary.main' }}
            primary={t('LABEL.LOCATION')}
            secondary={<Link href={CenterInfo?.website}>{CenterInfo?.website}</Link>}
            secondaryTypographyProps={{ color: 'info.dark', fontSize: '12px' }}
          />
          <ListItemText
            sx={{ gridColumn: 'span', color: 'primary.main' }}
            primary={t('LABEL.PHONE')}
            secondary={CenterInfo?.phone}
            secondaryTypographyProps={{
              color: 'info.dark',
              fontSize: '12px',
              dir: 'ltr',
              textAlign: 'left',
            }}
          />
          <ListItemText
            sx={{ gridColumn: 'span', color: 'primary.main' }}
            primary={t('LABEL.COURSES_NUMBER')}
            secondary={CenterInfo?.courses_count}
            secondaryTypographyProps={{ color: 'info.dark', fontSize: '12px' }}
          />
          <ListItemText
            sx={{ gridColumn: 'span', color: 'primary.main' }}
            primary={t('LABEL.LOCATION_DESCRIPTION')}
            secondary={CenterInfo?.place_description}
            secondaryTypographyProps={{ color: 'info.dark', fontSize: '12px' }}
          />
          <ListItemText
            sx={{ gridColumn: 'span', color: 'primary.main' }}
            primary={t('LABEL.FIELDS')}
            secondary={CenterInfo?.center_fields
              .map((field: any) => {
                return field.field.name_ar;
              })
              .join(', ')}
            secondaryTypographyProps={{ color: 'info.dark', fontSize: '12px' }}
          />
          <ListItemText
            sx={{ gridColumn: 'span', color: 'primary.main' }}
            primary={t('LABEL.CITY')}
            secondary={CenterInfo?.neighborhood.city.name_ar}
            secondaryTypographyProps={{ color: 'info.dark', fontSize: '12px' }}
          />
          <ListItemText
            sx={{ gridColumn: 'span', color: 'primary.main' }}
            primary={t('LABEL.NEIGHBORHOOD')}
            secondary={CenterInfo?.neighborhood.name_ar}
            secondaryTypographyProps={{ color: 'info.dark', fontSize: '12px' }}
          />
          <ListItemText
            sx={{ gridColumn: 'span', color: 'primary.main' }}
            primary={t('LABEL.BANK_ACCOUNT')}
            secondary={CenterInfo?.bank_account_number}
            secondaryTypographyProps={{ color: 'info.dark', fontSize: '12px' }}
          />
          <ListItemText
            sx={{ gridColumn: 'span', color: 'primary.main' }}
            primary={t('LABEL.NUMBER_OF_REGISTRANTS')}
            secondary={CenterInfo?.registered_courses_count}
            secondaryTypographyProps={{ color: 'info.dark', fontSize: '12px' }}
          />
          <ListItemText
            sx={{ gridColumn: 'span', color: 'primary.main' }}
            primary={t('LABEL.TOTAL_RATE')}
            secondary={<Rating value={+CenterInfo.average_rate} precision={0.5} readOnly />}
            secondaryTypographyProps={{ color: 'info.dark', fontSize: '12px' }}
          />
        </Box>
      </Card>
      <Card
        sx={{
          minHeight: '300px',
          py: 2,
          m: 0,
          px: 0,
        }}
      >
        <Typography variant="h5" color="secondary" sx={{ px: 4 }}>
          {t('LABEL.IMAGES')}
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Image
            src={CenterInfo?.bank_account_image || '/assets/images/centers/gray.jpeg'}
            width={250}
            height={250}
            alt="image"
            style={{
              borderRadius: '10px',
            }}
          />
          <Image
            src={CenterInfo?.commercial_register || '/assets/images/centers/gray.jpeg'}
            width={250}
            height={250}
            alt="image"
            style={{
              borderRadius: '10px',
            }}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1,
              height: 'fit-content',
            }}
          >
            <Image
              src={CenterInfo?.center_images[0].url || '/assets/images/centers/gray.jpeg'}
              width={120}
              height={120}
              alt="image"
              style={{
                borderRadius: '10px',
              }}
            />{' '}
            <Image
              src={CenterInfo?.center_images[1]?.url || '/assets/images/centers/gray.jpeg'}
              width={120}
              height={120}
              alt="image"
              style={{
                borderRadius: '10px',
              }}
            />{' '}
            <Image
              src={CenterInfo?.center_images[2]?.url || '/assets/images/centers/gray.jpeg'}
              width={120}
              height={120}
              alt="image"
              style={{
                borderRadius: '10px',
              }}
            />{' '}
            <Image
              src={CenterInfo?.center_images[3]?.url || '/assets/images/centers/gray.jpeg'}
              width={120}
              height={120}
              alt="image"
              style={{
                borderRadius: '10px',
              }}
            />
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default AllInformation;
