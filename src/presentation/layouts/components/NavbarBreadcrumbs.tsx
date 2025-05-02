import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation, Link } from 'react-router-dom';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

const NavbarBreadcrumbs: React.FC = () => {
  const location = useLocation();

  // Vite의 base URL 가져오기
  const base = import.meta.env.BASE_URL || '/';

  // 현재 경로를 'base를 제거한 나머지 '/'로 분리하여 배열로 변환
  const pathnames = location.pathname.replace(base, '').split('/').filter((x) => x);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {/* 루트 경로 */}
      <Typography
        variant="body1"
        component={Link}
        to={base}
        sx={{ textDecoration: 'none', color: 'inherit' }}
      >
        Home
      </Typography>

      {/* 경로에 따라 동적으로 Breadcrumbs 생성 */}
      {pathnames.map((value, index) => {
        const to = `${base}${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography
            key={to}
            variant="body1"
            sx={{ color: 'text.primary', fontWeight: 600 }}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Typography>
        ) : (
          <Typography
            key={to}
            variant="body1"
            component={Link}
            to={to}
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Typography>
        );
      })}
    </StyledBreadcrumbs>
  );
};

export default NavbarBreadcrumbs;
