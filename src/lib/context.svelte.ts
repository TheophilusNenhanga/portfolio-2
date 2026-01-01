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
export let windowMaximized = false;
export const startTop = 24;
export const endTop = 56;
export const topBarHeight = 24;

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
	lastLeft: number;
	lastTop: number;
	lastWidth: number;
	lastHeight: number;
	lastState: 'minimized' | 'maximized' | 'closed' | 'open';
};

export let windows: WindowState[] = $state([
	{
		zIndex: 1,
		openState: 'open',
		name: 'Portfolio',
		id: 0,
		icon: PortfolioIcon,
		component: Portfolio,
		width: 800,
		height: 600,
		left: 20,
		top: 100,
		hasFocus: true,
		lastLeft: 0,
		lastTop: 0,
		lastWidth: 0,
		lastHeight: 0,
		lastState: 'closed'
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
		left: 560,
		top: 270,
		hasFocus: false,
		lastLeft: 0,
		lastTop: 0,
		lastWidth: 0,
		lastHeight: 0,
		lastState: 'closed'
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

export function windowMinimize(id: number) {
	windows[id].lastState = windows[id].openState;
	windows[id].lastLeft = windows[id].left;
	windows[id].lastTop = windows[id].top;
	windows[id].lastWidth = windows[id].width;
	windows[id].lastHeight = windows[id].height;
	windows[id].openState = 'minimized';
	windowMaximized = false;
}

export function windowUnMinimize(id: number) {
	if (windows[id].lastState === 'maximized') {
		windowMaximized = true;
	} else {
		windowMaximized = false;
	}
	windows[id].openState = windows[id].lastState;
	windows[id].left = windows[id].lastLeft;
	windows[id].top = windows[id].lastTop;
	windows[id].width = windows[id].lastWidth;
	windows[id].height = windows[id].lastHeight;
}

export function windowMaximize(id: number, window: Window) {
	windows[id].openState = 'maximized';
	windows[id].lastLeft = windows[id].left;
	windows[id].lastTop = windows[id].top;
	windows[id].lastWidth = windows[id].width;
	windows[id].lastHeight = windows[id].height;
	windows[id].left = 0;
	windows[id].top = startTop;
	windows[id].width = window.innerWidth;
	windows[id].height = window.innerHeight - endTop - startTop - 24;
	windowMaximized = true;
}

export function windowClose(id: number) {
	windows[id].openState = 'closed';
	windows[id].lastLeft = windows[id].left;
	windows[id].lastTop = windows[id].top;
	windows[id].lastWidth = windows[id].width;
	windows[id].lastHeight = windows[id].height;
	windows[id].left = 0;
	windows[id].top = 0;
	windows[id].width = 0;
	windows[id].height = 0;
	windowMaximized = false;
}

export function windowRestore(id: number) {
	windows[id].openState = 'open';
	windows[id].left = windows[id].lastLeft;
	windows[id].top = windows[id].lastTop;
	windows[id].width = windows[id].lastWidth;
	windows[id].height = windows[id].lastHeight;
	windowMaximized = false;
}
