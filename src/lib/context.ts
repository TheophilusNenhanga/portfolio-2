import { PersistedState } from 'runed';

export const showTitles = new PersistedState('showTitles', 'true');
export const windowControlStyle = new PersistedState('windowControlStyle', 'windows');
export const windowControlPosition = new PersistedState('windowControlPosition', 'left');

// TODO: Add all windows to an array
// Window needs state:
// z index
// open state - minimized, maximized
