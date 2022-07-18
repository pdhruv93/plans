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
  users: UserInterface[];
  addAppUser: (userDetails: UserInterface) => void;
  setUsers: (users: UserInterface[]) => void;
  logoutAppUser: () => void;
}

export interface PlansListPropsInterface {
  planId?: string;
}
