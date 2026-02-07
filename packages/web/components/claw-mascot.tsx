/**
 * Claw mascot per ProductPlan: arcade claw machine style.
 * Viewbox 0 0 64 64, amber (#F59E0B) fill, black (#111111) outline, ~3px stroke.
 * States: idle, grabbing, success, wave.
 */

export type ClawVariant = "idle" | "grabbing" | "success" | "wave";

const strokeWidth = 3;
const amber = "#F59E0B";
const black = "#111111";

export function ClawMascot({
  variant = "idle",
  className,
  size = 64,
  ...props
}: {
  variant?: ClawVariant;
  className?: string;
  size?: number;
} & React.SVGProps<SVGSVGElement>) {
  const transform = {
    idle: "",
    grabbing: "rotate(-10 32 32)",
    success: "",
    wave: "rotate(-20 32 32)",
  }[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden
      {...props}
    >
      <g transform={transform} stroke={black} strokeWidth={strokeWidth} fill={amber}>
        {/* Palm circle */}
        <circle cx="32" cy="32" r="10" fill={amber} stroke={black} strokeWidth={strokeWidth} />
        {/* Fingers — arcade claw: three curved fingers from center */}
        {variant === "idle" && <IdleFingers />}
        {variant === "grabbing" && <GrabbingFingers />}
        {variant === "success" && <SuccessHand />}
        {variant === "wave" && <WaveFingers />}
      </g>
    </svg>
  );
}

function IdleFingers() {
  return (
    <>
      {/* Left finger — curved open */}
      <path d="M 22 28 Q 14 20 18 12" fill="none" stroke={black} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Right finger */}
      <path d="M 42 28 Q 50 20 46 12" fill="none" stroke={black} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Center finger — slightly down */}
      <path d="M 32 40 Q 32 52 28 58" fill="none" stroke={black} strokeWidth={strokeWidth} strokeLinecap="round" />
    </>
  );
}

function GrabbingFingers() {
  return (
    <>
      {/* Fingers closing inward */}
      <path d="M 22 28 Q 18 24 20 18" fill="none" stroke={black} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 42 28 Q 46 24 44 18" fill="none" stroke={black} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 32 40 Q 32 48 30 52" fill="none" stroke={black} strokeWidth={strokeWidth} strokeLinecap="round" />
    </>
  );
}

function SuccessHand() {
  return (
    <>
      {/* Thumbs-up / open palm: fingers up, relaxed */}
      <path d="M 20 26 L 16 14" fill="none" stroke={black} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 32 24 L 32 10" fill="none" stroke={black} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 44 26 L 48 14" fill="none" stroke={black} strokeWidth={strokeWidth} strokeLinecap="round" />
    </>
  );
}

function WaveFingers() {
  return (
    <>
      {/* Same as idle but tilt is on the group — fingers slightly splayed for wave */}
      <path d="M 20 30 Q 12 22 16 14" fill="none" stroke={black} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 44 30 Q 52 22 48 14" fill="none" stroke={black} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 32 42 Q 32 54 30 60" fill="none" stroke={black} strokeWidth={strokeWidth} strokeLinecap="round" />
    </>
  );
}
