type LogoProps = {
    className?: string;
};

export default function Logo({ className }: LogoProps) {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect
                x="6"
                y="6"
                width="96"
                height="96"
                rx="10"
                stroke="currentColor"
                strokeWidth="2"
            />

            <path
                d="M16 14L32 24L16 34"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <circle
                cx="24"
                cy="24"
                r="3"
                fill="currentColor"
            />
        </svg>
    );
}
