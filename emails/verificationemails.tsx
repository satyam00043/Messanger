import React, { useState } from "react";
import axios from "axios";

interface VerificationEmailProps {
  email: string;
}

const VerificationEmail: React.FC<VerificationEmailProps> = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "verifying" | "verified" | "failed">("idle");
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    setStatus("sending");
    try {
      await axios.post("/api/send-otp", { email });
      setStatus("sent");
      setMessage("OTP has been sent to your email.");
    } catch (error) {
      setStatus("failed");
      setMessage("Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    setStatus("verifying");
    try {
      const response = await axios.post("/api/verify-otp", { email, otp });
      if (response.data.success) {
        setStatus("verified");
        setMessage("Email verified successfully!");
      } else {
        setStatus("failed");
        setMessage("Incorrect OTP. Please try again.");
      }
    } catch (error) {
      setStatus("failed");
      setMessage("Verification failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Verify Your Email</h2>

      <p className="mb-2 text-gray-700">Email: <strong>{email}</strong></p>

      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={sendOtp}
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending OTP..." : "Send OTP"}
      </button>

      {status === "sent" || status === "failed" ? (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
          />
          <button
            onClick={verifyOtp}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {status === "verifying" ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      ) : null}

      {message && (
        <p className={`mt-4 text-sm ${status === "verified" ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default VerificationEmail;
