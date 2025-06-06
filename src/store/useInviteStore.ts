import { create } from 'zustand';

interface InviteFormData {
  category_id: string;
  calendartype: string;
  visibility: string;
  cover_image_media: null | string;
  themeVideoType: string | null;
  themeVideo: null | string;
  coverImage: null | string;
  themeMediaType: string | null;
  location_name: string;
  countries: any;
  timezone: string;
  themeMedia: null | string;
  theme: string;
  eventName: string;
  startDate: string;
  description: string;
  capacity: number;
  requireApproval: boolean;
}

interface InviteStore {
  formData: InviteFormData;
  setFormData: (data: Partial<InviteFormData>) => void;
  resetForm: () => void;
}

export const useInviteStore = create<InviteStore>((set) => ({
  formData: {
    theme: '',
    eventName: '',
    startDate: '',
    description: '',
    capacity: 0,
    requireApproval: false,
    themeMediaType: null,
    location_name: '',
    countries: undefined,
    timezone: '',
    themeMedia: null,
    cover_image_media: null,
    themeVideoType: null,
    themeVideo: null,
    coverImage: null,
    category_id: '',
    calendartype: '',
    visibility: ''
  },
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () =>
    set({
      formData: {
        theme: '',
        eventName: '',
        startDate: '',
        description: '',
        capacity: 0,
        requireApproval: false,
        themeMediaType: null,
        location_name: '',
        countries: undefined,
        timezone: '',
        themeMedia: null,
        cover_image_media: null,
        themeVideoType: null,
        themeVideo: null,
        coverImage: null,
        category_id: '',
        calendartype: '',
        visibility: ''
      },
    }),
}));
