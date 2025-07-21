export default function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      viewBox='0 0 18 19'
      className={className}
    >
      <path d='M4.5 4.5C4.5 6.981 6.519 9 9 9s4.5-2.019 4.5-4.5S11.481 0 9 0a4.505 4.505 0 0 0-4.5 4.5M17 19h1v-1c0-3.859-3.141-7-7-7H7c-3.86 0-7 3.141-7 7v1z'></path>
    </svg>
  );
}
