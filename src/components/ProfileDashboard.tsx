
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ExternalLink, Eye, EyeOff, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardCard from "@/components/DashboardCard";
import Card3D from "@/components/Card3D";
import { Switch } from "@/components/ui/switch";

const userSkillData = {
  BLS: { certificateUploaded: false, quizCount: 12, gamePlayed: true },
  ACLS: { certificateUploaded: true, quizCount: 5, gamePlayed: false },
  ETHICS: { certificateUploaded: true, quizCount: 15, gamePlayed: false },
  COMMUNICATION: { certificateUploaded: false, quizCount: 8, gamePlayed: true },
  RESUME: { uploaded: false },
};

function getSkillBadge(skill: string) {
  const data = userSkillData[skill];
  if (!data) return null;
  if (data.certificateUploaded) {
    return <span className="ml-1 px-2 py-0.5 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold">ADVANCED</span>;
  }
  if ((data.quizCount && data.quizCount > 10) || data.gamePlayed) {
    return <span className="ml-1 px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold">BASIC</span>;
  }
  return null;
}

const ProfileDashboard = () => {
  const [subspecialty, setSubspecialty] = useState("");
  const [basicSkills, setBasicSkills] = useState("BASIC");
  const [advancedSkills, setAdvancedSkills] = useState("ADVANCED");
  const [availability, setAvailability] = useState("Yes, immediately");
  const [showScore, setShowScore] = useState(true);
  const [showEarnings, setShowEarnings] = useState(true);

  const subspecialties = [
    "General Practice",
    "Obstetrics",
    "Gynecology",
    "Pediatrics",
    "Surgery",
  ];

  const basicSkillOptions = ["BASIC", "INTERMEDIATE", "ADVANCED"];
  const advancedSkillOptions = ["ADVANCED", "BASIC", "NONE"];
  
  const availabilityOptions = [
    "Yes, immediately",
    "Yes, <30 days",
    "Yes, >30 days",
    "Not available"
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="grid grid-cols-12 border-b">
        {/* Profile Photo Section */}
        <div className="col-span-12 md:col-span-2 p-4 border-r flex flex-col justify-center items-center">
          <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-xs text-white text-center font-semibold border-2 border-[#D4AF37]">
            UPLOAD PICTURE HERE
          </div>
        </div>

        {/* Name and Title Section */}
        <div className="col-span-12 md:col-span-6 p-4 border-r">
          <h1 className="text-xl font-bold">OREDOLA ADEOLA</h1>
          <p className="text-sm mt-2">MIDWIFE | REGISTERED NURSE</p>
          <div className="mt-2 flex items-center">
            <p className="text-sm mr-2">MDCN: MD12345</p>
            <a 
              href="https://portal.mdcn.gov.ng/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-d4af37 hover:text-d4af37/80"
            >
              <ExternalLink size={14} className="mr-1" />
              <span className="text-xs">Verify</span>
            </a>
          </div>
          <div className="mt-4">
            <p className="text-sm mb-1 font-bold">SUBSPECIALITY:</p>
            <Select value={subspecialty} onValueChange={setSubspecialty}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select subspeciality" />
              </SelectTrigger>
              <SelectContent>
                {subspecialties.map(specialty => (
                  <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Score Section */}
        <div className="col-span-6 md:col-span-2 p-4 border-r">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-semibold text-primary">Your GLOHSEN SCORE</p>
            <div className="flex items-center">
              <Switch
                id="score-toggle"
                checked={showScore}
                onCheckedChange={setShowScore}
                className="data-[state=checked]:bg-primary"
              />
              <label htmlFor="score-toggle" className="ml-2">
                {showScore ? <Eye size={16} /> : <EyeOff size={16} />}
              </label>
            </div>
          </div>
          {showScore ? (
            <div className="text-2xl font-bold text-primary text-right">77</div>
          ) : (
            <div className="text-2xl font-bold text-gray-300 text-right">***</div>
          )}
          <div className="flex justify-between items-center mt-4 mb-2">
            <p className="text-xs font-semibold text-primary">EMPLOYER CRITERIA SCORE</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-[#EA384C]">{showScore ? '85/110' : '***'}</span>
            <Link to="/score">
              <Button size="sm" variant="outline" className="ml-2 text-xs px-2 py-1">View Score</Button>
            </Link>
          </div>
        </div>

        {/* Earnings Section */}
        <div className="col-span-6 md:col-span-2 p-4 border-r">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
              <p className="text-xs font-bold text-[#EA384C] tracking-wide">EARNINGS</p>
              <div className="flex items-center gap-2">
                <Switch
                  id="earnings-toggle"
                  checked={showEarnings}
                  onCheckedChange={setShowEarnings}
                  className="data-[state=checked]:bg-primary"
                />
                <label htmlFor="earnings-toggle" className="ml-2">
                  {showEarnings ? <Eye size={16} /> : <EyeOff size={16} />}
                </label>
              </div>
            </div>
            <span className={`text-lg font-bold ${showEarnings ? 'text-black' : 'text-gray-300'}`}>{showEarnings ? 'N5,000,000' : 'N*,***,***'}</span>
            <Link to="/wallet-transaction">
              <Button size="sm" className="button-3d bg-[#D4AF37] text-black font-bold mt-2 w-full">Withdraw</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Skills & Availability Section */}
      <div className="grid grid-cols-12">
        {/* Skills Section */}
        <div className="col-span-12 md:col-span-3 border-r">
          <div className="p-2 border-b bg-gray-100">
            <p className="text-xs font-bold text-[#EA384C] tracking-wide">SKILLS/CERTIFICATES</p>
          </div>
          {/* BASIC SKILLS */}
          <div className="p-2 border-b">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#EA384C] tracking-wide">BASIC</span>
            </div>
          </div>
          <div className="grid grid-cols-1 text-xs">
            <div className="p-2 border-b flex items-center gap-1">BLS {getSkillBadge("BLS")}</div>
            <div className="p-2 border-b flex items-center gap-1">ACLS {getSkillBadge("ACLS")}</div>
            <div className="p-2 border-b flex items-center gap-1">ETHICS {getSkillBadge("ETHICS")}</div>
            <div className="p-2 border-b flex items-center gap-1">COMMUNICATION {getSkillBadge("COMMUNICATION")}</div>
            <div className="p-2 border-b flex items-center gap-1">RESUME/CV
              <Button size="sm" variant="outline" className="ml-2 flex items-center gap-1">
                <Upload className="h-3 w-3" /> Upload
              </Button>
            </div>
          </div>
          {/* ADVANCED SKILLS */}
          <div className="p-2 border-b">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#EA384C] tracking-wide">ADVANCED</span>
            </div>
          </div>
          <div className="grid grid-cols-1 text-xs">
            <div className="p-1 border-b flex items-center gap-1">B.Sc <span className="ml-1 px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold">BASIC</span></div>
            <div className="p-1 border-b text-primary flex items-center gap-1">M.Sc <span className="ml-1 px-2 py-0.5 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold">ADVANCED</span></div>
            <div className="p-1 border-b flex items-center gap-1">MEDICALS <span className="ml-1 px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold">BASIC</span></div>
            <div className="p-1 border-b flex items-center gap-1">Peri-Op Nurse <span className="ml-1 px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold">BASIC</span></div>
            <div className="p-1 border-b flex items-center gap-1">MPH <span className="ml-1 px-2 py-0.5 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold">ADVANCED</span></div>
          </div>
        </div>

        {/* Availability & Courses Section */}
        <div className="col-span-12 md:col-span-9">
          {/* Availability */}
          <div className="p-2 border-b">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#EA384C] tracking-wide">AVAILABILITY FOR LOCUM</span>
              <div className="flex items-center">
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger className="w-40 h-6 text-xs">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    {availabilityOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {/* Removed table/drop-downs under AVAILABILITY FOR LOCUM as requested */}
          
          {/* CME Courses Section */}
          <div className="grid grid-cols-2">
            {/* Recommended Courses */}
            <div className="border-r">
              <div className="p-2 border-b bg-white text-center">
                <p className="text-xs font-bold text-[#EA384C] tracking-wide">CME COURSES RECOMMENDED</p>
              </div>
              <div className="text-xs flex flex-col gap-2">
                <Card3D 
                  title="ACLS"
                  value="Re-Attempt"
                  variant="default"
                  className="m-2 p-2 bg-gray-200 text-black border-gray-300 text-xs"
                />
                <Card3D 
                  title="NORMAL DELIVERY"
                  value="Attempt"
                  variant="default"
                  className="m-2 p-2 bg-gray-200 text-black border-gray-300 text-xs"
                />
                <Card3D 
                  title="FIRE SAFETY"
                  value="Attempt"
                  variant="default"
                  className="m-2 p-2 bg-gray-200 text-black border-gray-300 text-xs"
                />
              </div>
            </div>
            {/* Courses Taken */}
            <div>
              <div className="p-2 border-b bg-white text-center">
                <p className="text-xs font-bold text-[#EA384C] tracking-wide">CME COURSES TAKEN</p>
              </div>
              <div className="text-xs flex flex-col gap-2">
                <Card3D 
                  title="BLS"
                  value="ADVANCED"
                  variant="default"
                  className="m-2 p-2 bg-[#D4AF37] text-black border-[#D4AF37] text-xs"
                />
                <Card3D 
                  title="ETHICS"
                  value="ADVANCED"
                  variant="default"
                  className="m-2 p-2 bg-[#D4AF37] text-black border-[#D4AF37] text-xs"
                />
                <Card3D 
                  title="COMMUNICATION"
                  value="ADVANCED"
                  variant="default"
                  className="m-2 p-2 bg-[#D4AF37] text-black border-[#D4AF37] text-xs"
                />
              </div>
            </div>
          </div>
          
          {/* Locum Jobs Section */}
          <div className="grid grid-cols-2 border-t">
            <div className="border-r">
              <div className="p-2 border-b">
                <p className="text-xs font-bold text-[#EA384C] tracking-wide">LOCUM JOBS</p>
              </div>
              <div className="p-2 text-xs">
                <div>Completed - 4</div>
                <div className="flex items-center mt-1">
                  <span>Offers</span>
                  <span className="ml-8 text-xs text-primary">- 5 (click to view)</span>
                </div>
              </div>
            </div>
            <div>
              <div className="p-2 border-b">
                <p className="text-xs font-bold text-[#EA384C] tracking-wide">ABOUT TO EXPIRE</p>
              </div>
              <div className="p-2 text-xs">
                <div>Annual License</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
