/// <reference types="react" />
declare function FeatureEvents({ events, onEventClick, }: {
    events: string[];
    onEventClick(event: string): void;
}): JSX.Element;
export { FeatureEvents };
