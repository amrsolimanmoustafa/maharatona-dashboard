'use client';

import Container from '@mui/material/Container';
import { useTranslate } from 'src/locales';
import { useSettingsContext } from 'src/components/settings';
import { Avatar, Box, Button, Card, Divider, Grid, Stack, Typography } from '@mui/material';
import FormProvider from 'src/components/hook-form';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SharedTable from 'src/CustomSharedComponents/SharedTable/SharedTable';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import { IBanner, IBannerCenter } from 'src/types/banners';
import { fDate } from 'src/utils/format-time';
import { BannerCenterDialog } from './banner-center-dialog';
import { editCenterMediaStatus } from 'src/actions/banners';

type props = {
  centers: IBannerCenter[];
  banner: IBanner;
  count: number;
};

const SingleBannerView = ({ centers, count, banner }: Readonly<props>) => {
  const settings = useSettingsContext();
  const { t } = useTranslate();
  const confirmActivate = useBoolean();
  const confirmDeactivate = useBoolean();
  const searchParams = useSearchParams();
  const router = useRouter();
  const open = useBoolean();
  const [selectedCenter, seSelectedCenter] = useState<IBannerCenter | undefined>(undefined);

  const TABLE_HEAD = [
    { id: 'center_name', label: 'LABEL.CENTER_NAME' },
    { id: 'center_phone', label: 'LABEL.PHONE_NUMBER' },
    { id: 'center_website', label: 'LABEL.WEBSITE' },
    { id: 'created_at', label: 'LABEL.SUBSCRIPTION_DATE' },
    { id: 'expires_at', label: 'LABEL.EXPIRY_DATE' },
    { id: '', label: 'LABEL.SETTINGS' },
  ];
  const { enqueueSnackbar } = useSnackbar();

  const pathname = usePathname();

  /*
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
        localStorage.setItem(name, value);
      } else {
        params.delete(name);
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );
 */
  const handleConfirmActivate = async () => {
    const res = await editCenterMediaStatus(selectedCenter);
    if (res?.error) {
      enqueueSnackbar(`${res?.error}`, { variant: 'error' });
    } else {
      enqueueSnackbar(t('MESSAGE.ACTIVATED_SUCCESSFULLY'), {
        variant: 'success',
      });
      confirmActivate.onFalse();
    }
  };
  const handleConfirmDeactivate = async () => {
    const res = await editCenterMediaStatus(selectedCenter);
    if (res?.error) {
      enqueueSnackbar(`${res?.error}`, { variant: 'error' });
    } else {
      enqueueSnackbar(t('MESSAGE.DEACTIVATED_SUCCESSFULLY'), {
        variant: 'success',
      });
      confirmDeactivate.onFalse();
    }
  };
  return (
    <>
      <Container
        maxWidth={settings.themeStretch ? false : 'xl'}
        sx={{ margin: '0px !important', padding: '0px !important' }}
      >
        <Card sx={{ p: 4 }}>
          <Typography color="secondary" variant="h4">
            {t('LABEL.BANNERS_TITLE')}
          </Typography>
          <Divider sx={{ my: 3 }} />

          <Box
            rowGap={5}
            display="grid"
            alignItems="center"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <Stack sx={{ typography: 'body2', color: 'info.dark' }}>
              <Typography fontWeight="bold" color="primary.dark" variant="subtitle2" sx={{ mb: 1 }}>
                {t('LABEL.NAME')}
              </Typography>
              {banner?.name || '- - - -'}
            </Stack>

            <Stack sx={{ typography: 'body2', color: 'info.dark' }}>
              <Typography fontWeight="bold" color="primary.dark" variant="subtitle2" sx={{ mb: 1 }}>
                {t('LABEL.CENTER_TYPE')}
              </Typography>
              {t(`LABEL.${banner?.advertisementType}`) || '- - - -'}
              <br />
              <br />
            </Stack>

            <Stack sx={{ typography: 'body2', color: 'info.dark' }}>
              <Typography fontWeight="bold" color="primary.dark" variant="subtitle2" sx={{ mb: 1 }}>
                {t('LABEL.DURATION')}
              </Typography>
              {banner?.duration || '- - - -'}
            </Stack>

            <Stack sx={{ typography: 'body2', color: 'info.dark' }}>
              <Typography fontWeight="bold" color="primary.dark" variant="subtitle2" sx={{ mb: 1 }}>
                {t('LABEL.CENTER_PRICE')}
              </Typography>
              {banner?.price || '- - - -'}
            </Stack>
            <Stack sx={{ typography: 'body2', color: 'info.dark' }}>
              <Typography fontWeight="bold" color="primary.dark" variant="subtitle2" sx={{ mb: 1 }}>
                {t('LABEL.NUMBER_OFSUBSCRIBERS')}
              </Typography>
              {banner?.center_num || '- - - -'}
            </Stack>
            <Stack sx={{ typography: 'body2', color: 'info.dark' }}>
              <Typography fontWeight="bold" color="primary.dark" variant="subtitle2" sx={{ mb: 1 }}>
                {t('LABEL.CENTER_DESCRIPTION')}
              </Typography>
              {banner?.description || '- - - -'}
            </Stack>
            <Stack sx={{ typography: 'body2', color: 'info.dark' }}>
              <Typography fontWeight="bold" color="primary.dark" variant="subtitle2" sx={{ mb: 1 }}>
                {t('LABEL.CENTER_IMAGE')}
              </Typography>

              <Box
                component="img"
                alt="image"
                src={banner?.image_cover || '/assets/images/centers/gray.jpeg'}
                sx={{
                  height: 100,
                  width: 200,
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />
            </Stack>
          </Box>
        </Card>
        <Card sx={{ my: 3 }}>
          <SharedTable
            count={count}
            data={centers}
            tableHead={TABLE_HEAD}
            actions={[
              {
                sx: { color: 'info.dark' },
                label: t('LABEL.VIEW'),
                icon: 'lets-icons:view',
                onClick: (item) => {

                  seSelectedCenter(item);
                  open.onTrue();
                },
              },
              {
                sx: { color: 'error.dark' },
                label: t('BUTTON.DEACTIVATE'),
                icon: 'uim:process',
                onClick: (item: any) => {
                  seSelectedCenter(item);
                  confirmDeactivate.onTrue();
                },
                hide: (center) => center?.is_active === false,
              },
              {
                sx: { color: 'info.dark' },
                label: t('BUTTON.ACTIVATE'),
                icon: 'streamline:synchronize-disable-solid',
                onClick: (item: any) => {
                  seSelectedCenter(item);
                  confirmActivate.onTrue();
                },
                hide: (center) => center?.is_active === true,
              },
            ]}
            customRender={
              {
                center_name: (item: IBannerCenter) => (
                  <Typography variant="body2" sx={{ color: item.is_active ? 'info.dark' : 'red' }}>
                    {item?.center?.name || '- - - -'}
                  </Typography>
                ),
                center_phone: (item: IBannerCenter) => (
                  <Typography variant="body2" sx={{ color: item.is_active ? 'info.dark' : 'red' }}>
                    {item?.center?.phone || '- - - -'}
                  </Typography>
                ),
                center_website: (item: IBannerCenter) => (
                  <Typography variant="body2" sx={{ color: item.is_active ? 'info.dark' : 'red' }}>
                    {item?.center?.website || '- - - -'}
                  </Typography>
                ),
                created_at: (item: IBannerCenter) => (
                  <Typography variant="body2" sx={{ color: item.is_active ? 'info.dark' : 'red' }}>
                    {fDate(item?.created_at)}
                  </Typography>
                ),
                expires_at: (item: IBannerCenter) => (
                  <Typography variant="body2" sx={{ color: item.is_active ? 'info.dark' : 'red' }}>
                    {fDate(item?.expires_at)}
                  </Typography>
                ),
              } as any
            }
          />
        </Card>
      </Container>

      {open.value && (
        <BannerCenterDialog
          open={open.value}
          onClose={() => {
            open.onFalse();
            seSelectedCenter(undefined);
          }}
          center={selectedCenter}
        />
      )}
      <ConfirmDialog
        open={confirmDeactivate.value}
        onClose={confirmDeactivate.onFalse}
        title={t('TITLE.DEACTIVATE_CENTER_MEDIA')}
        content={t('MESSAGE.CONFIRM_DEACTIVATE_CENTER_MEDIA')}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleConfirmDeactivate();
            }}
          >
            {t('BUTTON.DEACTIVATE')}
          </Button>
        }
      />
      <ConfirmDialog
        open={confirmActivate.value}
        onClose={confirmActivate.onFalse}
        title={t('TITLE.ACTIVATE_CENTER_MEDIA')}
        content={t('MESSAGE.CONFIRM_ACTIVATE_CENTER_MEDIA')}
        action={
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              handleConfirmActivate();
            }}
          >
            {t('BUTTON.ACTIVATE')}
          </Button>
        }
      />
    </>
  );
};

export default SingleBannerView;
