import type { ReactNode } from 'react';
import type { ButtonProps } from '@mui/material';
import type { TFilterOption } from 'src/types/common';

import { Stack, Button, MenuItem, MenuList, Typography } from '@mui/material';

import { Iconify } from '../iconify';
import { usePopover, CustomPopover } from '../custom-popover';

type Props = {
  label: string;
  options: TFilterOption[];
  icon?: ReactNode;
  value: TFilterOption;
  onSelectValue: (value: TFilterOption) => void;
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  sx?: ButtonProps['sx'];
};

const CSelect = ({
  label,
  options,
  icon,
  value,
  onSelectValue,
  variant = 'outlined',
  color = 'inherit',
  sx,
}: Props) => {
  const popover = usePopover();
  return (
    <>
      <Button
        color={color}
        variant={variant}
        onClick={popover.onOpen}
        sx={{ textTransform: 'capitalize', ...sx }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: 1, height: 32, gap: 1 }}
        >
          <Stack direction="row" alignItems="center" gap={1}>
            {icon && icon}
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              {value.label || label}
            </Typography>
          </Stack>
          <Iconify
            icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
          />
        </Stack>
      </Button>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'top-right' } }}
      >
        <MenuList>
          {options.map((option) => (
            <MenuItem
              key={option.label}
              selected={option.value === value.value}
              onClick={() => {
                onSelectValue(option);
                popover.onClose();
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
};

export default CSelect;
