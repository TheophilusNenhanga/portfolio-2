import { PersistedState } from 'runed';
import type { Component } from 'svelte';
import Portfolio from './components/screens/Portfolio.svelte';
import Settings from './components/screens/Settings.svelte';
import PortfolioIcon from './assets/portfolio.svg';
import SettingsIcon from './assets/settings.svg';

export const showTitles = new PersistedState('showTitles', 'true');
export const windowControlStyle = new PersistedState('windowControlStyle', 'windows');
export const windowControlPosition = new PersistedState('windowControlPosition', 'left');
export const showTime = new PersistedState('showTime', 'true');
export const showDate = new PersistedState('showDate', 'true');

export type WindowState = {
	zIndex: number;
	openState: 'minimized' | 'maximized' | 'closed' | 'open';
	name: string;
	id: number;
	icon: string;
	component: Component;
	width: number;
	height: number;
	left: number;
	top: number;
	hasFocus: boolean;
};

export let windows: WindowState[] = $state([
	{
		zIndex: 0,
		openState: 'open',
		name: 'Portfolio',
		id: 0,
		icon: PortfolioIcon,
		component: Portfolio,
		width: 800,
		height: 600,
		left: 20,
		top: 100,
		hasFocus: true
	},
	{
		zIndex: 0,
		openState: 'open',
		name: 'Settings',
		id: 1,
		icon: SettingsIcon,
		component: Settings,
		width: 400,
		height: 600,
		left: 20,
		top: 100,
		hasFocus: false
	}
]);

export function setFocus(id: number) {
	for (let i = 0; i < windows.length; i++) {
		if (windows[i].id === id) {
			windows[i].hasFocus = true;
			windows[i].zIndex = windows.length;
		} else {
			windows[i].hasFocus = false;
			windows[i].zIndex = 0;
		}
	}
}
