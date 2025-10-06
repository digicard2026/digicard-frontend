import React, { useState, useEffect, useRef } from "react";
import { FiPhone, FiPhoneOff, FiMic, FiMicOff, FiArrowRight, FiPause } from "react-icons/fi";
import { IoIosKeypad } from "react-icons/io";
import { motion } from 'framer-motion';
import { getCookie } from "../../utility/cookies";
import { API_URL } from "../../utility/constants";
import JsSIP from "jssip";
const userId = getCookie('user_id');
console.log(userId,'user_id line 8')

const SIP_SERVER = import.meta.env.VITE_SIP_SERVER;
const SIP_URI = import.meta.env.VITE_SIP_URI;
const SIP_PASSWORD = import.meta.env.VITE_SIP_PASSWORD;

console.log("Sip server",SIP_SERVER);
console.log("Sip uri",SIP_URI);
console.log("Sip password",SIP_PASSWORD);



const CallControls = ({ phoneNumber }) => {
    const [callStatus, setCallStatus] = useState("idle");
    const [isMuted, setIsMuted] = useState(false);
    const [isOnHold, setIsOnHold] = useState(false);
    const [keypadVisible, setKeypadVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [callDuration, setCallDuration] = useState(0);
    const [callId, setCallId] = useState('');
    const [agentStatus, setAgentStatus] = useState("Available");
 
    const [session, setSession] = useState(null);
    const uaRef = useRef(null);
    const timerRef = useRef(null);
    const audioRef = useRef(null);


    const statusOptions = [
        { value: "Available", color: "bg-green-500" },
        { value: "Busy", color: "bg-red-500" },
        { value: "On a Call", color: "bg-orange-500" },
        { value: "Not Available", color: "bg-slate-500" },
        { value: "Away", color: "bg-blue-500" },
        { value: "Lunch Break", color: "bg-yellow-500" },
        { value: "Back Office", color: "bg-teal-500" },
        { value: "ACW", color: "bg-purple-500" },
        { value: "Training", color: "bg-pink-500" },
        { value: "Do Not Disturb", color: "bg-black" },
    ];
    useEffect(() => {
      if (!SIP_SERVER || !SIP_URI || !SIP_PASSWORD) {
        console.error("SIP credentials are missing");
        return;
      }
  
   
      const socket = new JsSIP.WebSocketInterface(SIP_SERVER);
      const config = {
        sockets: [socket],
        uri: SIP_URI,
        password: SIP_PASSWORD,
        session_timers: false,
        // iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
      };
  
      const ua = new JsSIP.UA(config);
      uaRef.current = ua;
  
    
      ua.on("registered", () => console.log("SIP Registered"));
     

      ua.on("registrationFailed", (e) => console.error("SIP Registration Failed", e));
      JsSIP.debug.enable("JsSIP:*"); 
      ua.start();
  
      return () => {
        ua.stop();
      };
    }, []);



    useEffect(() => {
        if (phoneNumber) {
            setInputValue(phoneNumber)
        }
    }, [phoneNumber])
   
    useEffect(() => {
      if (callStatus === "connected") {
        timerRef.current = setInterval(() => {
          setCallDuration((prev) => prev + 1);
        }, 1000);
      } else {
        clearInterval(timerRef.current);
        if (callStatus === "idle") setCallDuration(0);
      }
  
      return () => clearInterval(timerRef.current);
    }, [callStatus]);

    const formatDuration = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

const handleCallToggle = () => {
    if (callStatus === "idle") {
      if (!uaRef.current || !uaRef.current.isRegistered()) {
        console.error("SIP client not registered");
        return;
      }

      const newSession = uaRef.current.call(`sip:${inputValue}@65.2.37.168`, {
        mediaConstraints: { audio: true, video: false },
        rtcOfferConstraints: {
          offerToReceiveAudio: true, 
          offerToReceiveVideo: false,
        }
      });

      setSession(newSession);
      setCallStatus("calling");

      newSession.on("progress", () => setCallStatus("ringing"));
      newSession.on("accepted", () => {
        setCallStatus("connected");
        attachRemoteAudio(newSession);
    });
      newSession.on("ended", () => {
        setCallStatus("idle")
        setIsMuted(false);
        setIsOnHold(false);
      });
      newSession.on("failed", () => setCallStatus("idle"));
      
    } else {
      if (session) {
        session.terminate();
      }
      setCallStatus("idle");
      setIsMuted(false);
      setIsOnHold(false);
    }
  };

  const attachRemoteAudio = (session) => {
    const remoteStream = new MediaStream();
    session.connection.getReceivers().forEach(receiver => {
        if (receiver.track) remoteStream.addTrack(receiver.track);
    });

    if (audioRef.current) {
        audioRef.current.srcObject = remoteStream;
        audioRef.current.play().catch(error => console.error("Audio play error:", error));
    }
};

const handleMuteToggle = () => {
  if (session) {
      const audioSender = session.connection.getSenders().find(sender => sender.track.kind === "audio");
      if (audioSender) {
          audioSender.track.enabled = !isMuted;
          setIsMuted(!isMuted);
      }
  }
};

  
  const handleHoldToggle = () => {
    if (session) {
      if (!isOnHold) {
        session.hold();
      } else {
        session.unhold();
      }
      setIsOnHold(!isOnHold);
      console.log("Hold status:", isOnHold);
    }
  };

    const handleKeypadPress = (value) => {
        setInputValue((prev) => prev + value);
    };


return (
<div className="bg-white rounded-md px-5 py-2">
<audio ref={audioRef} autoPlay />
    <div
      className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-6"
      style={{ minHeight: "80px" }} 
    >
      {/* Status Dropdown */}
      <div className="flex items-center space-x-2">
        <select
          value={agentStatus}
          onChange={(e) => setAgentStatus(e.target.value)}
          className="py-2 px-8 text-sm border border-slate-300 rounded-md appearance-none bg-white focus:outline-none focus:ring focus:ring-blue-200"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
        {agentStatus && (
          <span
            className={`w-3 h-3 rounded-full absolute left-40 ${
              statusOptions.find((option) => option.value === agentStatus)?.color
            }`}
            title={agentStatus}
          ></span>
        )}
      </div>
  
      {/* Input Field with Keypad */}
      <div className="relative">
        <div className="flex items-center border border-slate-300 rounded-md bg-white focus-within:ring focus-within:ring-blue-200">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter number"
            className="w-full py-2 px-3 text-sm text-slate-700 focus:outline-none"
          />
          <button
            className="py-2.5 px-2 rounded-r text-slate-600 bg-[#C4D9FF] hover:text-slate-800"
            onClick={() => setKeypadVisible((prev) => !prev)}
          >
            <IoIosKeypad size={18} />
          </button>
        </div>
  
        {keypadVisible && (
          <div className="absolute left-0 w-full mt-2 bg-[#C4D9FF] border border-zinc-300 rounded-md shadow-lg">
            <div className="grid grid-cols-3 gap-2 p-2">
              {[...Array(9).keys()].map((num) => (
                <button
                  key={num + 1}
                  className="w-full h-10 bg-white text-slate-700 rounded hover:bg-slate-200"
                  onClick={() => handleKeypadPress((num + 1).toString())}
                >
                  {num + 1}
                </button>
              ))}
              <button
                className="w-full h-10 bg-white text-slate-700 rounded hover:bg-slate-200"
                onClick={() => handleKeypadPress("*")}
              >
                *
              </button>
              <button
                className="w-full h-10 bg-white text-slate-700 rounded hover:bg-slate-200"
                onClick={() => handleKeypadPress("0")}
              >
                0
              </button>
              <button
                className="w-full h-10 bg-white text-slate-700 rounded hover:bg-slate-200"
                onClick={() => handleKeypadPress("#")}
              >
                #
              </button>
            </div>
          </div>
        )}
      </div>
  
      {/* Call Status */}
      <div className="text-sm w-50 font-medium text-center">
        <div
          className={`px-4 py-0.5 rounded-md ${
            callStatus === "idle"
              ? "bg-zinc-100 text-zinc-600"
              : callStatus === "calling"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {callStatus === "idle" && (
            <>
              <div className="font-semibold py-2">Idle</div>
            
            </>
          )}
          {callStatus === "calling" &&(
            <>
              <div className="font-semibold">Calling...</div>
              <div className="text-xs">{formatDuration(callDuration)}</div>
            </>)}
          {callStatus === "connected" && (
            <>
              <div className="font-semibold">Connected</div>
              <div className="text-xs">{formatDuration(callDuration)}</div>
            </>
          )}
        </div>
      </div>
  
      {/* Call Controls */}
     

<div className="flex items-center gap-3 justify-end">
  {callStatus === "connected" && (
    <>
      {/* Mute Button */}
      <motion.button
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'tween', duration: 0.5 }}
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isMuted
            ? "bg-red-500 text-white"
            : "bg-slate-200 text-slate-600 hover:bg-red-500 hover:text-white"
        }`}
        onClick={handleMuteToggle}
      >
        {isMuted ? <FiMicOff size={16} /> : <FiMic size={16} />}
      </motion.button>

      
      <motion.button
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'tween', duration: 0.6 }}
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isOnHold
            ? "bg-yellow-500 text-white"
            : "bg-slate-200 text-slate-600 hover:bg-yellow-500 hover:text-white"
        }`}
        onClick={handleHoldToggle}
      >
        <FiPause size={16} />
      </motion.button>

      
      <motion.button
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'tween', duration: 0.7 }}
        className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600"
        onClick={() => console.log("Call Forward")}
      >
        <FiArrowRight size={16} />
      </motion.button>
    </>
  )}

  {/* Call/Hangup Button */}
  <motion.button
    // initial={{ x: '100%', opacity: 0 }}
    // animate={{ x: 0, opacity: 1 }}
    // transition={{ type: 'tween', duration: 0.8 }}
    className={`w-10 h-10 rounded-full flex items-center justify-center ${
      callStatus === "idle"
        ? "bg-green-500 hover:bg-green-600"
        : "bg-red-500 hover:bg-red-600"
    } text-white`}
    onClick={handleCallToggle}
  >
    {callStatus === "idle" ? <FiPhone size={16} /> : <FiPhoneOff size={16} />}
  </motion.button>
</div>

    </div>
  </div>
  
)  
};

export default CallControls;

