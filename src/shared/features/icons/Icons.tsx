import type { IconBaseProps, IconType } from "react-icons"

const Icons: Record<string, IconType> = {
    Play: ({ size = 18, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
            <path d="M7 4.5v15l13-7.5z" />
        </svg>
    ),
    Home: ({ size = 20, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z" />
        </svg>
    ),
    Mods: ({ size = 20, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
    ),
    News: ({ size = 20, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <path d="M4 4h12a2 2 0 0 1 2 2v13a1 1 0 0 0 1 1h-14a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2z" />
            <path d="M8 8h6M8 12h6M8 16h4" />
        </svg>
    ),
    Settings: ({ size = 20, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </svg>
    ),
    User: ({ size = 20, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    Discord: ({ size = 18, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
            <path d="M20.3 4.4a18.3 18.3 0 0 0-4.5-1.4l-.2.5a14 14 0 0 0-5.2 0l-.2-.5a18 18 0 0 0-4.5 1.4A19 19 0 0 0 2.4 17a18.2 18.2 0 0 0 5.5 2.8l.4-.6a12 12 0 0 1-2-1l.4-.3a13 13 0 0 0 11 0l.4.3a12 12 0 0 1-2 1l.4.6a18 18 0 0 0 5.5-2.8 19 19 0 0 0-1.7-12.6zM8.7 14.6c-1 0-1.8-.9-1.8-2 0-1.2.8-2.1 1.8-2.1 1.1 0 1.9.9 1.9 2 0 1.2-.8 2.1-1.9 2.1zm6.6 0c-1 0-1.8-.9-1.8-2 0-1.2.8-2.1 1.8-2.1 1.1 0 1.9.9 1.9 2 0 1.2-.8 2.1-1.9 2.1z" />
        </svg>
    ),
    Folder: ({ size = 16, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
    ),
    Refresh: ({ size = 16, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
            <path d="M3 21v-5h5" />
        </svg>
    ),
    Crown: ({ size = 16, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
            <path d="M3 17l1.5-9 5 4 2.5-7 2.5 7 5-4L21 17z" />
            <rect x="3" y="18" width="18" height="2.2" rx="0.5" />
        </svg>
    ),
    Check: ({ size = 14, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <path d="M4 12l6 6 10-14" />
        </svg>
    ),
    Dot: ({ size = 8, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 8 8" fill="currentColor" className={className} {...props}>
            <circle cx="4" cy="4" r="3" />
        </svg>
    ),
    Min: ({ size = 12, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} {...props}>
            <line x1="2" y1="6" x2="10" y2="6" />
        </svg>
    ),
    Close: ({ size = 12, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} {...props}>
            <line x1="3" y1="3" x2="9" y2="9" />
            <line x1="9" y1="3" x2="3" y2="9" />
        </svg>
    ),
    Square: ({ size = 10, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} {...props}>
            <rect x="2.5" y="2.5" width="7" height="7" rx="0.5" />
        </svg>
    ),
    MeloriumLogo: ({ size = 22, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
            <defs>
                <linearGradient id="ml-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f0d8ff" />
                    <stop offset="0.5" stopColor="#b57bff" />
                    <stop offset="1" stopColor="#6f21e8" />
                </linearGradient>
            </defs>
            <path d="M12 2 L22 8 L22 16 L12 22 L2 16 L2 8 Z" fill="url(#ml-g)" opacity="0.9" />
            <path d="M12 2 L22 8 L12 14 L2 8 Z" fill="#fff" opacity="0.25" />
            <path d="M7 10 L12 7 L17 10 L17 15 L12 18 L7 15 Z" fill="#1a0738" opacity="0.6" />
            <path d="M12 7 L12 18" stroke="#fff" strokeOpacity="0.3" strokeWidth="0.5" />
        </svg>
    ),
    Sword: ({ size = 20, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <path d="M14.5 17.5 20 22l2-2-4.5-5.5" />
            <path d="M6 8l6 6 8-8V2h-4z" />
            <path d="M7 15l-4 4 2 2 4-4" />
        </svg>
    ),
    Shield: ({ size = 18, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6z" />
        </svg>
    ),
    Sparkle: ({ size = 18, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
            <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z" />
        </svg>
    ),
    Eye: ({ size = 16, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ),
    Package: ({ size = 18, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <path d="M12 3l9 5v8l-9 5-9-5V8z" />
            <path d="M3 8l9 5 9-5" />
            <path d="M12 22V13" />
        </svg>
    ),
    Leaf: ({ size = 18, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <path d="M5 21c0-9 7-16 16-16 0 9-7 16-16 16z" />
            <path d="M5 21l10-10" />
        </svg>
    ),
    Search: ({ size = 16, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
        </svg>
    ),
    Users: ({ size = 16, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    ArrowLeft: ({ size = 16, className, ...props }: IconBaseProps) => (
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
    ),
}

export default Icons
