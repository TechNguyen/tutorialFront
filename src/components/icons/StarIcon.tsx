import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo } from 'react';

const StarIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 23"
      sx={{ fontSize: 'inherit', ...sx }}
      {...otherProps}
    >
      <path d="M23.97 8.721a.597.597 0 0 0-.507-.413l-7.744-.822-3.172-7.16c-.192-.435-.903-.435-1.095 0l-3.17 7.16-7.745.822a.601.601 0 0 0-.508.413.606.606 0 0 0 .17.635l5.785 5.248-1.616 7.667a.605.605 0 0 0 .586.729.595.595 0 0 0 .3-.081L12 19.003l6.747 3.916c.204.119.46.105.652-.035a.606.606 0 0 0 .234-.613l-1.616-7.668 5.786-5.248a.606.606 0 0 0 .168-.634z"></path>
    </SvgIcon>
  );
};

export default memo(StarIcon);

export interface IIconProps extends SvgIconProps {
  sx?: object;
  className?: string;
}
