import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const HowItWorksWheel = () => {
  const navigate = useNavigate();

  // Button link handlers
  const handleStepClick = useCallback(
    (step: number) => {
      switch (step) {
        case 1:
        case 2:
          navigate("/signup");
          break;
        case 3:
          navigate("/jobs");
          break;
        case 4:
          navigate("/community");
          break;
        default:
          break;
      }
    },
    [navigate]
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
    >
      <h1
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
            animation: "rotate 35s linear infinite",
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
        >
          {/* Step Markers */}
          <div
            className="step-marker"
            id="marker1"
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
          >
            <div
              className="marker-content"
              id="marker1-content"
              style={{ animation: "counter-rotate 35s linear infinite" }}
            >
              1
            </div>
          </div>
          <div
            className="step-marker"
            id="marker2"
            style={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
          >
            <div
              className="marker-content"
              id="marker2-content"
              style={{ animation: "counter-rotate 35s linear infinite" }}
            >
              2
            </div>
          </div>
          <div
            className="step-marker"
            id="marker3"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
          >
            <div
              className="marker-content"
              id="marker3-content"
              style={{ animation: "counter-rotate 35s linear infinite" }}
            >
              3
            </div>
          </div>
          <div
            className="step-marker"
            id="marker4"
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
          >
            <div
              className="marker-content"
              id="marker4-content"
              style={{ animation: "counter-rotate 35s linear infinite" }}
            >
              4
            </div>
          </div>
          {/* Step Cards */}
          <div
            className="step-card"
            id="card1"
            style={{
              position: "absolute",
              top: 70,
              left: "50%",
              transform: "translateX(-50%)",
              width: 210,
            }}
          >
            <div
              className="step-card-content"
              id="card1-content"
              style={{
                animation: "counter-rotate 35s linear infinite",
                display: "block",
              }}
            >
              <div
                className="step-icon"
                style={{
                  width: 60,
                  height: 60,
                  background: "rgba(244,233,201,0.3)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px",
                  backdropFilter: "blur(5px)",
                  boxShadow: "0 8px 15px rgba(212,175,55,0.1)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  style={{
                    width: 30,
                    height: 30,
                    fill: "#D4AF37",
                    filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
                  }}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2v-6zm0 8h-2v2h2v-2z" />
                </svg>
              </div>
              <div
                className="step-title"
                style={{
                  fontWeight: "bold",
                  fontSize: 22,
                  marginBottom: 10,
                  color: "#333",
                  textShadow: "0px 1px 2px rgba(255,255,255,0.8)",
                  fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                  letterSpacing: 0.5,
                }}
              >
                Create Account
              </div>
              <div
                className="step-desc"
                style={{
                  fontSize: 15,
                  color: "#444",
                  marginBottom: 20,
                  lineHeight: 1.5,
                }}
              >
                Sign up in minutes to join our healthcare network
              </div>
              <button
                className="get-started-btn"
                style={{
                  background: "linear-gradient(135deg,#D4AF37,#AA8C2C)",
                  color: "#fff",
                  border: "none",
                  padding: "10px 0",
                  width: "90%",
                  margin: "0 auto",
                  borderRadius: 8,
                  fontWeight: "bold",
                  fontSize: 14,
                  letterSpacing: 0.5,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(212,175,55,0.3)",
                  position: "relative",
                  overflow: "hidden",
                  textShadow: "0px 1px 1px rgba(0,0,0,0.2)",
                }}
                onClick={() => handleStepClick(1)}
              >
                Get Started
              </button>
            </div>
          </div>
          <div
            className="step-card"
            id="card2"
            style={{
              position: "absolute",
              top: "50%",
              right: 70,
              transform: "translateY(-50%)",
              width: 210,
            }}
          >
            <div
              className="step-card-content"
              id="card2-content"
              style={{
                animation: "counter-rotate 35s linear infinite",
                display: "block",
              }}
            >
              <div
                className="step-icon"
                style={{
                  width: 60,
                  height: 60,
                  background: "rgba(244,233,201,0.3)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px",
                  backdropFilter: "blur(5px)",
                  boxShadow: "0 8px 15px rgba(212,175,55,0.1)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  style={{
                    width: 30,
                    height: 30,
                    fill: "#D4AF37",
                    filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
                  }}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div
                className="step-title"
                style={{
                  fontWeight: "bold",
                  fontSize: 22,
                  marginBottom: 10,
                  color: "#333",
                  textShadow: "0px 1px 2px rgba(255,255,255,0.8)",
                  fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                  letterSpacing: 0.5,
                }}
              >
                Get Verified
              </div>
              <div
                className="step-desc"
                style={{
                  fontSize: 15,
                  color: "#444",
                  marginBottom: 20,
                  lineHeight: 1.5,
                }}
              >
                Complete your profile and verification process
              </div>
              <button
                className="get-started-btn"
                style={{
                  background: "linear-gradient(135deg,#D4AF37,#AA8C2C)",
                  color: "#fff",
                  border: "none",
                  padding: "10px 0",
                  width: "90%",
                  margin: "0 auto",
                  borderRadius: 8,
                  fontWeight: "bold",
                  fontSize: 14,
                  letterSpacing: 0.5,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(212,175,55,0.3)",
                  position: "relative",
                  overflow: "hidden",
                  textShadow: "0px 1px 1px rgba(0,0,0,0.2)",
                }}
                onClick={() => handleStepClick(2)}
              >
                Get Started
              </button>
            </div>
          </div>
          <div
            className="step-card"
            id="card3"
            style={{
              position: "absolute",
              bottom: 70,
              left: "50%",
              transform: "translateX(-50%)",
              width: 210,
            }}
          >
            <div
              className="step-card-content"
              id="card3-content"
              style={{
                animation: "counter-rotate 35s linear infinite",
                display: "block",
              }}
            >
              <div
                className="step-icon"
                style={{
                  width: 60,
                  height: 60,
                  background: "rgba(244,233,201,0.3)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px",
                  backdropFilter: "blur(5px)",
                  boxShadow: "0 8px 15px rgba(212,175,55,0.1)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  style={{
                    width: 30,
                    height: 30,
                    fill: "#D4AF37",
                    filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
                  }}
                >
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </div>
              <div
                className="step-title"
                style={{
                  fontWeight: "bold",
                  fontSize: 22,
                  marginBottom: 10,
                  color: "#333",
                  textShadow: "0px 1px 2px rgba(255,255,255,0.8)",
                  fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                  letterSpacing: 0.5,
                }}
              >
                Maximize Opportunities
              </div>
              <div
                className="step-desc"
                style={{
                  fontSize: 15,
                  color: "#444",
                  marginBottom: 20,
                  lineHeight: 1.5,
                }}
              >
                Upskill to get paid well for your skills and hard work
              </div>
              <button
                className="get-started-btn"
                style={{
                  background: "linear-gradient(135deg,#D4AF37,#AA8C2C)",
                  color: "#fff",
                  border: "none",
                  padding: "10px 0",
                  width: "90%",
                  margin: "0 auto",
                  borderRadius: 8,
                  fontWeight: "bold",
                  fontSize: 14,
                  letterSpacing: 0.5,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(212,175,55,0.3)",
                  position: "relative",
                  overflow: "hidden",
                  textShadow: "0px 1px 1px rgba(0,0,0,0.2)",
                }}
                onClick={() => handleStepClick(3)}
              >
                Get Started
              </button>
            </div>
          </div>
          <div
            className="step-card"
            id="card4"
            style={{
              position: "absolute",
              top: "50%",
              left: 70,
              transform: "translateY(-50%)",
              width: 210,
            }}
          >
            <div
              className="step-card-content"
              id="card4-content"
              style={{
                animation: "counter-rotate 35s linear infinite",
                display: "block",
              }}
            >
              <div
                className="step-icon"
                style={{
                  width: 60,
                  height: 60,
                  background: "rgba(244,233,201,0.3)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px",
                  backdropFilter: "blur(5px)",
                  boxShadow: "0 8px 15px rgba(212,175,55,0.1)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  style={{
                    width: 30,
                    height: 30,
                    fill: "#D4AF37",
                    filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
                  }}
                >
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <div
                className="step-title"
                style={{
                  fontWeight: "bold",
                  fontSize: 22,
                  marginBottom: 10,
                  color: "#333",
                  textShadow: "0px 1px 2px rgba(255,255,255,0.8)",
                  fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                  letterSpacing: 0.5,
                }}
              >
                Connect
              </div>
              <div
                className="step-desc"
                style={{
                  fontSize: 15,
                  color: "#444",
                  marginBottom: 20,
                  lineHeight: 1.5,
                }}
              >
                Join discussions and grow your professional network
              </div>
              <button
                className="get-started-btn"
                style={{
                  background: "linear-gradient(135deg,#D4AF37,#AA8C2C)",
                  color: "#fff",
                  border: "none",
                  padding: "10px 0",
                  width: "90%",
                  margin: "0 auto",
                  borderRadius: 8,
                  fontWeight: "bold",
                  fontSize: 14,
                  letterSpacing: 0.5,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(212,175,55,0.3)",
                  position: "relative",
                  overflow: "hidden",
                  textShadow: "0px 1px 1px rgba(0,0,0,0.2)",
                }}
                onClick={() => handleStepClick(4)}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
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
