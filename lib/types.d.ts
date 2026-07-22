import type { userWithId } from "./auth";

declare module "h3" {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: userWithId;
  }
}

export type LatLongItem = {
  lat: number;
  long: number;
};

export type mapPoint = {
  id: number;
  label: string;
} & LatLongItem;
