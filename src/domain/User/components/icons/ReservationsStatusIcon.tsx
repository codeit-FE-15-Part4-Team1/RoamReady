export const ReservationStatusIcon = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <svg
      viewBox='0 0 19 20'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path d='M2.23047 20H16.2305C17.3335 20 18.2305 19.103 18.2305 18V4C18.2305 2.897 17.3335 2 16.2305 2H14.2305V0H12.2305V2H6.23047V0H4.23047V2H2.23047C1.12747 2 0.230469 2.897 0.230469 4V18C0.230469 19.103 1.12747 20 2.23047 20ZM16.2305 6L16.2315 18H2.23047V6H16.2305Z' />
    </svg>
  );
};
