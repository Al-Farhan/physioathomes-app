export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface AddressComponents {
  placeId: string;
  formattedAddress: string;
  primaryText: string;
  secondaryText: string;
  buildingName: string;
  flatNumber: string;
  streetNumber: string;
  street: string;
  area: string;
  landmark: string;
  city: string;
  state: string;
  stateCode: string;
  country: string;
  countryCode: string;
  postalCode: string;
}

export interface LocationData {
  coords: Coordinates;
  address: AddressComponents;
  timestamp: number;
}

export interface PlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export type LocationStatus =
  | "idle"
  | "requesting_permission"
  | "fetching_location"
  | "fetching_address"
  | "success"
  | "permission_denied"
  | "error";

export interface LocationState {
  status: LocationStatus;
  data: LocationData | null;
  error: string | null;
}
