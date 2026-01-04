import { Presence } from "../enum-common";

export type PresenceMessageDto = {
  userId: number;
  presence: Presence;
};
