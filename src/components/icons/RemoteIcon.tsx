import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo } from 'react';

const RemoteIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 576 512"
      sx={{ fontSize: 'inherit', ...sx }}
      {...otherProps}
    >
      <path
        fill="currentColor"
        d="M448 320H96V192H448V320zM0 176C0 131.8 35.82 96 80 96H464C508.2 96 544 131.8 544 176V192C561.7 192 576 206.3 576 224V288C576 305.7 561.7 320 544 320V336C544 380.2 508.2 416 464 416H80C35.82 416 0 380.2 0 336V176zM80 160C71.16 160 64 167.2 64 176V336C64 344.8 71.16 352 80 352H464C472.8 352 480 344.8 480 336V176C480 167.2 472.8 160 464 160H80z"
      ></path>
    </SvgIcon>
  );
};

export default memo(RemoteIcon);

export interface IIconProps extends SvgIconProps {
  sx?: object;
  className?: string;
}
