export interface PlanInterface {
  planId: string;
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
  attendees: string[];
  maxAttendees: number;
}

export interface PlanFormInterface {
  title: string;
  duration: number;
  startTime: Date;
  isPrivate: boolean;
  locationName: string;
  locationCoords: { lat: number; lng: number };
  charges: number;
  otherDetails?: string;
  attendees?: string[];
  maxAttendees: number;
}

export interface PlansStoreInterface {
  plans: PlanInterface[] | [];
  setPlans: (plans: PlanInterface[]) => void;
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

export interface UsersStoreInterface {
  users: UserInterface[];
  setUsers: (users: UserInterface[]) => void;
}

export interface PlansListPropsInterface {
  planId?: string;
}
