import { signal } from "signals-react-safe";

const channels = signal([]);

const groups = signal([]);

const language: any = signal({});

const groups_channels: any = signal({})

const ratings: any = signal({});

export { channels, groups, groups_channels, language, ratings };