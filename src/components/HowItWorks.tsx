import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReturnToTopButton from "./ReturnToTopButton";

interface HowItWorksProps {
  isActive?: boolean;
  sectionName?: string;
  scrollToSection?: (sectionIndex: number) => void;
}

interface Step {
  id: number;
  title: string;
  description: string;
  linkTo: string;
  position: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

interface HowItWorksWheelProps {
  /** Duration of wheel rotation in seconds */
  rotationDuration?: number;
  /** Whether to pause rotation on hover */
  pauseOnHover?: boolean;
  /** Callback when a step is clicked */
  onStepClick?: (stepId: number) => void;
  /** Show loading state */
  isLoading?: boolean;
}

const HowItWorksWheel: React.FC<HowItWorksProps & HowItWorksWheelProps> = ({
  rotationDuration = 35,
  pauseOnHover = true,
  onStepClick,
  isLoading = false,
  isActive,
  scrollToSection
}) => {
  const navigate = useNavigate();
  const steps = useMemo<Step[]>(() => [
    {
      id: 1,
      title: "CREATE PROFILE. GET VERIFIED",
      description: "Join our healthcare network in minutes",
      linkTo: "/signup",
      position: { top: "0", left: "50%" }
    },
    {
      id: 2,
      title: "LEAVE FEEDBACK",
      description: "Leave Your Honest Feedback",
      linkTo: "/signup",
      position: { top: "50%", right: "0" }
    },
    {
      id: 3,
      title: "MAXIMISE OPPORTUNITIES",
      description: "Upskill to get paid well for your skills and hard work",
      linkTo: "/jobs",
      position: { bottom: "0", left: "50%" }
    },
    {
      id: 4,
      title: "CONNECT",
      description: "Join discussions. Grow your knowledge & professional network",
      linkTo: "/community",
      position: { top: "50%", left: "0" }
    }
  ], []);

  // Button link handlers with improved type safety
  const handleStepClick = useCallback(
    (step: number) => {
      const targetStep = steps.find(s => s.id === step);
      if (targetStep) {
        onStepClick?.(step);
        navigate(targetStep.linkTo);
      }
    },
    [navigate, steps, onStepClick]
  );

  return (
    <section
      className="flex flex-col items-center justify-center w-full py-20 min-h-[900px]"
      style={{
        background: `linear-gradient(to bottom, 
          rgba(255, 255, 255, 1) 0%,
          rgba(244, 233, 201, 0.3) 20%,
          rgba(212, 175, 55, 0.1) 50%,
          rgba(244, 233, 201, 0.2) 80%,
          rgba(255, 255, 255, 1) 100%
        )`,
      }}
      aria-label="How It Works Process Wheel"
      role="region"
    >
      {isLoading ? (
        <div 
          className="flex items-center justify-center w-full h-96"
          aria-label="Loading process wheel"
        >
          <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <h1
            id="how-it-works-title"
            className="text-center text-5xl md:text-6xl font-bold text-primary-dark mb-8 font-serif tracking-wide uppercase border-b-4 border-[#D4AF37] pb-4 w-full max-w-3xl mx-auto shadow-sm metallic-heading"
            style={{ textShadow: "0px 1px 1px rgba(0,0,0,0.1)" }}
          >
            HOW IT WORKS
          </h1>
          <div
            className="relative mx-auto metallic-perspective"
            style={{
              width: 800,
              height: 800,
              maxWidth: "100vw",
              maxHeight: "90vw",
              perspective: 1800,
            }}
            aria-labelledby="how-it-works-title"
          >
            {/* Background cycles with metallic gradients */}
            <div
              className="background-cycle cycle-outer metallic-gradient"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: 750,
                height: 750,
                border: "2.5px dashed rgba(212,175,55,0.5)",
                borderRadius: "50%",
                backdropFilter: "blur(7px)",
                boxShadow:
                  "0 8px 32px 0 rgba(31,38,135,0.18), 0 0 60px 10px #D4AF37 inset",
                zIndex: -1,
                animation: "floatOuter 8s ease-in-out infinite",
              }}
            ></div>
            <div
              className="background-cycle cycle-middle metallic-gradient"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: 650,
                height: 650,
                border: "3.5px solid rgba(212,175,55,0.25)",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(255,255,255,0.13) 0%,rgba(244,233,201,0.09) 100%)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 0 40px 8px #D4AF37 inset",
                zIndex: -1,
              }}
            ></div>
            <div
              className="background-cycle cycle-inner metallic-gradient"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: 550,
                height: 550,
                border: "1.5px solid rgba(255,255,255,0.5)",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(212,175,55,0.07) 0%,rgba(255,255,255,0.12) 80%)",
                boxShadow: "0 0 30px 6px #D4AF37 inset",
                zIndex: -1,
              }}
            ></div>
            {/* Connecting lines */}
            <div
              className="connecting-lines"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                zIndex: -2,
              }}
            >
              <div
                className="connecting-line line1 metallic-line"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 375,
                  height: 2,
                  background:
                    "linear-gradient(90deg,rgba(212,175,55,0.18),rgba(212,175,55,0.5))",
                  boxShadow: "0 0 8px 2px #D4AF37",
                  transform: "rotate(0deg)",
                  transformOrigin: "left center",
                }}
              ></div>
              <div
                className="connecting-line line2 metallic-line"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 375,
                  height: 2,
                  background:
                    "linear-gradient(90deg,rgba(212,175,55,0.18),rgba(212,175,55,0.5))",
                  boxShadow: "0 0 8px 2px #D4AF37",
                  transform: "rotate(90deg)",
                  transformOrigin: "left center",
                }}
              ></div>
              <div
                className="connecting-line line3 metallic-line"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 375,
                  height: 2,
                  background:
                    "linear-gradient(90deg,rgba(212,175,55,0.18),rgba(212,175,55,0.5))",
                  boxShadow: "0 0 8px 2px #D4AF37",
                  transform: "rotate(180deg)",
                  transformOrigin: "left center",
                }}
              ></div>
              <div
                className="connecting-line line4 metallic-line"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 375,
                  height: 2,
                  background:
                    "linear-gradient(90deg,rgba(212,175,55,0.18),rgba(212,175,55,0.5))",
                  boxShadow: "0 0 8px 2px #D4AF37",
                  transform: "rotate(270deg)",
                  transformOrigin: "left center",
                }}
              ></div>
            </div>
            {/* Rotating wheel with 3D and metallic effects */}
            <div
              className="wheel group metallic-3d" 
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  animation: `rotate ${rotationDuration}s linear infinite`,
                  animationPlayState: pauseOnHover ? "running" : "paused",
                  zIndex: 1,
                  transformStyle: "preserve-3d",
                  boxShadow:
                    "0 16px 48px 0 rgba(31,38,135,0.18), 0 0 80px 10px #D4AF37 inset",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.animationPlayState = "paused";
                  Array.from(
                    e.currentTarget.querySelectorAll(
                      ".step-card-content,.marker-content"
                    )
                  ).forEach(
                    (el) => ((el as HTMLElement).style.animationPlayState = "paused")
                  );
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.animationPlayState = "running";
                  Array.from(
                    e.currentTarget.querySelectorAll(
                      ".step-card-content,.marker-content"
                    )
                  ).forEach(
                    (el) =>
                      ((el as HTMLElement).style.animationPlayState = "running")
                  );
                }}
                role="list"
                aria-label="Process steps"
            >
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="step-marker"
                  role="listitem"
                  aria-label={`Step ${step.id}: ${step.title}`}
                  style={{
                    position: "absolute",
                    ...step.position,
                    zIndex: 2,
                  }}
                >
                  <button
                    onClick={() => handleStepClick(step.id)}
                    className="marker-content focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    style={{ 
                      animation: `counter-rotate ${rotationDuration}s linear infinite`,
                      animationPlayState: pauseOnHover ? "running" : "paused"
                    }}
                    aria-label={`${step.title} - ${step.description}`}
                  >
                    {step.id}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {/* Keyframes and metallic/glassmorphism enhancements */}
      <style>{`
        @keyframes rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes counter-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
        
        @keyframes floatOuter {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(-48%, -52%) rotate(5deg) scale(1.02);
          }
          50% {
            transform: translate(-50%, -48%) rotate(0deg) scale(1.05);
          }
          75% {
            transform: translate(-52%, -52%) rotate(-5deg) scale(1.02);
          }
        }

        @keyframes floatMiddle {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
          }
          33% {
            transform: translate(-51%, -49%) rotate(-3deg) scale(1.03);
          }
          66% {
            transform: translate(-49%, -51%) rotate(3deg) scale(1.03);
          }
        }

        @keyframes floatInner {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            box-shadow: 0 0 30px 6px #D4AF37 inset;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1) rotate(180deg);
            box-shadow: 0 0 50px 12px #D4AF37 inset;
          }
        }

        .step-card-content,
        .marker-content {
          animation: counter-rotate 35s linear infinite;
        }
        
        .metallic-heading {
          background: linear-gradient(90deg, #fff 0%, #D4AF37 40%, #AA8C2C 60%, #fff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .metallic-perspective {
          perspective: 1800px;
        }
        .metallic-gradient {
          background: linear-gradient(135deg, 
            #F4E9C9 0%, 
            #D4AF37 40%, 
            #AA8C2C 60%, 
            #F4E9C9 100%
          );
          animation: shimmer 3s linear infinite;
        }
        .metallic-3d {
          transform-style: preserve-3d;
        }
        .step-card {
          background: rgba(255,255,255,0.45);
          border-radius: 18px;
          box-shadow: 0 12px 40px 0 rgba(31,38,135,0.22), 0 0 32px 4px #D4AF37 inset;
          border: 2.5px solid rgba(212,175,55,0.18);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          transition: transform 0.4s cubic-bezier(.4,2,.3,1), box-shadow 0.4s cubic-bezier(.4,2,.3,1);
        }
        .step-card:hover {
          transform: rotateY(8deg) scale(1.06) translateY(-8px);
          box-shadow: 0 24px 60px 0 rgba(31,38,135,0.28), 0 0 48px 8px #D4AF37 inset;
        }
        .step-icon {
          background: linear-gradient(135deg, #F4E9C9 0%, #D4AF37 60%, #AA8C2C 100%);
          box-shadow: 0 8px 20px rgba(212,175,55,0.18), 0 0 16px 2px #D4AF37 inset;
          border: 2px solid rgba(255,255,255,0.7);
          transition: transform 0.4s cubic-bezier(.4,2,.3,1);
        }
        .step-card:hover .step-icon {
          transform: rotateZ(12deg) scale(1.12);
        }
        .get-started-btn {
          background: linear-gradient(135deg, #D4AF37 60%, #AA8C2C 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          font-size: 15px;
          letter-spacing: 0.5px;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(212,175,55,0.38), 0 0 24px 4px #D4AF37 inset;
          position: relative;
          overflow: hidden;
          text-shadow: 0px 1px 1px rgba(0,0,0,0.18);
          transition: box-shadow 0.4s, transform 0.4s;
        }
        .get-started-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          transition: 0.7s;
        }
        .get-started-btn:hover {
          box-shadow: 0 12px 36px rgba(212,175,55,0.48), 0 0 36px 8px #D4AF37 inset;
          transform: scale(1.04) rotateZ(-2deg);
          background: linear-gradient(135deg, #ea384c 60%, #b91c1c 100%) !important;
        }
        .get-started-btn:hover::before {
          left: 100%;
        }
        .step-icon svg {
          filter: drop-shadow(0px 2px 4px rgba(212,175,55,0.18));
          transition: transform 0.4s cubic-bezier(.4,2,.3,1);
        }
        .step-card:hover .step-icon svg {
          transform: rotate(-10deg) scale(1.18);
        }
        .metallic-line {
          box-shadow: 0 0 8px 2px #D4AF37, 0 0 16px 4px #AA8C2C inset;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorksWheel;