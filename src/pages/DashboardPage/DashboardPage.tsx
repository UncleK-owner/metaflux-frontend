import * as React from 'react';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid-pro/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import Header from '../../layouts/components/Header';
import MainGrid from './components/MainGrid';
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from './theme/customizations';
import MainLayout from '../../layouts/MainLayout';

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

export default function DashboardPage(props: { disableCustomTheme?: boolean }) {
    return (
        <MainLayout {...props}>
            <Header />
            <MainGrid />
        </MainLayout>
    );
}
