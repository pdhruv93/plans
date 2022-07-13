export interface PlanInterface {
  creator: string;
  title: string;
  duration: number;
  startTime: Date;
  isPrivate: boolean;
  location: {
    name: string;
    coordinates: { lat: number; lng: number };
  };
  charges: number;
  otherDetails?: string;
  attendees?: string[];
}

export interface PlanFormInterface {
  title: string;
  duration: number;
  startTime: Date;
  locationName: string;
  locationCoords: { lat: number; lng: number };
  charges: number;
  otherDetails?: string;
  attendees?: string[];
  isPrivate: boolean;
}

export interface UserInterface {
  userId: string;
  name: string;
  email: string;
  photoURL: string;
  roles?: string[];
}

export interface UserStoreInterface {
  appUser: UserInterface | null;
  fbAccessToken: string | undefined;
  addAppUser: (userDetails: UserInterface) => void;
  setFbAccessToken: (token: string | undefined) => void;
  logoutAppUser: () => void;
}
