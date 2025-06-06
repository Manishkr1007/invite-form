'use client';

import { useRouter } from 'next/navigation';
import { useInviteStore } from '@/store/useInviteStore';
import { useEffect, useRef, useState } from 'react';
import creatingDummy from '@/data/creating.json';
import { FiEdit2, FiChevronDown, FiShuffle, FiBookOpen, FiCamera, FiFilm } from "react-icons/fi";



export default function CreatePage() {
    const router = useRouter();
    const { formData, setFormData } = useInviteStore();
    const [visibility, setVisibility] = useState('Public');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [calendartype, setCalendarType] = useState('Personal Calendar');
    const [calendarDropdownOpen, setCalendarDropdownOpen] = useState(false);
    const calendarDropdownRef = useRef<HTMLDivElement>(null);
    const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
    const [theme, setTheme] = useState('image');
    const themeDropdownRef = useRef<HTMLDivElement>(null);
    const [coverImage, setCoverImage] = useState<any>(formData.cover_image_media || null);
    const [themeMedia, setThemeMedia] = useState<any >(formData.themeMedia || null); 
    const coverInputRef = useRef<HTMLInputElement>(null);
    const themeInputRef = useRef<HTMLInputElement>(null);
    const [themeMediaType, setThemeMediaType] = useState< string | null >(formData.themeMediaType || null);
    const [themeVideo, setThemeVideo] = useState<any>(formData.themeVideo || null);
    const [themeVideoType, setThemeVideoType] = useState<string | null>(formData.themeVideoType || null);
    const themeVideoInputRef = useRef<HTMLInputElement>(null);
    const [themeType, setThemeType] = useState<'image' | 'mp4' >('image');

    useEffect(() => {
        setFormData(creatingDummy);
    }, [setFormData]);
    console.log('Form Data:', formData);

    // Cover image upload
    const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image')) {
            const url = URL.createObjectURL(file);
            setFormData({ ...formData, cover_image_media: url });
        }
    };

    // Theme media upload (image or video)
    const handleThemeMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (file.type.startsWith('image') || file.type.startsWith('video'))) {
            const url = URL.createObjectURL(file);
            setFormData({ ...formData, themeMedia: url, themeMediaType: file.type });
        }
    };

    // Preview button
    const handlePreview = () => {
        router.push('/view');
    };

    // Form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/view');
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
                setThemeDropdownOpen(false);
            }
        }
        if (themeDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [themeDropdownOpen]);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <main className="bg-[#3B1F44] min-h-screen flex items-center justify-center p-4">
            <div className="max-w-[900px] w-full flex flex-col md:flex-row gap-6 md:gap-10">
                {/* Left side */}
                <section className="flex flex-col items-center gap-4">
                    {/* Cover image */}
                    <div className="relative w-[250px] h-[360px] rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            src={formData.cover_image_media || "https://storage.googleapis.com/a1aa/image/a3f05612-e693-40e0-5366-e0bbd22f683d.jpg"}
                            alt="Poster"
                            className="w-full h-full object-cover"
                        />
                        <button
                            type="button"
                            className="absolute bottom-3 right-3 bg-[#3B1F44] rounded-full p-2 cursor-pointer flex items-center justify-center"
                            onClick={() => coverInputRef.current?.click()}
                        >
                            <FiCamera className="text-white text-lg" />
                            <input
                                ref={coverInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleCoverImageUpload}
                            />
                        </button>
                    </div>
                    {/* Theme media uploader */}
                    <div className="flex items-center gap-3">
                        {/* Theme type dropdown */}
                        <div className="relative" ref={themeDropdownRef}>
                            <button
                                type="button"
                                className="bg-[#5A3B6B] text-white text-xs font-semibold rounded-md px-3 py-2 flex items-center gap-1"
                                onClick={() => setThemeDropdownOpen(open => !open)}
                            >
                                <FiBookOpen className="text-[14px]" />
                                {themeType === 'image' && 'Image'}
                                {themeType === 'mp4' && 'MP4'}
                                <FiChevronDown className="text-[10px]" />
                            </button>
                            {themeDropdownOpen && (
                                <div className="absolute left-0 mt-1 bg-[#5A3B6B] rounded-md shadow-lg z-10 min-w-[120px]">
                                    <button
                                        type="button"
                                        className={`block w-full text-left px-4 py-2 text-xs text-[#9B8AA0] hover:bg-pink-400 hover:text-white rounded-t-md ${themeType === 'image' ? 'font-bold' : ''}`}
                                        onClick={() => { setThemeType('image'); setThemeDropdownOpen(false); }}
                                    >
                                        <FiBookOpen className="inline mr-2" /> Image
                                    </button>
                                    <button
                                        type="button"
                                        className={`block w-full text-left px-4 py-2 text-xs text-[#9B8AA0] hover:bg-pink-400 hover:text-white rounded-b-md ${themeType === 'mp4' ? 'font-bold' : ''}`}
                                        onClick={() => { setThemeType('mp4'); setThemeDropdownOpen(false); }}
                                    >
                                        <FiFilm className="inline mr-2" /> MP4
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* Theme media uploader button, show according to selection */}
                        {themeType === 'image' && (
                            <button
                                type="button"
                                className="bg-[#5A3B6B] p-2 rounded-md flex items-center justify-center"
                                onClick={() => themeInputRef.current?.click()}
                                title="Upload Theme Image"
                            >
                                <FiBookOpen className="text-white text-xs" />
                                <input
                                    ref={themeInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleThemeMediaUpload}
                                />
                            </button>
                        )}
                        {themeType === 'mp4' && (
                            <button
                                type="button"
                                className="bg-[#5A3B6B] p-2 rounded-md flex items-center justify-center"
                                onClick={() => themeInputRef.current?.click()}
                                title="Upload Theme Video"
                            >
                                <FiFilm className="text-white text-xs" />
                                <input
                                    ref={themeInputRef}
                                    type="file"
                                    accept="video/mp4"
                                    className="hidden"
                                    onChange={handleThemeMediaUpload}
                                />
                            </button>
                        )}
                        {/* Shuffle theme button */}
                        <button className="bg-[#5A3B6B] p-2 rounded-md flex items-center justify-center" onClick={() => console.log('Shuffle theme')}>
                            <FiShuffle className="text-white text-xs" />
                        </button>
                    </div>
                    {/* Theme media preview */}
                    {themeType === 'image' && formData.themeMedia && formData.themeMediaType?.startsWith('image') && (
                        <div className="w-[250px] mt-2">
                            <img src={formData.themeMedia} alt="Theme Preview" className="rounded w-full h-32 object-cover" />
                        </div>
                    )}
                    {themeType === 'mp4' && formData.themeMedia && formData.themeMediaType?.startsWith('video') && (
                        <div className="w-[250px] mt-2">
                            <video src={formData.themeMedia} controls className="rounded w-full h-32 object-cover" />
                        </div>
                    )}
                    {/* Preview Button */}
                    <button
                        type="button"
                        className="bg-pink-500 text-white rounded-md py-2 px-4 mt-2 font-semibold text-sm"
                        onClick={handlePreview}
                    >
                        Preview
                    </button>
                </section>

                {/* Right side */}
                <section className="flex-1 flex flex-col gap-4 text-[#9B8AA0]">
                    <div className="flex justify-between mb-1">

                        <div className="relative" ref={calendarDropdownRef}>
                            <button
                                type="button"
                                className="bg-[#5A3B6B] rounded-full px-3 py-1 text-xs flex items-center gap-2"
                                onClick={() => setCalendarDropdownOpen((open) => !open)}
                            >
                                <span className="w-2 h-2 rounded-full bg-pink-400 inline-block" />
                                {calendartype}<span className="text-[10px]">▼</span>
                            </button>
                            {calendarDropdownOpen && (
                                <div className="absolute left-0 mt-1 bg-[#5A3B6B] rounded-md shadow-lg z-10 min-w-[140px]">
                                    <button
                                        type="button"
                                        className="block w-full text-left px-4 py-2 text-xs text-[#9B8AA0] hover:bg-pink-400 hover:text-white rounded-t-md font-bold"
                                        onClick={() => { setCalendarType('Personal Calender'); setCalendarDropdownOpen(false); }}
                                    >
                                        Personal Calendar
                                    </button>

                                </div>
                            )}
                        </div>

                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                className="bg-[#5A3B6B] rounded-full px-3 py-1 text-xs flex items-center gap-2"
                                onClick={() => setDropdownOpen((open) => !open)}
                            >
                                🌐 {visibility} <span className="text-[10px]">▼</span>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-1 bg-[#5A3B6B] rounded-md shadow-lg z-10 min-w-[120px]">
                                    <button
                                        type="button"
                                        className={`block w-full text-left px-4 py-2 text-xs text-[#9B8AA0] hover:bg-pink-400 hover:text-white rounded-t-md ${visibility === 'Public' ? 'font-bold' : ''}`}
                                        onClick={() => { setVisibility('Public'); setDropdownOpen(false); }}
                                    >
                                        🌐 Public
                                    </button>

                                </div>
                            )}
                        </div>
                    </div>

                    <input
                        className="bg-transparent text-[#7E6D8A] font-semibold text-xl mb-2 placeholder:text-[#7E6D8A] focus:outline-none"
                        type="text"
                        placeholder="Event Name"
                        value={formData.eventName || ''}
                        onChange={e => setFormData({ ...formData, eventName: e.target.value })}
                    />

                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        {/* Date/Time Fields with Timezone */}
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col gap-2 flex-1">
                                {/* Start Field */}
                                <fieldset className="flex items-center gap-3">
                                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                                        <input type="radio" name="start-end" className="accent-pink-400" defaultChecked />
                                        <span>Start</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="bg-[#5A3B6B] text-[#9B8AA0] text-xs rounded-md px-2 py-1 w-[110px]"
                                    />
                                    <input
                                        type="time"
                                        className="bg-[#5A3B6B] text-[#9B8AA0] text-xs rounded-md px-2 py-1 w-[80px]"
                                    />
                                </fieldset>
                                {/* End Field */}
                                <fieldset className="flex items-center gap-3">
                                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                                        <input type="radio" name="start-end" className="accent-pink-400" />
                                        <span>End</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="bg-[#5A3B6B] text-[#9B8AA0] text-xs rounded-md px-2 py-1 w-[110px]"
                                    />
                                    <input
                                        type="time"
                                        className="bg-[#5A3B6B] text-[#9B8AA0] text-xs rounded-md px-2 py-1 w-[80px]"
                                    />
                                </fieldset>
                            </div>
                            <div className="bg-[#5A3B6B] text-[#9B8AA0] text-xs rounded-md px-4 py-2 w-[120px] text-center ml-auto mt-1">
                                <span>{formData.timezone || "GMT+05:30"}</span>
                                <br />
                                <span>{formData?.countries?.start || "Calcutta"}</span>
                            </div>
                        </div>


                        <input
                            className="bg-[#5A3B6B] text-[#9B8AA0] text-xs rounded-md px-3 py-2 placeholder:text-[#7E6D8A] w-full"
                            placeholder="Add Event Location"
                            type="text"
                            value={formData.location_name || ''}
                            onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                        />
                        <p className="text-[9px] text-[#7E6D8A] mb-1 ml-1">
                            Offline location or virtual link
                        </p>

                        <input
                            className="bg-[#5A3B6B] text-[#9B8AA0] text-xs rounded-md px-3 py-2 placeholder:text-[#7E6D8A] w-full"
                            placeholder="Add Description"
                            type="text"
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />

                        <div className="text-[14px] text-[#7E6D8A] font-bold  mb-1">Event Options</div>

                        <div className="bg-[#5A3B6B] rounded-md px-3 py-2 flex justify-between items-center text-x font-semibold">
                            <div className="flex items-center gap-2">🎟 Tickets</div>
                            <div className="flex items-center gap-1">
                                <span className="text-x font-semibold text-[#7E6D8A]">Free</span>
                                <FiEdit2 className="w-4 h-4 text-[#7E6D8A]" />
                            </div>
                        </div>


                        <div className="bg-[#5A3B6B] rounded-md px-3 py-2 flex justify-between items-center text-x font-semibold">
                            <div className="flex items-center gap-2">✅ Require Approval</div>
                            <button
                                type="button"
                                aria-pressed={formData.requireApproval}
                                onClick={() => setFormData({ requireApproval: !formData.requireApproval })}
                                className={`w-10 h-5 flex items-center rounded-full transition-colors duration-200 
                               ${formData.requireApproval ? 'bg-pink-500' : 'bg-gray-400'}`}
                            >
                                <span
                                    className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200
                                   ${formData.requireApproval ? 'translate-x-5' : 'translate-x-0'}`}
                                />
                            </button>
                        </div>


                        <div className="bg-[#5A3B6B] rounded-md px-3 py-2 flex justify-between items-center text-x font-semibold">
                            <div className="flex items-center gap-2">👥 Capacity</div>
                            <div className="flex items-center gap-1">
                                <input
                                    type="number"
                                    value={formData.capacity || ''}
                                    onChange={(e) =>
                                        setFormData({ capacity: parseInt(e.target.value || '0') })
                                    }
                                    className="bg-transparent w-25  text-right text-x font-semibold"
                                    placeholder="Unlimited"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-white text-[#3B1F44] rounded-md py-2 mt-2 font-semibold text-sm"
                        >
                            Create Event
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
}
