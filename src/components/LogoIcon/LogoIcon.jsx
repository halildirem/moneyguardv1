import { useId } from 'react';

const LogoIcon = ({ className }) => {
  const clipId = useId();

  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.6579 4.94514C22.1122 4.30829 19.5664 3.03458 17.6571 1.12402C15.7478 3.03458 13.202 4.30829 10.6562 4.94514C11.2927 10.6768 13.202 14.4979 17.6571 17.6822C22.1122 14.4979 24.6579 10.6768 24.6579 4.94514Z"
          fill="#FFC727"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.1116 28.6578L4.29126 7.6416V17.8313L18.2929 33.7526L22.1116 28.6578Z"
          fill="#FBFBFB"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.0212 26.7476L31.6585 17.8316V8.27881L19.5662 22.2896L24.0212 26.7476Z"
          fill="#FBFBFB"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.6577 29.9319V35.6636L31.6586 27.3845V21.6528L24.6577 29.9319Z"
          fill="#FBFBFB"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.2921 29.9319L4.29126 21.6528V27.3845L11.2921 35.6636V29.9319Z"
          fill="#FBFBFB"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="35.9506" height="35.9739" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LogoIcon;
