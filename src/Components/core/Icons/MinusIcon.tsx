import React, { FC, SVGProps } from "react";

const MinusIcon: FC<SVGProps<SVGSVGElement>> = ({ size = 24, width = "24", height = "24", ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={24}
    role="presentation"
    viewBox="0 0 24 24"
    width={24}
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M6 12h12" />
    </g>
  </svg>
);

export default MinusIcon;
