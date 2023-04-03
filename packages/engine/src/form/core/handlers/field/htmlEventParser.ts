import { TEventInformation } from 'core/events';

export const handler = ({ field, data: { event } }: TEventInformation) => {
  let parsedEventValue = undefined;
  let metadata = undefined;

  //HTML event values here
  const eventMapper: Record<string, () => void> = {
    number: () => parseInt(event?.target?.value),
    checkbox: () => !!event?.target?.checked,
  };

  parsedEventValue = eventMapper[event?.target?.type] ? eventMapper[event?.target?.type]() : event?.target?.value;

  if (Array.isArray(event) || typeof event !== 'object' || typeof event === 'string' || typeof event === 'number') {
    parsedEventValue = event;
  }

  if (event?.id) {
    parsedEventValue = event?.id;
    metadata = event;
  }

  if (event?.options) {
    parsedEventValue = event?.options;
  }

  const isDeletingValue = (parsedEventValue as any)?.toString().length < (field.data?.value?.toString()?.length || 0);

  return {
    parsedEventValue,
    metadata,
    isDeletingValue,
  };
};
