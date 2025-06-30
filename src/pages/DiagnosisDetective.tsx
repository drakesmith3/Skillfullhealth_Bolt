import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PreHeader from "../components/PreHeader";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { 
  Award, Trophy, Users, Calendar, Clock, Brain, Star, Medal, Zap, Heart, Target, BookOpen,
  PlayCircle, Pause, RotateCcw, CheckCircle, XCircle, Timer, Lightbulb, Shield, 
  Flame, Sparkles, Crown, Lock, ArrowLeft, ArrowRight, Gamepad2, Stethoscope,
  Activity, Pill, Syringe, Microscope, Dna, HeartPulse, Eye, UserCheck,
  ChevronRight, RefreshCw, X, HelpCircle, SkipForward, Plus, Droplet, 
  Scissors, Dumbbell
} from "lucide-react";
import { soundManager, playClick, playWhoosh } from "../utils/soundUtils";

const DiagnosisDetectiveGame = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, levelComplete, gameComplete, gameOver
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streakCount, setStreakCount] = useState(0);
  const [boosters, setBoosters] = useState({ hint: 3, skipQuestion: 1, extraLife: 1 });
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [particles, setParticles] = useState([]);
  const [hintUsed, setHintUsed] = useState(false);
  const [wrongAnswersHidden, setWrongAnswersHidden] = useState([]);
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [streakBonus, setStreakBonus] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [showStreakBonus, setShowStreakBonus] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const gameData = {
    1: {
      title: "Central Nervous System (CNS)",
      icon: Brain,
      color: "from-purple-500 to-indigo-600",
      questions: [
        {
          id: "1a",
          patient: "68-year-old woman with chest pain and altered mental status",
          symptoms: ["Severe headache", "Hypertension", "Bradycardia", "Irregular breathing"],
          signs: ["Systolic BP >180 mmHg", "HR <60 bpm", "Irregular respirations", "Papilledema"],
          triad: "Cushing's Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Intracranial_pressure.svg/512px-Intracranial_pressure.svg.png",
          options: [
            { id: 'a', text: "Increased Intracranial Pressure", isCorrect: true },
            { id: 'b', text: "Hypertensive Crisis", isCorrect: false },
            { id: 'c', text: "Only God can tell what's wrong", isCorrect: false }
          ],
          explanation: "Cushing's Triad (hypertension, bradycardia, irregular breathing) indicates increased intracranial pressure - requires immediate neurosurgical intervention to prevent brain herniation."
        },
        {
          id: "1b",
          patient: "45-year-old man with multiple sclerosis presenting with coordination issues",
          symptoms: ["Slurred speech", "Intention tremor", "Jerky eye movements", "Balance problems"],
          signs: ["Scanning speech", "Tremor with movement", "Nystagmus", "Ataxic gait"],
          triad: "Charcot's Neurologic Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Multiple_sclerosis_brain_MRI.jpg",
          options: [
            { id: 'a', text: "Multiple Sclerosis", isCorrect: true },
            { id: 'b', text: "Parkinson's Disease", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "Charcot's neurologic triad (scanning speech, intention tremor, nystagmus) is characteristic of multiple sclerosis, indicating brainstem and cerebellar involvement."
        },
        {
          id: "1c",
          patient: "72-year-old with sudden onset severe headache and neck stiffness",
          symptoms: ["Thunderclap headache", "Neck stiffness", "Photophobia", "Nausea and vomiting"],
          signs: ["Nuchal rigidity", "Positive Kernig's sign", "Positive Brudzinski's sign", "Altered consciousness"],
          triad: "Meningeal Irritation Signs",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/81/Meningitis_lumbar_puncture.jpg",
          options: [
            { id: 'a', text: "Acute Bacterial Meningitis", isCorrect: true },
            { id: 'b', text: "Tension Headache", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "Classic meningeal signs (neck stiffness, photophobia, Kernig's/Brudzinski's signs) with thunderclap headache indicate bacterial meningitis requiring immediate antibiotics and lumbar puncture."
        },
        {
          id: "1d",
          patient: "35-year-old with sudden onset left-sided weakness and speech difficulty",
          symptoms: ["Sudden left arm weakness", "Facial droop", "Slurred speech", "Confusion"],
          signs: ["Left hemiparesis", "Facial asymmetry", "Dysarthria", "Positive Babinski sign"],
          triad: "Acute Stroke Syndrome",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Stroke_NIH.jpg",
          options: [
            { id: 'a', text: "Acute Ischemic Stroke", isCorrect: true },
            { id: 'b', text: "Bell's Palsy", isCorrect: false },
            { id: 'c', text: "I don't care what it is", isCorrect: false }
          ],
          explanation: "Sudden onset focal neurological deficits (hemiparesis, facial droop, dysarthria) indicate acute stroke requiring immediate thrombolytic therapy within therapeutic window."
        },
        {
          id: "1e",
          patient: "28-year-old with recurrent episodes of confusion and strange behavior",
          symptoms: ["Recurrent confusion", "Strange behavior", "Memory loss", "Automatisms"],
          signs: ["Post-ictal confusion", "Tongue biting", "Incontinence", "EEG abnormalities"],
          triad: "Seizure Disorder Signs",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/EEG_spike_wave.png",
          options: [
            { id: 'a', text: "Temporal Lobe Epilepsy", isCorrect: true },
            { id: 'b', text: "Psychiatric Disorder", isCorrect: false },
            { id: 'c', text: "Only God can tell", isCorrect: false }
          ],
          explanation: "Recurrent episodes of altered consciousness with automatisms, post-ictal confusion, and EEG abnormalities indicate temporal lobe epilepsy requiring antiepileptic therapy."
        }
      ]
    },
    2: {
      title: "Peripheral Nervous System (PNS)",
      icon: Zap,
      color: "from-yellow-500 to-orange-600",
      questions: [
        {
          id: "2a",
          patient: "32-year-old female with recent neck trauma",
          symptoms: ["Drooping eyelid", "Smaller pupil", "Facial dryness on one side"],
          signs: ["Ptosis", "Miosis", "Anhidrosis", "Enophthalmos"],
          triad: "Horner's Syndrome",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Horner%27s_syndrome.jpg",
          options: [
            { id: 'a', text: "Horner's Syndrome", isCorrect: true },
            { id: 'b', text: "Bell's Palsy", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "Classic triad of ptosis, miosis, and anhidrosis indicates disruption of the sympathetic pathway, often from carotid dissection or apical lung tumor."
        },
        {
          id: "2b",
          patient: "55-year-old diabetic with progressive weakness",
          symptoms: ["Muscle weakness", "Fatigue with activity", "Double vision", "Difficulty swallowing"],
          signs: ["Ptosis worsening throughout day", "Proximal weakness", "Normal reflexes", "Positive edrophonium test"],
          triad: "Myasthenic Crisis Signs",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Myasthenia_gravis_ptosis.jpg",
          options: [
            { id: 'a', text: "Myasthenia Gravis", isCorrect: true },
            { id: 'b', text: "Muscular Dystrophy", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "Myasthenia gravis presents with fatigable weakness, ptosis, and bulbar symptoms due to acetylcholine receptor antibodies at the neuromuscular junction."
        },
        {
          id: "2c",
          patient: "40-year-old with ascending paralysis after gastroenteritis",
          symptoms: ["Progressive weakness", "Tingling in hands and feet", "Difficulty breathing", "Facial weakness"],
          signs: ["Ascending paralysis", "Areflexia", "Respiratory compromise", "CSF protein elevation"],
          triad: "Guillain-Barré Syndrome",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Guillain_barre_syndrome.jpg",
          options: [
            { id: 'a', text: "Guillain-Barré Syndrome", isCorrect: true },
            { id: 'b', text: "Spinal Cord Compression", isCorrect: false },
            { id: 'c', text: "I don't care", isCorrect: false }
          ],
          explanation: "Ascending paralysis with areflexia following infection indicates Guillain-Barré syndrome requiring supportive care and possible plasmapheresis or IVIG."
        },
        {
          id: "2d",
          patient: "60-year-old diabetic with foot drop and numbness",
          symptoms: ["Foot drop", "Numbness in feet", "Burning sensation", "Night pain"],
          signs: ["Loss of ankle reflexes", "Distal sensory loss", "Weakness of dorsiflexion", "Positive monofilament test"],
          triad: "Diabetic Neuropathy",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Diabetic_foot_ulcer.jpg",
          options: [
            { id: 'a', text: "Diabetic Peripheral Neuropathy", isCorrect: true },
            { id: 'b', text: "Lumbar Radiculopathy", isCorrect: false },
            { id: 'c', text: "Only God can tell", isCorrect: false }
          ],
          explanation: "Distal symmetric sensorimotor neuropathy with loss of reflexes and positive monofilament test in diabetic indicates diabetic peripheral neuropathy."
        },
        {
          id: "2e",
          patient: "25-year-old with sudden facial paralysis after cold exposure",
          symptoms: ["Sudden facial weakness", "Inability to close eye", "Loss of taste", "Drooling"],
          signs: ["Complete facial paralysis", "Loss of forehead wrinkles", "Inability to smile", "Hyperacusis"],
          triad: "Bell's Palsy Signs",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/Bells_palsy.jpg",
          options: [
            { id: 'a', text: "Bell's Palsy", isCorrect: true },
            { id: 'b', text: "Stroke", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "Acute onset unilateral complete facial paralysis with hyperacusis and loss of taste indicates Bell's palsy, requiring corticosteroids within 72 hours."
        }
      ]
    },
    3: {
      title: "Lymphatic (Immune) System",
      icon: Shield,
      color: "from-green-500 to-emerald-600",
      questions: [
        {
          id: "3a",
          patient: "25-year-old with recurrent infections and unusual symptoms",
          symptoms: ["Recurrent pneumonia", "Thrush", "Weight loss", "Night sweats"],
          signs: ["Lymphadenopathy", "Oral candidiasis", "CD4+ count <200", "Opportunistic infections"],
          triad: "AIDS-defining Conditions",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/HIV_virion-en.svg/512px-HIV_virion-en.svg.png",
          options: [
            { id: 'a', text: "AIDS", isCorrect: true },
            { id: 'b', text: "Primary Immunodeficiency", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "AIDS is diagnosed with CD4+ count <200 or AIDS-defining opportunistic infections in HIV-positive patients, requiring immediate antiretroviral therapy."
        },
        {
          id: "3b",
          patient: "40-year-old with joint pain and systemic symptoms",
          symptoms: ["Joint pain", "Butterfly rash", "Photosensitivity", "Kidney problems"],
          signs: ["Malar rash", "Proteinuria", "ANA positive", "Anti-dsDNA positive"],
          triad: "SLE Manifestations",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Lupus_rash.jpg",
          options: [
            { id: 'a', text: "Systemic Lupus Erythematosus", isCorrect: true },
            { id: 'b', text: "Rheumatoid Arthritis", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "SLE diagnosis requires 4/11 ACR criteria including malar rash, arthritis, nephritis, and positive ANA/anti-dsDNA antibodies."
        },
        {
          id: "3c",
          patient: "50-year-old with enlarged lymph nodes and fever",
          symptoms: ["Painless lymphadenopathy", "Night sweats", "Weight loss", "Fatigue"],
          signs: ["Enlarged spleen", "Fever >38°C", "Lymph node biopsy positive", "Reed-Sternberg cells"],
          triad: "Hodgkin's Lymphoma B-symptoms",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Hodgkin_lymphoma.jpg",
          options: [
            { id: 'a', text: "Hodgkin's Lymphoma", isCorrect: true },
            { id: 'b', text: "Infectious Mononucleosis", isCorrect: false },
            { id: 'c', text: "Only God can tell", isCorrect: false }
          ],
          explanation: "Painless lymphadenopathy with B-symptoms (fever, night sweats, weight loss) and Reed-Sternberg cells indicates Hodgkin's lymphoma."
        },
        {
          id: "3d",
          patient: "35-year-old with recurrent severe allergic reactions",
          symptoms: ["Severe hives", "Difficulty breathing", "Swelling of face", "Rapid pulse"],
          signs: ["Urticaria", "Laryngeal edema", "Hypotension", "Bronchospasm"],
          triad: "Anaphylaxis Signs",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Anaphylaxis.png",
          options: [
            { id: 'a', text: "Anaphylaxis", isCorrect: true },
            { id: 'b', text: "Asthma Attack", isCorrect: false },
            { id: 'c', text: "I don't care", isCorrect: false }
          ],
          explanation: "Rapid onset of urticaria, respiratory distress, and hypotension indicates anaphylaxis requiring immediate epinephrine administration."
        },
        {
          id: "3e",
          patient: "60-year-old with recurrent infections and low antibody levels",
          symptoms: ["Frequent infections", "Chronic diarrhea", "Failure to thrive", "Recurrent pneumonia"],
          signs: ["Low immunoglobulin levels", "Poor vaccine response", "Chronic lung disease", "Malabsorption"],
          triad: "Common Variable Immunodeficiency",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Immunodeficiency.jpg",
          options: [
            { id: 'a', text: "Common Variable Immunodeficiency", isCorrect: true },
            { id: 'b', text: "Chronic Fatigue Syndrome", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "Recurrent infections with low immunoglobulin levels and poor vaccine response indicates CVID requiring immunoglobulin replacement therapy."
        }
      ]
    },
    4: {
      title: "Cardiovascular (Circulatory) System",
      icon: Heart,
      color: "from-red-500 to-pink-600",
      questions: [
        {
          id: "4a",
          patient: "45-year-old male presents to ER with severe chest pain",
          symptoms: ["Severe chest pain", "Shortness of breath", "Diaphoresis", "Anxiety"],
          signs: ["BP: 80/50 mmHg", "JVD present", "Muffled heart sounds", "Pulsus paradoxus"],
          triad: "Beck's Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Cardiac_tamponade.svg/512px-Cardiac_tamponade.svg.png",
          options: [
            { id: 'a', text: "Cardiac Tamponade", isCorrect: true },
            { id: 'b', text: "Myocardial Infarction", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "Beck's Triad (hypotension, JVD, muffled heart sounds) is pathognomonic for cardiac tamponade, which requires immediate pericardiocentesis."
        },
        {
          id: "4b",
          patient: "65-year-old with sudden tearing chest pain",
          symptoms: ["Tearing chest pain", "Back pain", "Syncope", "Asymmetric pulses"],
          signs: ["Blood pressure differential >20 mmHg", "Aortic regurgitation murmur", "Widened mediastinum on CXR"],
          triad: "Aortic Dissection Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Aortic_dissection_stanford.svg",
          options: [
            { id: 'a', text: "Aortic Dissection", isCorrect: true },
            { id: 'b', text: "Myocardial Infarction", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "Aortic dissection presents with tearing pain, pulse deficits, and widened mediastinum - Type A requires emergent surgical repair."
        },
        {
          id: "4c",
          patient: "70-year-old with crushing chest pain and shortness of breath",
          symptoms: ["Crushing chest pain", "Shortness of breath", "Nausea", "Left arm pain"],
          signs: ["ST elevation on ECG", "Elevated troponins", "S3 gallop", "Pulmonary rales"],
          triad: "STEMI with Heart Failure",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/12_lead_ecg.jpg",
          options: [
            { id: 'a', text: "ST-Elevation Myocardial Infarction", isCorrect: true },
            { id: 'b', text: "Unstable Angina", isCorrect: false },
            { id: 'c', text: "Only God can tell", isCorrect: false }
          ],
          explanation: "Crushing chest pain with ST elevation and elevated troponins indicates STEMI requiring immediate reperfusion therapy (PCI or thrombolysis)."
        },
        {
          id: "4d",
          patient: "55-year-old with severe leg pain and cold extremity",
          symptoms: ["Severe leg pain", "Cold foot", "Numbness", "Inability to move toes"],
          signs: ["Absent pulses", "Pallor", "Paralysis", "Paresthesias", "Poikilothermia"],
          triad: "Acute Limb Ischemia - 5 P's",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Acute_limb_ischemia.jpg",
          options: [
            { id: 'a', text: "Acute Limb Ischemia", isCorrect: true },
            { id: 'b', text: "Deep Vein Thrombosis", isCorrect: false },
            { id: 'c', text: "I don't care", isCorrect: false }
          ],
          explanation: "The 5 P's (Pain, Pallor, Pulselessness, Paresthesias, Paralysis) indicate acute limb ischemia requiring emergency revascularization."
        },
        {
          id: "4e",
          patient: "80-year-old with syncope and slow heart rate",
          symptoms: ["Syncope", "Dizziness", "Fatigue", "Shortness of breath"],
          signs: ["Heart rate 35 bpm", "Cannon A waves", "Variable S1", "Complete heart block on ECG"],
          triad: "Complete Heart Block",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Complete_heart_block.png",
          options: [
            { id: 'a', text: "Complete Heart Block", isCorrect: true },
            { id: 'b', text: "Sinus Bradycardia", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "Complete AV dissociation with bradycardia and syncope indicates complete heart block requiring immediate pacemaker insertion."
        }
      ]
    },
    5: {
      title: "Reproductive System",
      icon: Users,
      color: "from-pink-500 to-rose-600",
      questions: [
        {
          id: "5a",
          patient: "28-year-old female with severe pelvic pain",
          symptoms: ["Severe pelvic pain", "Missed period", "Vaginal bleeding", "Shoulder pain"],
          signs: ["Cervical motion tenderness", "Adnexal mass", "Positive β-hCG", "Hemodynamic instability"],
          triad: "Ectopic Pregnancy Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Ectopic_pregnancy.svg",
          options: [
            { id: 'a', text: "Ectopic Pregnancy", isCorrect: true },
            { id: 'b', text: "Ovarian Cyst Rupture", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "Classic ectopic pregnancy triad: amenorrhea, pelvic pain, and vaginal bleeding with positive β-hCG requires immediate surgical intervention."
        },
        {
          id: "5b",
          patient: "35-year-old with fertility concerns and hirsutism",
          symptoms: ["Irregular periods", "Weight gain", "Hirsutism", "Acne", "Infertility"],
          signs: ["Obesity", "Male-pattern hair growth", "Acanthosis nigricans", "Enlarged ovaries on ultrasound"],
          triad: "PCOS Manifestations",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/PCOS.svg",
          options: [
            { id: 'a', text: "Polycystic Ovary Syndrome", isCorrect: true },
            { id: 'b', text: "Thyroid Dysfunction", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "PCOS diagnosis requires 2/3: oligoovulation, hyperandrogenism, and polycystic ovaries on ultrasound - leading cause of female infertility."
        },
        {
          id: "5c",
          patient: "45-year-old female with irregular menstrual bleeding",
          symptoms: ["Heavy menstrual bleeding", "Pelvic pressure", "Abdominal enlargement", "Urinary frequency"],
          signs: ["Enlarged uterus", "Irregular contour", "Menorrhagia", "Iron deficiency anemia"],
          triad: "Uterine Fibroids Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Uterine_fibroids.jpg",
          options: [
            { id: 'a', text: "Uterine Fibroids", isCorrect: true },
            { id: 'b', text: "Endometrial Cancer", isCorrect: false },
            { id: 'c', text: "Only God can tell", isCorrect: false }
          ],
          explanation: "Uterine fibroids present with menorrhagia, pelvic pressure, and enlarged uterus - benign smooth muscle tumors requiring symptom-based management."
        },
        {
          id: "5d",
          patient: "22-year-old female with severe menstrual pain",
          symptoms: ["Severe dysmenorrhea", "Pelvic pain", "Painful intercourse", "Heavy periods"],
          signs: ["Nodular uterosacral ligaments", "Fixed retroverted uterus", "Chocolate cysts on ultrasound"],
          triad: "Endometriosis Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Endometriosis.jpg",
          options: [
            { id: 'a', text: "Endometriosis", isCorrect: true },
            { id: 'b', text: "Primary Dysmenorrhea", isCorrect: false },
            { id: 'c', text: "I don't care", isCorrect: false }
          ],
          explanation: "Endometriosis triad: dysmenorrhea, dyspareunia, and infertility with chocolate cysts indicates ectopic endometrial tissue requiring hormonal suppression."
        },
        {
          id: "5e",
          patient: "30-year-old male with testicular swelling and pain",
          symptoms: ["Testicular swelling", "Dull aching pain", "Feeling of heaviness", "Infertility concerns"],
          signs: ["Bag of worms feeling", "Increased size when standing", "Decreased sperm count", "Left-sided predominance"],
          triad: "Varicocele Signs",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/v/v8/Varicocele.jpg/512px-Varicocele.jpg",
          options: [
            { id: 'a', text: "Varicocele", isCorrect: true },
            { id: 'b', text: "Hydrocele", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "Varicocele presents as 'bag of worms' mass that increases with standing - most common cause of male infertility requiring surgical repair if symptomatic."
        }
      ]
    },
    6: {
      title: "Renal/Urinary System",
      icon: Droplet,
      color: "from-blue-500 to-cyan-600",
      questions: [
        {
          id: "6a",
          patient: "45-year-old male with flank pain and hematuria",
          symptoms: ["Severe flank pain", "Nausea", "Vomiting", "Blood in urine"],
          signs: ["CVA tenderness", "Hematuria", "Crystalluria", "Hydronephrosis on CT"],
          triad: "Renal Colic Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Kidney_stone.jpg/512px-Kidney_stone.jpg",
          options: [
            { id: 'a', text: "Nephrolithiasis", isCorrect: true },
            { id: 'b', text: "Pyelonephritis", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "Classic renal colic presents with severe flank pain, hematuria, and nausea - most stones <5mm pass spontaneously with conservative management."
        },
        {
          id: "6b",
          patient: "60-year-old with progressive kidney failure",
          symptoms: ["Fatigue", "Decreased urine output", "Swelling", "Shortness of breath"],
          signs: ["Elevated creatinine", "Proteinuria", "Hypertension", "Anemia"],
          triad: "Chronic Kidney Disease Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Kidney_nephron.svg/512px-Kidney_nephron.svg.png",
          options: [
            { id: 'a', text: "Chronic Kidney Disease", isCorrect: true },
            { id: 'b', text: "Acute Kidney Injury", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "CKD is diagnosed with GFR <60 mL/min/1.73m² for >3 months or kidney damage markers - requires staging and nephrology referral."
        },
        {
          id: "6c",
          patient: "25-year-old female with dysuria and frequency",
          symptoms: ["Burning urination", "Urinary frequency", "Urgency", "Suprapubic pain"],
          signs: ["Positive nitrites", "Positive leukocyte esterase", "WBC >10/hpf", "Bacteria on microscopy"],
          triad: "Urinary Tract Infection",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Urinalysis.jpg/512px-Urinalysis.jpg",
          options: [
            { id: 'a', text: "Urinary Tract Infection", isCorrect: true },
            { id: 'b', text: "Vaginitis", isCorrect: false },
            { id: 'c', text: "Only God can tell", isCorrect: false }
          ],
          explanation: "UTI diagnosed with dysuria, frequency, and positive urinalysis (nitrites, leukocyte esterase) - requires antibiotic therapy based on culture."
        },
        {
          id: "6d",
          patient: "70-year-old male with difficulty urinating",
          symptoms: ["Difficulty starting urination", "Weak stream", "Incomplete emptying", "Nocturia"],
          signs: ["Enlarged prostate on DRE", "Post-void residual >100 mL", "Elevated PSA", "Bladder distention"],
          triad: "Benign Prostatic Hyperplasia",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Benign_prostatic_hyperplasia.jpg/512px-Benign_prostatic_hyperplasia.jpg",
          options: [
            { id: 'a', text: "Benign Prostatic Hyperplasia", isCorrect: true },
            { id: 'b', text: "Prostate Cancer", isCorrect: false },
            { id: 'c', text: "I don't care", isCorrect: false }
          ],
          explanation: "BPH presents with obstructive urinary symptoms and enlarged prostate - treated with alpha-blockers or 5-alpha reductase inhibitors."
        },
        {
          id: "6e",
          patient: "35-year-old with facial swelling and foamy urine",
          symptoms: ["Facial swelling", "Foamy urine", "Weight gain", "Decreased urination"],
          signs: ["Periorbital edema", "Proteinuria >3.5 g/day", "Hypoalbuminemia", "Hyperlipidemia"],
          triad: "Nephrotic Syndrome",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/n/n8/Nephrotic_syndrome.jpg/512px-Nephrotic_syndrome.jpg",
          options: [
            { id: 'a', text: "Nephrotic Syndrome", isCorrect: true },
            { id: 'b', text: "Nephritic Syndrome", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "Nephrotic syndrome: proteinuria >3.5 g/day, hypoalbuminemia, edema, and hyperlipidemia - requires renal biopsy and immunosuppressive therapy."
        }
      ]
    },
    7: {
      title: "Skeletal System",
      icon: Scissors,
      color: "from-gray-400 to-gray-600",
      questions: [
        {
          id: "7a",
          patient: "70-year-old postmenopausal woman with hip fracture",
          symptoms: ["Hip pain after fall", "Inability to bear weight", "Shortened leg", "External rotation"],
          signs: ["Tenderness over greater trochanter", "Limited range of motion", "DEXA scan T-score -2.5"],
          triad: "Osteoporotic Fracture Pattern",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Hip_fracture.jpg/512px-Hip_fracture.jpg",
          options: [
            { id: 'a', text: "Osteoporosis with Fracture", isCorrect: true },
            { id: 'b', text: "Osteomalacia", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "Osteoporotic hip fractures in elderly require surgical fixation and bone density evaluation - T-score ≤-2.5 confirms osteoporosis."
        },
        {
          id: "7b",
          patient: "45-year-old with joint pain and morning stiffness",
          symptoms: ["Symmetrical joint pain", "Morning stiffness >1 hour", "Fatigue", "Low-grade fever"],
          signs: ["Synovial swelling", "Positive RF", "Positive anti-CCP", "Joint space narrowing on X-ray"],
          triad: "Rheumatoid Arthritis Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Rheumatoid_arthritis.jpg/512px-Rheumatoid_arthritis.jpg",
          options: [
            { id: 'a', text: "Rheumatoid Arthritis", isCorrect: true },
            { id: 'b', text: "Osteoarthritis", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "RA diagnosis requires symmetrical polyarthritis, positive RF/anti-CCP, and elevated inflammatory markers - early treatment prevents joint destruction."
        },
        {
          id: "7c",
          patient: "50-year-old with sudden severe back pain",
          symptoms: ["Sudden severe back pain", "Loss of height", "Difficulty bending", "Chronic pain"],
          signs: ["Vertebral compression fracture", "Kyphotic deformity", "Osteopenia on X-ray", "T-score <-2.5"],
          triad: "Vertebral Compression Fracture",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Vertebral_compression_fracture.jpg/512px-Vertebral_compression_fracture.jpg",
          options: [
            { id: 'a', text: "Vertebral Compression Fracture", isCorrect: true },
            { id: 'b', text: "Herniated Disc", isCorrect: false },
            { id: 'c', text: "Only God can tell", isCorrect: false }
          ],
          explanation: "Vertebral compression fractures from osteoporosis cause sudden back pain and height loss - may require vertebroplasty or kyphoplasty."
        },
        {
          id: "7d",
          patient: "60-year-old male with progressive joint deformity",
          symptoms: ["Joint stiffness", "Bone pain", "Deformity", "Hearing loss"],
          signs: ["Enlarged skull", "Bowing deformity of legs", "Elevated alkaline phosphatase", "Mosaic pattern on bone biopsy"],
          triad: "Paget's Disease Signs",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/p/p8/Pagets_disease.jpg/512px-Pagets_disease.jpg",
          options: [
            { id: 'a', text: "Paget's Disease", isCorrect: true },
            { id: 'b', text: "Osteosarcoma", isCorrect: false },
            { id: 'c', text: "I don't care", isCorrect: false }
          ],
          explanation: "Paget's disease shows bone enlargement, deformity, and elevated alkaline phosphatase - treated with bisphosphonates to reduce bone turnover."
        },
        {
          id: "7e",
          patient: "25-year-old athlete with knee pain and swelling",
          symptoms: ["Knee pain", "Swelling", "Clicking sensation", "Locking episodes"],
          signs: ["Joint effusion", "Positive McMurray test", "MRI shows meniscal tear", "Limited range of motion"],
          triad: "Meniscal Tear Signs",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/m/m7/Meniscal_tear.jpg/512px-Meniscal_tear.jpg",
          options: [
            { id: 'a', text: "Meniscal Tear", isCorrect: true },
            { id: 'b', text: "ACL Tear", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "Meniscal tears present with knee pain, clicking, and positive McMurray test - arthroscopic repair or meniscectomy may be needed."
        }
      ]
    },
    8: {
      title: "Muscular System",
      icon: Dumbbell,
      color: "from-orange-500 to-red-600",
      questions: [
        {
          id: "8a",
          patient: "8-year-old boy with progressive muscle weakness",
          symptoms: ["Difficulty climbing stairs", "Frequent falls", "Calf muscle enlargement", "Delayed motor milestones"],
          signs: ["Gowers' sign positive", "Pseudohypertrophy of calves", "Elevated CK", "Abnormal EMG"],
          triad: "Duchenne Muscular Dystrophy",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Gowers_sign.jpg/512px-Gowers_sign.jpg",
          options: [
            { id: 'a', text: "Duchenne Muscular Dystrophy", isCorrect: true },
            { id: 'b', text: "Becker Muscular Dystrophy", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "DMD presents with proximal weakness, calf pseudohypertrophy, and Gowers' sign - X-linked dystrophin gene mutation requires genetic counseling."
        },
        {
          id: "8b",
          patient: "30-year-old with muscle pain and dark urine after exercise",
          symptoms: ["Muscle pain", "Dark urine", "Fatigue", "Exercise intolerance"],
          signs: ["Elevated CK >10,000", "Myoglobinuria", "Acute kidney injury", "Muscle tenderness"],
          triad: "Rhabdomyolysis Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Rhabdomyolysis.svg/512px-Rhabdomyolysis.svg.png",
          options: [
            { id: 'a', text: "Rhabdomyolysis", isCorrect: true },
            { id: 'b', text: "Viral Myositis", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "Rhabdomyolysis triad: muscle pain, dark urine (myoglobinuria), and elevated CK - requires aggressive IV hydration to prevent kidney failure."
        },
        {
          id: "8c",
          patient: "45-year-old with progressive muscle weakness and skin rash",
          symptoms: ["Proximal muscle weakness", "Skin rash", "Difficulty swallowing", "Fatigue"],
          signs: ["Heliotrope rash", "Gottron's papules", "Elevated CK", "Muscle biopsy showing inflammation"],
          triad: "Dermatomyositis Signs",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Dermatomyositis.jpg/512px-Dermatomyositis.jpg",
          options: [
            { id: 'a', text: "Dermatomyositis", isCorrect: true },
            { id: 'b', text: "Polymyositis", isCorrect: false },
            { id: 'c', text: "Only God can tell", isCorrect: false }
          ],
          explanation: "Dermatomyositis presents with proximal weakness and characteristic skin rashes (heliotrope, Gottron's) - autoimmune condition requiring immunosuppression."
        },
        {
          id: "8d",
          patient: "65-year-old with muscle cramps and weakness",
          symptoms: ["Muscle cramps", "Weakness", "Fasciculations", "Difficulty speaking"],
          signs: ["Upper and lower motor neuron signs", "Muscle atrophy", "Fasciculations", "Normal sensory function"],
          triad: "Amyotrophic Lateral Sclerosis",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/ALS_signs.jpg/512px-ALS_signs.jpg",
          options: [
            { id: 'a', text: "Amyotrophic Lateral Sclerosis", isCorrect: true },
            { id: 'b', text: "Multiple Sclerosis", isCorrect: false },
            { id: 'c', text: "I don't care", isCorrect: false }
          ],
          explanation: "ALS shows combined upper and lower motor neuron signs with fasciculations and preserved sensation - progressive neurodegenerative disease."
        },
        {
          id: "8e",
          patient: "40-year-old with widespread muscle pain and tender points",
          symptoms: ["Widespread muscle pain", "Fatigue", "Sleep disturbance", "Cognitive difficulties"],
          signs: ["Multiple tender points", "Normal muscle strength", "Normal inflammatory markers", "Allodynia"],
          triad: "Fibromyalgia Syndrome",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Fibromyalgia_tender_points.jpg/512px-Fibromyalgia_tender_points.jpg",
          options: [
            { id: 'a', text: "Fibromyalgia", isCorrect: true },
            { id: 'b', text: "Chronic Fatigue Syndrome", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "Fibromyalgia diagnosed with widespread pain, tender points, and normal laboratory studies - treated with multimodal pain management."
        }
      ]
    },
    9: {
      title: "Integumentary System",
      icon: Shield,
      color: "from-amber-500 to-yellow-600",
      questions: [
        {
          id: "9a",
          patient: "55-year-old with changing mole on back",
          symptoms: ["Changing mole", "Irregular borders", "Color variation", "Recent growth"],
          signs: ["Asymmetric lesion", "Border irregularity", "Color variation", "Diameter >6mm"],
          triad: "Melanoma ABCDE Criteria",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Melanoma.jpg",
          options: [
            { id: 'a', text: "Malignant Melanoma", isCorrect: true },
            { id: 'b', text: "Basal Cell Carcinoma", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "Melanoma diagnosis uses ABCDE criteria: Asymmetry, Border irregularity, Color variation, Diameter >6mm, Evolution - requires urgent dermatology referral."
        },
        {
          id: "9b",
          patient: "25-year-old with painful skin lesions and fever",
          symptoms: ["Painful skin blisters", "Fever", "Malaise", "Burning sensation"],
          signs: ["Vesicular rash", "Positive Nikolsky sign", "Mucous membrane involvement", "Skin detachment"],
          triad: "Stevens-Johnson Syndrome",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Stevens_johnson.jpg/512px-Stevens_johnson.jpg",
          options: [
            { id: 'a', text: "Stevens-Johnson Syndrome", isCorrect: true },
            { id: 'b', text: "Erythema Multiforme", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "SJS/TEN presents with painful skin detachment, positive Nikolsky sign, and mucous membrane involvement - drug reaction requiring immediate discontinuation."
        },
        {
          id: "9c",
          patient: "60-year-old with non-healing ulcer on face",
          symptoms: ["Non-healing sore", "Slow growth", "Pearly appearance", "Occasional bleeding"],
          signs: ["Rolled borders", "Central ulceration", "Telangiectasias", "Sun-exposed area"],
          triad: "Basal Cell Carcinoma Signs",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Basal_cell_carcinoma.jpg/512px-Basal_cell_carcinoma.jpg",
          options: [
            { id: 'a', text: "Basal Cell Carcinoma", isCorrect: true },
            { id: 'b', text: "Squamous Cell Carcinoma", isCorrect: false },
            { id: 'c', text: "Only God can tell", isCorrect: false }
          ],
          explanation: "BCC presents as pearly nodule with rolled borders and telangiectasias on sun-exposed areas - most common skin cancer with excellent prognosis."
        },
        {
          id: "9d",
          patient: "30-year-old with scaly red patches and joint pain",
          symptoms: ["Scaly red patches", "Joint pain", "Nail pitting", "Itching"],
          signs: ["Silvery scale", "Well-demarcated plaques", "Auspitz sign", "Psoriatic arthritis"],
          triad: "Psoriasis with Arthritis",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/p/p8/Psoriasis.jpg/512px-Psoriasis.jpg",
          options: [
            { id: 'a', text: "Psoriasis", isCorrect: true },
            { id: 'b', text: "Eczema", isCorrect: false },
            { id: 'c', text: "I don't care", isCorrect: false }
          ],
          explanation: "Psoriasis presents with well-demarcated plaques with silvery scale and may cause destructive arthritis - treated with topical agents or systemic therapy."
        },
        {
          id: "9e",
          patient: "40-year-old with painful vesicular rash following nerve distribution",
          symptoms: ["Severe burning pain", "Vesicular rash", "Unilateral distribution", "Tingling sensation"],
          signs: ["Dermatome distribution", "Vesicles on erythematous base", "Positive Tzanck smear", "Allodynia"],
          triad: "Herpes Zoster (Shingles)",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/h/h8/Herpes_zoster.jpg/512px-Herpes_zoster.jpg",
          options: [
            { id: 'a', text: "Herpes Zoster", isCorrect: true },
            { id: 'b', text: "Herpes Simplex", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "Herpes zoster presents with painful vesicular rash in dermatome distribution - treated with antivirals within 72 hours to reduce complications."
        }
      ]
    },
    10: {
      title: "Endocrine System",
      icon: Activity,
      color: "from-purple-600 to-pink-600",
      questions: [
        {
          id: "10a",
          patient: "22-year-old female with altered mental status and fruity breath",
          symptoms: ["Confusion", "Excessive thirst", "Frequent urination", "Fruity breath odor"],
          signs: ["Kussmaul respirations", "Dehydration", "Glucose >400 mg/dL", "Positive ketones"],
          triad: "DKA Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Insulin_glucose_metabolism.svg/512px-Insulin_glucose_metabolism.svg.png",
          options: [
            { id: 'a', text: "Diabetic Ketoacidosis", isCorrect: true },
            { id: 'b', text: "Hyperosmolar Hyperglycemic State", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "Classic DKA triad: hyperglycemia (>250 mg/dL), ketosis (fruity breath), and metabolic acidosis (Kussmaul respirations) - requires IV insulin and fluids."
        },
        {
          id: "10b",
          patient: "40-year-old with heat intolerance and palpitations",
          symptoms: ["Heat intolerance", "Palpitations", "Weight loss", "Anxiety", "Tremor"],
          signs: ["Tachycardia", "Exophthalmos", "Goiter", "Pretibial myxedema"],
          triad: "Graves' Disease Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Graves_disease.jpg/512px-Graves_disease.jpg",
          options: [
            { id: 'a', text: "Graves' Disease", isCorrect: true },
            { id: 'b', text: "Toxic Multinodular Goiter", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "Graves' disease presents with hyperthyroidism, goiter, and eye signs (exophthalmos) - autoimmune condition requiring antithyroid therapy."
        },
        {
          id: "10c",
          patient: "35-year-old with central obesity and purple striae",
          symptoms: ["Weight gain", "Fatigue", "Depression", "Easy bruising"],
          signs: ["Central obesity", "Purple striae", "Moon face", "Buffalo hump", "Hypertension"],
          triad: "Cushing's Syndrome Signs",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cushings_syndrome.jpg/512px-Cushings_syndrome.jpg",
          options: [
            { id: 'a', text: "Cushing's Syndrome", isCorrect: true },
            { id: 'b', text: "Metabolic Syndrome", isCorrect: false },
            { id: 'c', text: "Only God can tell", isCorrect: false }
          ],
          explanation: "Cushing's syndrome presents with central obesity, purple striae, and hypertension due to excess cortisol - requires screening tests and imaging."
        },
        {
          id: "10d",
          patient: "50-year-old with fatigue and hyperpigmentation",
          symptoms: ["Fatigue", "Weight loss", "Nausea", "Salt craving"],
          signs: ["Hyperpigmentation", "Hypotension", "Hyponatremia", "Hyperkalemia"],
          triad: "Addison's Disease Signs",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Addisons_disease.jpg/512px-Addisons_disease.jpg",
          options: [
            { id: 'a', text: "Addison's Disease", isCorrect: true },
            { id: 'b', text: "Hypothyroidism", isCorrect: false },
            { id: 'c', text: "I don't care", isCorrect: false }
          ],
          explanation: "Addison's disease presents with hyperpigmentation, hypotension, and electrolyte abnormalities - requires lifelong steroid replacement therapy."
        },
        {
          id: "10e",
          patient: "45-year-old with kidney stones and bone pain",
          symptoms: ["Kidney stones", "Bone pain", "Depression", "Fatigue"],
          signs: ["Elevated calcium", "Elevated PTH", "Kidney stones", "Osteoporosis"],
          triad: "Primary Hyperparathyroidism",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/h/h8/Hyperparathyroidism.jpg/512px-Hyperparathyroidism.jpg",
          options: [
            { id: 'a', text: "Primary Hyperparathyroidism", isCorrect: true },
            { id: 'b', text: "Vitamin D Intoxication", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "Primary hyperparathyroidism: 'stones, bones, groans, and psychiatric moans' - elevated calcium and PTH requiring parathyroidectomy."
        }
      ]
    },
    11: {
      title: "Respiratory System",
      icon: Stethoscope,
      color: "from-blue-500 to-cyan-600",
      questions: [
        {
          id: "11a",
          patient: "65-year-old smoker with sudden severe dyspnea",
          symptoms: ["Sudden chest pain", "Severe dyspnea", "Anxiety", "Rapid breathing"],
          signs: ["Decreased breath sounds", "Hyperresonance", "Tracheal deviation", "Hemodynamic instability"],
          triad: "Tension Pneumothorax",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Tension_pneumothorax.svg/512px-Tension_pneumothorax.svg.png",
          options: [
            { id: 'a', text: "Tension Pneumothorax", isCorrect: true },
            { id: 'b', text: "Simple Pneumothorax", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "Tension pneumothorax with tracheal deviation and hemodynamic compromise requires immediate needle decompression followed by chest tube."
        },
        {
          id: "11b",
          patient: "45-year-old with chronic cough and weight loss",
          symptoms: ["Chronic cough", "Weight loss", "Night sweats", "Hemoptysis"],
          signs: ["Cavitary lesions on CXR", "Positive sputum AFB", "Upper lobe infiltrates", "Lymphadenopathy"],
          triad: "Pulmonary Tuberculosis",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Tuberculosis-x-ray-1.jpg/512px-Tuberculosis-x-ray-1.jpg",
          options: [
            { id: 'a', text: "Pulmonary Tuberculosis", isCorrect: true },
            { id: 'b', text: "Lung Cancer", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "Pulmonary TB presents with chronic cough, weight loss, and cavitary lesions - requires isolation and multi-drug antitubercular therapy."
        },
        {
          id: "11c",
          patient: "70-year-old with acute dyspnea and leg swelling",
          symptoms: ["Acute shortness of breath", "Leg swelling", "Fatigue", "Chest pain"],
          signs: ["Pulmonary rales", "Elevated JVP", "S3 gallop", "Pedal edema"],
          triad: "Acute Heart Failure",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/h/h8/Heart_failure.jpg/512px-Heart_failure.jpg",
          options: [
            { id: 'a', text: "Acute Heart Failure", isCorrect: true },
            { id: 'b', text: "Pneumonia", isCorrect: false },
            { id: 'c', text: "Only God can tell", isCorrect: false }
          ],
          explanation: "Acute heart failure presents with dyspnea, rales, and elevated JVP - requires diuretics, ACE inhibitors, and afterload reduction."
        },
        {
          id: "11d",
          patient: "25-year-old with severe asthma attack",
          symptoms: ["Severe wheezing", "Difficulty breathing", "Chest tightness", "Anxiety"],
          signs: ["Accessory muscle use", "Peak flow <50% predicted", "Pulsus paradoxus", "Cyanosis"],
          triad: "Severe Asthma Exacerbation",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Asthma_attack.jpg/512px-Asthma_attack.jpg",
          options: [
            { id: 'a', text: "Severe Asthma Exacerbation", isCorrect: true },
            { id: 'b', text: "COPD Exacerbation", isCorrect: false },
            { id: 'c', text: "I don't care", isCorrect: false }
          ],
          explanation: "Severe asthma with pulsus paradoxus and accessory muscle use requires nebulized bronchodilators, steroids, and possible intubation."
        },
        {
          id: "11e",
          patient: "60-year-old smoker with progressive dyspnea",
          symptoms: ["Progressive dyspnea", "Chronic cough", "Sputum production", "Exercise intolerance"],
          signs: ["Barrel chest", "Decreased breath sounds", "Prolonged expiration", "FEV1/FVC <0.7"],
          triad: "Chronic Obstructive Pulmonary Disease",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/COPD.jpg/512px-COPD.jpg",
          options: [
            { id: 'a', text: "Chronic Obstructive Pulmonary Disease", isCorrect: true },
            { id: 'b', text: "Pulmonary Fibrosis", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "COPD diagnosis requires FEV1/FVC <0.7 with smoking history - treated with bronchodilators, steroids, and smoking cessation."
        }
      ]
    },
    12: {
      title: "Digestive System",
      icon: Target,
      color: "from-green-500 to-teal-600",
      questions: [
        {
          id: "12a",
          patient: "28-year-old male with acute abdominal pain",
          symptoms: ["RLQ pain", "Nausea", "Vomiting", "Fever", "Anorexia"],
          signs: ["McBurney's point tenderness", "Rovsing's sign positive", "Psoas sign positive", "Elevated WBC"],
          triad: "Appendicitis Signs",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Appendicitis.jpg/512px-Appendicitis.jpg",
          options: [
            { id: 'a', text: "Acute Appendicitis", isCorrect: true },
            { id: 'b', text: "Crohn's Disease", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "Classic appendicitis with McBurney's point tenderness and positive inflammatory signs requires emergent appendectomy to prevent perforation."
        },
        {
          id: "12b",
          patient: "65-year-old woman with jaundice and fever",
          symptoms: ["High fever with rigors", "Severe RUQ pain", "Jaundice", "Dark urine"],
          signs: ["Temperature 39.5°C", "Murphy's sign positive", "Elevated bilirubin", "Dilated bile ducts"],
          triad: "Charcot's Cholangitis Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Cholangitis.jpg/512px-Cholangitis.jpg",
          options: [
            { id: 'a', text: "Ascending Cholangitis", isCorrect: true },
            { id: 'b', text: "Acute Cholecystitis", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "Charcot's cholangitis triad (fever, jaundice, RUQ pain) indicates ascending cholangitis requiring emergency ERCP and antibiotics."
        },
        {
          id: "12c",
          patient: "50-year-old with severe epigastric pain radiating to back",
          symptoms: ["Severe epigastric pain", "Nausea", "Vomiting", "Pain radiating to back"],
          signs: ["Epigastric tenderness", "Elevated lipase", "CT shows pancreatic inflammation", "Grey Turner's sign"],
          triad: "Acute Pancreatitis",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/p/p4/Pancreatitis.jpg/512px-Pancreatitis.jpg",
          options: [
            { id: 'a', text: "Acute Pancreatitis", isCorrect: true },
            { id: 'b', text: "Peptic Ulcer Disease", isCorrect: false },
            { id: 'c', text: "Only God can tell", isCorrect: false }
          ],
          explanation: "Acute pancreatitis presents with severe epigastric pain, elevated lipase, and CT findings - requires NPO, fluids, and pain control."
        },
        {
          id: "12d",
          patient: "30-year-old with bloody diarrhea and abdominal cramping",
          symptoms: ["Bloody diarrhea", "Abdominal cramping", "Urgency", "Weight loss"],
          signs: ["Left lower quadrant tenderness", "Blood in stool", "Colonoscopy shows ulceration", "Continuous inflammation"],
          triad: "Ulcerative Colitis Signs",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/u/u8/Ulcerative_colitis.jpg/512px-Ulcerative_colitis.jpg",
          options: [
            { id: 'a', text: "Ulcerative Colitis", isCorrect: true },
            { id: 'b', text: "Crohn's Disease", isCorrect: false },
            { id: 'c', text: "I don't care", isCorrect: false }
          ],
          explanation: "Ulcerative colitis presents with bloody diarrhea and continuous mucosal inflammation limited to colon - treated with aminosalicylates."
        },
        {
          id: "12e",
          patient: "55-year-old with heartburn and difficulty swallowing",
          symptoms: ["Heartburn", "Difficulty swallowing", "Regurgitation", "Chest pain"],
          signs: ["Barrett's esophagus on endoscopy", "Esophageal stricture", "Positive 24-hour pH study"],
          triad: "Gastroesophageal Reflux Disease",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/g/g8/GERD.jpg/512px-GERD.jpg",
          options: [
            { id: 'a', text: "Gastroesophageal Reflux Disease", isCorrect: true },
            { id: 'b', text: "Achalasia", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "GERD with Barrett's esophagus requires proton pump inhibitors and surveillance endoscopy for dysplasia and malignancy."
        }
      ]
    },
    13: {
      title: "Somatosensory System",
      icon: Eye,
      color: "from-indigo-500 to-purple-600",
      questions: [
        {
          id: "13a",
          patient: "70-year-old with sudden severe eye pain and vision loss",
          symptoms: ["Sudden severe eye pain", "Nausea", "Halos around lights", "Blurred vision"],
          signs: ["Rock-hard eye", "Mid-dilated pupil", "Corneal edema", "IOP >40 mmHg"],
          triad: "Acute Angle-Closure Glaucoma",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Glaucoma_haloes.jpg/512px-Glaucoma_haloes.jpg",
          options: [
            { id: 'a', text: "Acute Angle-Closure Glaucoma", isCorrect: true },
            { id: 'b', text: "Central Retinal Artery Occlusion", isCorrect: false },
            { id: 'c', text: "I don't know", isCorrect: false }
          ],
          explanation: "Acute angle-closure glaucoma with elevated IOP >40 mmHg requires emergent treatment with IV mannitol and laser iridotomy to prevent blindness."
        },
        {
          id: "13b",
          patient: "50-year-old with progressive hearing loss and tinnitus",
          symptoms: ["Unilateral hearing loss", "Tinnitus", "Dizziness", "Balance problems"],
          signs: ["Sensorineural hearing loss", "Abnormal Weber test", "Cerebellopontine angle mass on MRI"],
          triad: "Acoustic Neuroma Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Acoustic_neuroma.jpg/512px-Acoustic_neuroma.jpg",
          options: [
            { id: 'a', text: "Acoustic Neuroma", isCorrect: true },
            { id: 'b', text: "Ménière's Disease", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "Acoustic neuroma presents with unilateral sensorineural hearing loss, tinnitus, and vestibular symptoms - requires neurosurgical evaluation."
        },
        {
          id: "13c",
          patient: "60-year-old diabetic with progressive vision loss",
          symptoms: ["Progressive vision loss", "Floaters", "Flashing lights", "Night blindness"],
          signs: ["Cotton wool spots", "Hard exudates", "Microaneurysms", "Neovascularization"],
          triad: "Diabetic Retinopathy",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Diabetic_retinopathy.jpg/512px-Diabetic_retinopathy.jpg",
          options: [
            { id: 'a', text: "Diabetic Retinopathy", isCorrect: true },
            { id: 'b', text: "Hypertensive Retinopathy", isCorrect: false },
            { id: 'c', text: "Only God can tell", isCorrect: false }
          ],
          explanation: "Diabetic retinopathy shows cotton wool spots, hard exudates, and neovascularization - requires laser photocoagulation and anti-VEGF therapy."
        },
        {
          id: "13d",
          patient: "40-year-old with episodes of vertigo and hearing loss",
          symptoms: ["Episodic vertigo", "Fluctuating hearing loss", "Tinnitus", "Ear fullness"],
          signs: ["Sensorineural hearing loss", "Positive Dix-Hallpike test", "Nystagmus during attacks"],
          triad: "Ménière's Disease Triad",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/m/m8/Menieres_disease.jpg/512px-Menieres_disease.jpg",
          options: [
            { id: 'a', text: "Ménière's Disease", isCorrect: true },
            { id: 'b', text: "Benign Positional Vertigo", isCorrect: false },
            { id: 'c', text: "I don't care", isCorrect: false }
          ],
          explanation: "Ménière's disease triad: episodic vertigo, fluctuating hearing loss, and tinnitus - treated with diuretics and vestibular suppressants."
        },
        {
          id: "13e",
          patient: "65-year-old with gradual vision loss and difficulty seeing at night",
          symptoms: ["Gradual vision loss", "Difficulty seeing at night", "Glare sensitivity", "Cloudy vision"],
          signs: ["Lens opacity", "Decreased red reflex", "Nuclear sclerosis", "Cortical spokes"],
          triad: "Cataract Signs",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Cataract.jpg",
          options: [
            { id: 'a', text: "Cataracts", isCorrect: true },
            { id: 'b', text: "Macular Degeneration", isCorrect: false },
            { id: 'c', text: "Studies have not yet been carried out", isCorrect: false }
          ],
          explanation: "Cataracts present with gradual vision loss, glare sensitivity, and lens opacity - treated with phacoemulsification and IOL implantation."
        }
      ]
    }
  };

  // Particle animation system
  const createParticles = useCallback((count, type = 'success', x, y) => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Math.random(),
        x: x || Math.random() * window.innerWidth,
        y: y || Math.random() * window.innerHeight,
        type,
        life: 100 + Math.random() * 50,
        size: 2 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * 4,
        speedY: -2 - Math.random() * 3
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);
  // Enhanced Timer effect with sound warnings
  useEffect(() => {
    let interval;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          // Sound warnings for time running out
          if (newTime === 10) {
            playWhoosh(); // Warning sound at 10 seconds
          } else if (newTime === 5) {
            playClick(); // Final warning at 5 seconds
          }
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeout();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);
  // Optimized particle animation with performance throttling
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => {
        if (prev.length === 0) return prev; // Skip if no particles
        return prev.map(p => ({
          ...p,
          life: p.life - 1,
          x: p.x + p.speedX,
          y: p.y + p.speedY
        })).filter(p => p.life > 0);
      });
    }, 50); // Reduced frequency for better performance
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState === 'playing' && !selectedAnswer) {
        const currentCase = gameData[currentLevel].questions[currentQuestionIndex];
        const availableOptions = currentCase.options.filter(opt => !wrongAnswersHidden.includes(opt.id));
        
        switch (event.key.toLowerCase()) {
          case 'a':
            const optionA = availableOptions.find(opt => opt.id === 'a');
            if (optionA) handleAnswerSelect(optionA);
            break;
          case 'b':
            const optionB = availableOptions.find(opt => opt.id === 'b');
            if (optionB) handleAnswerSelect(optionB);
            break;
          case 'c':
            const optionC = availableOptions.find(opt => opt.id === 'c');
            if (optionC) handleAnswerSelect(optionC);
            break;
          case '1':
            if (boosters.hint > 0 && !hintUsed) useBooster('hint');
            break;
          case '2':
            if (boosters.skipQuestion > 0) useBooster('skipQuestion');
            break;
          case '3':
            if (boosters.extraLife > 0) useBooster('extraLife');
            break;
          case 'enter':
            if (showFeedback) nextLevel();
            break;
          case 'escape':
            if (gameState === 'playing') {
                         setGameState('menu');
              setIsTimerActive(false);
              toast.info("Game exited successfully");

            }
            break;
        }
      } else if (gameState === 'menu') {
        if (event.key === 'enter' || event.key === ' ') {
          startGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, selectedAnswer, currentLevel, currentQuestionIndex, wrongAnswersHidden, boosters, hintUsed, showFeedback]);

  const handleTimeout = useCallback(() => {
    playWhoosh(); // Timeout sound
    setLives(prev => prev - 1);
    setShowFeedback(true);
    setIsTimerActive(false);
    setStreakCount(0);
    createParticles(15, 'error', window.innerWidth / 2, window.innerHeight / 2);
    toast.error("Time's up! Try to diagnose faster next time.");
    if (lives <= 1) {
      setTimeout(() => setGameState('gameOver'), 1500);
    }
  }, [lives, createParticles]);
  const handleAnswerSelect = useCallback((answer) => {
    if (selectedAnswer) return;
    
    playClick(); // Selection sound
    setSelectedAnswer(answer);
    setIsTimerActive(false);
    
    // Show feedback immediately without delay
    setShowFeedback(true);
    
    if (answer.isCorrect) {
      playWhoosh(); // Success sound
      const timeBonus = timeLeft * 10;
      const streakBonusAmount = streakCount > 0 ? Math.pow(2, streakCount) * 50 : 0;
      const totalPoints = 100 + timeBonus + streakBonusAmount;
        setScore(prev => prev + totalPoints);
      setStreakCount(prev => prev + 1);
      setStreakBonus(streakBonusAmount);
      setShowStreakBonus(streakBonusAmount > 0);
      createParticles(25, 'success', window.innerWidth / 2, window.innerHeight / 2);
      
      // Success toast with score
      toast.success(`Correct diagnosis! +${totalPoints} points${streakBonusAmount > 0 ? ` (streak bonus: +${streakBonusAmount})` : ''}`);
      
      // Award boosters for streaks
      if ((streakCount + 1) % 3 === 0) {
        setBoosters(prev => ({
          ...prev,
          hint: prev.hint + 1,
          extraLife: prev.extraLife + 1
        }));
        createParticles(15, 'booster', window.innerWidth / 2, window.innerHeight / 2);
        toast.success("Streak bonus! Gained extra hint and life!");
      }
    } else {
      // Error sound and feedback
      playWhoosh(); // Error sound (different tone)
      setLives(prev => prev - 1);
      setStreakCount(0);
      createParticles(15, 'error', window.innerWidth / 2, window.innerHeight / 2);
      toast.error("Incorrect diagnosis. Study the case more carefully!");
    }
  }, [selectedAnswer, timeLeft, streakCount, createParticles]);
  const nextLevel = useCallback(() => {
    playWhoosh(); // Level transition sound
    
    const currentLevelData = gameData[currentLevel];
    const isLastQuestionInLevel = currentQuestionIndex >= currentLevelData.questions.length - 1;
    
    if (isLastQuestionInLevel) {
      // Move to next level
      if (currentLevel < 13) {
        setCurrentLevel(prev => prev + 1);
        setCurrentQuestionIndex(0);
        resetLevel();
      } else {
        setGameState('gameComplete');
      }
    } else {
      // Move to next question in same level
      setCurrentQuestionIndex(prev => prev + 1);
      resetQuestion();
    }
  }, [currentLevel, currentQuestionIndex]);

  const resetLevel = useCallback(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTimeLeft(60);
    setIsTimerActive(true);
    setGameState('playing');
    setHintUsed(false);
    setWrongAnswersHidden([]);
    setShowStreakBonus(false);
    setCurrentQuestionIndex(0);
    setImageLoading(true);
  }, []);

  const resetQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTimeLeft(60);
    setIsTimerActive(true);
    setHintUsed(false);
    setWrongAnswersHidden([]);
    setShowStreakBonus(false);
    setImageLoading(true);
  }, []);

  const startGame = useCallback(() => {
    playClick(); // Start game sound
    // Do NOT reset currentLevel here!
    setCurrentQuestionIndex(0);
    setScore(0);
    setLives(3);
    setStreakCount(0);
    setBoosters({ hint: 3, skipQuestion: 1, extraLife: 1 });
    toast.success("Diagnosis Detective started! Good luck, doctor!");
    resetLevel();
  }, [resetLevel]);

  const useBooster = useCallback((type) => {
    if (boosters[type] > 0) {
      playClick(); // Booster activation sound
      setBoosters(prev => ({ ...prev, [type]: prev[type] - 1 }));
      
      switch (type) {
        case 'hint':
          // Remove one wrong answer
          const currentCase = gameData[currentLevel].questions[currentQuestionIndex];
          const wrongAnswers = currentCase.options
            .filter(opt => !opt.isCorrect && !wrongAnswersHidden.includes(opt.id))
            .map(opt => opt.id);
          
          if (wrongAnswers.length > 0) {
            const randomWrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
            setWrongAnswersHidden(prev => [...prev, randomWrongAnswer]);
            setHintUsed(true);
            createParticles(10, 'hint', window.innerWidth / 2, window.innerHeight / 2);
            toast.info("Hint used! One incorrect option eliminated.");
          }
          break;
          
        case 'skipQuestion':
          setStreakCount(0);
          toast.info("Question skipped. Moving to next level.");
          nextLevel();
          break;
          
        case 'extraLife':
          setLives(prev => prev + 1);
          createParticles(20, 'life', window.innerWidth / 2, window.innerHeight / 2);
          toast.success("Extra life gained! Keep diagnosing!");
          break;
      }
    } else {
      toast.error(`No ${type} boosters remaining!`);
    }
  }, [boosters, currentLevel, currentQuestionIndex, wrongAnswersHidden, createParticles, nextLevel]);

  const MenuScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Floating medical icons */}
        {['❤️', '🧠', '👁️', '🫁', '🦴', '🧬'].map((icon, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-10 animate-float"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${20 + Math.random() * 20}s`
            }}
          >
            {icon}
          </div>
        ))}
      </div>
      
      <div className="text-center z-10 px-8 max-w-4xl mx-auto">
        <div className="mb-8 relative">
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 animate-pulse">
            DIAGNOSIS
          </h1>
          <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-pink-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            DETECTIVE
          </h2>
          <div className="absolute -top-4 -right-4 text-yellow-400 animate-spin">
            <Stethoscope size={64} />
          </div>
        </div>
        
        <p className="text-xl text-gray-300 mb-12 mx-auto leading-relaxed">
          Master medical diagnosis through interactive cases across 13 body systems. Identify symptoms, recognize signs, 
          and solve clinical puzzles with classic clinical triads and pathognomonic findings. Perfect your diagnostic skills 
          with evidence-based content from trusted medical sources.
        </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <motion.button
            onClick={() => {
              playClick();
              startGame();
            }}
            className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-bold text-xl text-white hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">START DIAGNOSIS</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <ChevronRight className="inline ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
          
          <motion.button 
            onClick={() => {
              playClick();
              setShowCurriculum(true);
            }}
            className="px-8 py-4 border-2 border-purple-500 rounded-2xl font-bold text-purple-400 hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen size={20} />
            CURRICULUM
          </motion.button>
        </div>
          <div className="mt-16 max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Medical Systems Covered</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
              {Object.entries(gameData).map(([level, data]) => {
                const IconComponent = data.icon;
                return (
                  <motion.div 
                    key={level} 
                    className="group cursor-pointer" 
                    onClick={() => {
                      playClick();
                      setCurrentLevel(parseInt(level));
                      startGame();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${data.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg relative overflow-hidden mx-auto`}>
                      <IconComponent className="text-white" size={20} />
                      <div className="absolute bottom-1 right-1 text-xs font-bold text-white/80">{level}</div>
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center group-hover:text-white transition-colors leading-tight">{data.title}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
      </div>

      {/* Curriculum Modal */}
      {showCurriculum && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-gray-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sticky top-0 bg-slate-900/90 backdrop-blur-sm border-b border-gray-700/50 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">Game Curriculum</h3>
              <button 
                onClick={() => setShowCurriculum(false)}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-3">Learning Objectives</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2" />
                    <span>Recognize classic clinical triads and pathognomonic findings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2" />
                    <span>Differentiate between similar clinical presentations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2" />
                    <span>Develop systematic diagnostic reasoning skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2" />
                    <span>Learn emergent management of critical conditions</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-3">Level Breakdown</h4>
                <div className="space-y-4">
                  {Object.entries(gameData).map(([level, data]) => (
                    <div key={level} className="bg-slate-800/50 rounded-xl p-4 border border-gray-700/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${data.color} flex items-center justify-center`}>
                          <data.icon className="text-white" size={18} />
                        </div>
                        <h5 className="font-bold text-white">Level {level}: {data.title}</h5>
                      </div>
                      <p className="text-sm text-gray-300">{data.questions[0].explanation.split('.')[0]}.</p>
                      <p className="text-xs text-gray-400 mt-2">{data.questions.length} clinical cases</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-green-400 mb-3">Game Mechanics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-gray-700/30">
                    <div className="flex items-center gap-2 text-yellow-400 mb-2">
                      <Target size={18} />
                      <h5 className="font-bold">Scoring</h5>
                    </div>
                    <p className="text-sm text-gray-300">
                      Base points: 100 per correct diagnosis<br />
                      Time bonus: 10 points per second remaining<br />
                      Streak bonus: 2ⁿ×50 points for n consecutive correct answers
                    </p>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-gray-700/30">
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <Zap size={18} />
                      <h5 className="font-bold">Boosters</h5>
                    </div>
                    <p className="text-sm text-gray-300">
                      <span className="text-yellow-400">Hint:</span> Eliminates one wrong answer<br />
                      <span className="text-blue-400">Skip:</span> Pass to next question<br />
                      <span className="text-red-400">+Life:</span> Gain an extra attempt
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-700/50">
              <button
                onClick={() => setShowCurriculum(false)}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
              >
                Close Curriculum
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const GameScreen = () => {
    const currentCase = gameData[currentLevel].questions[currentQuestionIndex];
    const IconComponent = gameData[currentLevel].icon;
    const totalQuestionsInLevel = gameData[currentLevel].questions.length;
    
    // Memoize option delay calculation to prevent flickering
    const getOptionDelay = useCallback((optionId) => {
      const order = { 'a': 0, 'b': 1, 'c': 2 };
      return 0.1 * (order[optionId] || 0);
    }, []);
    
    // Memoize button class calculation to prevent unnecessary re-renders
    const getButtonClass = useCallback((option, isSelected, hasAnswered) => {
      const isCorrect = option.isCorrect;
      let buttonClass = "p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 ";
      
      if (hasAnswered) {
        if (isCorrect) {
          buttonClass += "border-green-500 bg-green-500/20 text-green-300 shadow-green-500/20 shadow-lg";
        } else if (isSelected) {
          buttonClass += "border-red-500 bg-red-500/20 text-red-300 shadow-red-500/20 shadow-lg";
        } else {
          buttonClass += "border-gray-600 bg-gray-700/30 text-gray-400";
        }
      } else {
        buttonClass += "border-gray-600 bg-gray-800/50 text-white hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 cursor-pointer";
      }
      
      return buttonClass;
    }, []);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        {/* Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className={`absolute rounded-full pointer-events-none ${
              particle.type === 'success' ? 'bg-green-400 shadow-green-400/50' :
              particle.type === 'error' ? 'bg-red-400 shadow-red-400/50' :
              particle.type === 'hint' ? 'bg-blue-400 shadow-blue-400/50' :
              particle.type === 'life' ? 'bg-red-400 shadow-red-400/50' :
              particle.type === 'booster' ? 'bg-yellow-400 shadow-yellow-400/50' : 'bg-white'
            } shadow-lg`}
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.life / 100,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              transform: `scale(${particle.life / 100})`
            }}
          />
        ))}
        
        {/* Header */}
        <div className="p-4 border-b border-gray-700/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex justify-between items-start max-w-6xl mx-auto">
            {/* Level/System Panel - Moved down by 30% */}
            <div className="flex items-center gap-4 mt-8">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gameData[currentLevel].color} flex items-center justify-center`}>
                <IconComponent className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Level {currentLevel}</h2>
                <p className="text-sm text-gray-400">{gameData[currentLevel].title} ({currentQuestionIndex + 1}/{totalQuestionsInLevel})</p>
              </div>
            </div>
            
            {/* Information Panel - Moved down by 30% */}
            <div className="flex items-center gap-4 sm:gap-6 mt-8">
              <div className="text-center hidden sm:block">
                <div className="text-xl font-bold text-cyan-400">{score}</div>
                <div className="text-xs text-gray-400">SCORE</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-400 flex items-center justify-center gap-1">
                  {Array.from({ length: lives }).map((_, i) => (
                    <Heart key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <div className="text-xs text-gray-400">LIVES</div>
              </div>              <div className="text-center">
                <motion.div 
                  className={`text-xl font-bold transition-colors duration-300 ${
                    timeLeft > 30 ? 'text-green-400' : timeLeft > 15 ? 'text-yellow-400' : 'text-red-400'
                  }`}
                  animate={timeLeft <= 10 ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
                >
                  {timeLeft}
                </motion.div>
                <div className="text-xs text-gray-400">TIME</div>
              </div>
              {streakCount > 0 && (
                <div className="hidden sm:flex items-center gap-1 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-purple-300">Streak: {streakCount}</span>
                </div>
              )}
              
              {/* Exit Game Button */}
              <motion.button
                onClick={() => setShowExitConfirm(true)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Exit to main menu"
              >
                <X size={16} />
                <span className="hidden sm:inline">Exit</span>
              </motion.button>
            </div>
          </div>
        </div>
        {/* Boosters */}
        <div className="p-4 border-b border-gray-700/30">
          <div className="max-w-6xl mx-auto flex gap-2 sm:gap-4 justify-center sm:justify-start">
            <motion.button
              onClick={() => useBooster('hint')}
              disabled={boosters.hint === 0 || hintUsed}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 disabled:opacity-50 hover:bg-yellow-500/30 transition-colors duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
              whileHover={{ scale: boosters.hint > 0 && !hintUsed ? 1.05 : 1 }}
              whileTap={{ scale: boosters.hint > 0 && !hintUsed ? 0.95 : 1 }}
            >
              <HelpCircle size={16} />
              Hint ({boosters.hint})
            </motion.button>
            <motion.button
              onClick={() => useBooster('skipQuestion')}
              disabled={boosters.skipQuestion === 0}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 disabled:opacity-50 hover:bg-blue-500/30 transition-colors duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
              whileHover={{ scale: boosters.skipQuestion > 0 ? 1.05 : 1 }}
              whileTap={{ scale: boosters.skipQuestion > 0 ? 0.95 : 1 }}
            >
              <SkipForward size={16} />
              Skip ({boosters.skipQuestion})
            </motion.button>
            <motion.button
              onClick={() => useBooster('extraLife')}
              disabled={boosters.extraLife === 0}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 disabled:opacity-50 hover:bg-red-500/30 transition-colors duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
              whileHover={{ scale: boosters.extraLife > 0 ? 1.05 : 1 }}
              whileTap={{ scale: boosters.extraLife > 0 ? 0.95 : 1 }}
            >
              <Plus size={16} />
              Life ({boosters.extraLife})
            </motion.button>
          </div>
        </div>

        {/* Case Presentation */}
        <div className="p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/30 mb-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                Case Presentation
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-semibold text-cyan-400 mb-2">Patient</h4>
                    <p className="text-gray-300">{currentCase.patient}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-semibold text-green-400 mb-2">Symptoms</h4>
                    <ul className="space-y-2">
                      {currentCase.symptoms.map((symptom, index) => (
                        <li key={index} className="text-gray-300 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2" />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-semibold text-purple-400 mb-2">Clinical Signs</h4>
                    <ul className="space-y-2">
                      {currentCase.signs.map((sign, index) => (
                        <li key={index} className="text-gray-300 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2" />
                          {sign}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Clinical Pattern - Only shown when hint is used */}
                  {hintUsed && (
                    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-3">
                      <h4 className="text-base font-semibold text-yellow-400 mb-1">Clinical Pattern (Hint)</h4>
                      <p className="text-yellow-300">{currentCase.triad}</p>
                    </div>
                  )}
                </div>

                {/* Medical Image */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-semibold text-orange-400 mb-2">Medical Reference</h4>
                    <div className="bg-slate-700/30 rounded-xl p-3 border border-gray-600/30">
                      <div className="relative">
                        {currentCase.imageUrl ? (
                          <>
                            <img 
                              src={currentCase.imageUrl} 
                              alt={`Medical illustration for ${currentCase.triad}`}
                              className="w-full h-32 object-contain rounded-lg mb-2 bg-white/10 block"
                              loading="lazy"
                              onError={(e) => {
                                console.log('Primary image failed to load:', currentCase.imageUrl);
                                const target = e.currentTarget;
                                setImageLoading(false);
                                
                                // Show educational fallback immediately
                                const fallback = target.parentElement?.querySelector('.fallback-image') as HTMLElement;
                                if (fallback) {
                                  fallback.style.display = 'flex';
                                  fallback.innerHTML = `
                                    <div class="text-center p-4">
                                      <div class="text-5xl mb-3">🩺</div>
                                      <p class="text-gray-200 text-sm font-semibold mb-1">Medical Reference</p>
                                      <p class="text-gray-300 text-xs px-2 leading-tight">${currentCase.triad}</p>
                                      <div class="mt-3 px-3 py-1 bg-blue-500/20 rounded-full">
                                        <p class="text-blue-300 text-xs">Study Material</p>
                                      </div>
                                    </div>
                                  `;
                                }
                                target.style.display = 'none';
                              }}
                              onLoad={(e) => {
                                console.log('Image loaded successfully:', currentCase.imageUrl);
                                setImageLoading(false);
                                const fallback = e.currentTarget.parentElement?.querySelector('.fallback-image') as HTMLElement;
                                if (fallback) {
                                  fallback.style.display = 'none';
                                }
                              }}
                            />
                            <div className={`fallback-image ${imageLoading ? 'flex' : 'hidden'} bg-gradient-to-br from-slate-600/50 to-slate-700/50 rounded-lg h-32 flex-col items-center justify-center border border-gray-600/30`}>
                              <div className="text-4xl mb-2 animate-pulse">🏥</div>
                              <p className="text-gray-400 text-sm text-center font-medium">Medical Reference</p>
                              <p className="text-gray-500 text-xs text-center">{imageLoading ? 'Loading Image...' : 'Image Not Available'}</p>
                            </div>
                          </>
                        ) : (
                          <div className="bg-gradient-to-br from-slate-600/50 to-slate-700/50 rounded-lg h-32 flex flex-col items-center justify-center border border-gray-600/30">
                            <div className="text-4xl mb-2 animate-bounce">📋</div>
                            <p className="text-gray-400 text-sm text-center font-medium">Medical Reference</p>
                            <p className="text-gray-500 text-xs text-center">Preparing Image...</p>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-2 text-center">Educational reference from trusted medical sources</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid md:grid-cols-2 gap-3">
              {currentCase.options.map((option) => {
                if (wrongAnswersHidden.includes(option.id)) return null;
                
                // Determine button state to prevent flickering
                const isSelected = selectedAnswer === option;
                const hasAnswered = selectedAnswer !== null;
                const buttonClass = getButtonClass(option, isSelected, hasAnswered);

                return (
                  <motion.button
                    key={`${currentLevel}-${currentQuestionIndex}-${option.id}`}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={hasAnswered}
                    className={buttonClass}
                    whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                    whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.15,
                      ease: "easeOut"
                    }}
                    layout={false}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center font-bold shrink-0">
                        {option.id.toUpperCase()}
                      </div>
                      <span className="text-left font-medium">{option.text}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>            {/* Feedback */}
            {showFeedback && (
              <div className="mt-6 bg-slate-800/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      selectedAnswer?.isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {selectedAnswer?.isCorrect ? (
                      <Star className="text-white" size={20} />
                    ) : (
                      <RefreshCw className="text-white" size={20} />
                    )}
                  </div>
                  <div>
                    <h4 
                      className={`text-xl font-bold ${selectedAnswer?.isCorrect ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {selectedAnswer?.isCorrect ? 'Correct Diagnosis!' : 'Incorrect Diagnosis'}
                    </h4>
                    {showStreakBonus && (
                      <p className="text-sm text-purple-300">
                        +{streakBonus} streak bonus!
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  {currentCase.explanation}
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={nextLevel}
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-white hover:scale-105 transform transition-all duration-200 flex-1 text-center"
                  >
                    {currentLevel < 13 ? 'Next Level' : 'Complete Game'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* TODO: Add keyboard shortcuts and exit modal */}

        {/* Keyboard Shortcuts Info Panel - Lower Left Corner */}
        <div className="fixed bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-2xl max-w-xs z-40">
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <span>⌨️</span> Keyboard Shortcuts
          </h4>
          <div className="space-y-1 text-xs text-gray-300">
            <div className="flex justify-between">
              <span>Answer A:</span>
              <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-200">1</kbd>
            </div>
            <div className="flex justify-between">
              <span>Answer B:</span>
              <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-200">2</kbd>
            </div>
            <div className="flex justify-between">
              <span>Answer C:</span>
              <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-200">3</kbd>
            </div>
            <div className="flex justify-between">
              <span>Hint:</span>
              <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-200">H</kbd>
            </div>
            <div className="flex justify-between">
              <span>Skip:</span>
              <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-200">S</kbd>
            </div>
            <div className="flex justify-between">
              <span>Extra Life:</span>
              <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-200">L</kbd>
            </div>
          </div>
        </div>

        {/* Exit Confirmation Modal */}
        {showExitConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 rounded-2xl p-8 border border-gray-700/70 shadow-2xl max-w-sm w-full mx-4">
              <h3 className="text-xl font-bold text-white mb-4">Exit Game?</h3>
              <p className="text-gray-300 mb-6">Are you sure you want to exit the game? Your progress for this session will be lost.</p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowExitConfirm(false);
                    setGameState('menu');
                    setIsTimerActive(false);
                    toast.info("Game exited successfully");
                  }}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition"
                >
                  Yes, Exit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const GameCompleteScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Celebration particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 animate-float opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}
        />
      ))}
      
      <div className="text-center px-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <Trophy className="mx-auto text-yellow-400 mb-4 animate-bounce" size={80} />
          <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            DIAGNOSIS COMPLETE!
          </h1>
          <p className="text-lg text-gray-300">You've mastered all clinical cases!</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-gray-700/30">
          <div className="grid grid-cols-2 gap-6 text-center mb-6">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">{score}</div>
              <div className="text-gray-400">Final Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-1">{streakCount}</div>
              <div className="text-gray-400">Best Streak</div>
            </div>
          </div>
          
          <div className="bg-slate-700/30 rounded-xl p-4 border border-gray-700/30">
            <h4 className="text-lg font-semibold text-yellow-400 mb-3">Performance Summary</h4>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(gameData).map(([level, data]) => (
                <div key={level} className={`p-2 rounded-lg ${data.color.replace('from-', 'bg-').replace(' to-', '/')}20 border ${data.color.replace('from-', 'border-').replace(' to-', '/')}30`}>
                  <div className="text-xs text-gray-300 mb-1">Level {level}</div>
                  <div className="text-white font-bold">{data.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setGameState('menu')}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-white hover:scale-105 transform transition-all duration-300"
          >
            Return to Menu
          </button>
          <button
            onClick={startGame}
            className="px-8 py-3 border-2 border-purple-500 rounded-xl font-bold text-purple-400 hover:bg-purple-500/10 transition-all duration-300"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );

  const GameOverScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-pink-400 animate-float opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}
        />
      ))}
      
      <div className="text-center px-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <Heart className="mx-auto text-red-400 mb-4 animate-pulse" size={80} fill="currentColor" />
          <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-4">
            GAME OVER
          </h1>
          <p className="text-lg text-gray-300">You've exhausted all diagnostic attempts</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-gray-700/30">
          <div className="grid grid-cols-2 gap-6 text-center mb-6">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">{score}</div>
              <div className="text-gray-400">Final Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-1">{currentLevel - 1}/13</div>
              <div className="text-gray-400">Levels Completed</div>
            </div>
          </div>
          
          <div className="bg-slate-700/30 rounded-xl p-4 border border-gray-700/30">
            <h4 className="text-lg font-semibold text-red-400 mb-3">Clinical Review</h4>
            <p className="text-gray-300 text-sm mb-4">
              Review the cases you missed and strengthen your diagnostic skills. 
              Remember key clinical triads and pathognomonic findings.
            </p>
            <div className="flex justify-center gap-2">
              <button 
                onClick={() => setShowCurriculum(true)}
                className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-colors"
              >
                Review Curriculum
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setGameState('menu')}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl font-bold text-white hover:scale-105 transform transition-all duration-300"
          >
            Return to Menu
          </button>
          <button
            onClick={startGame}
            className="px-8 py-3 border-2 border-pink-500 rounded-xl font-bold text-pink-400 hover:bg-pink-500/10 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>

      {/* Curriculum Modal */}
      {showCurriculum && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-gray-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sticky top-0 bg-slate-900/90 backdrop-blur-sm border-b border-gray-700/50 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">Game Curriculum</h3>
              <button 
                onClick={() => setShowCurriculum(false)}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-3">Learning Objectives</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2" />
                    <span>Recognize classic clinical triads and pathognomonic findings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2" />
                    <span>Differentiate between similar clinical presentations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2" />
                    <span>Develop systematic diagnostic reasoning skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2" />
                    <span>Learn emergent management of critical conditions</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-3">Level Breakdown</h4>
                <div className="space-y-4">
                  {Object.entries(gameData).map(([level, data]) => (
                    <div key={level} className="bg-slate-800/50 rounded-xl p-4 border border-gray-700/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${data.color} flex items-center justify-center`}>
                          <data.icon className="text-white" size={18} />
                        </div>
                        <h5 className="font-bold text-white">Level {level}: {data.title}</h5>
                      </div>
                      <p className="text-sm text-gray-300">{data.questions[0].explanation.split('.')[0]}.</p>
                      <p className="text-xs text-gray-400 mt-2">{data.questions.length} clinical cases</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-green-400 mb-3">Game Mechanics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-gray-700/30">
                    <div className="flex items-center gap-2 text-yellow-400 mb-2">
                      <Target size={18} />
                      <h5 className="font-bold">Scoring</h5>
                    </div>
                    <p className="text-sm text-gray-300">
                      Base points: 100 per correct diagnosis<br />
                      Time bonus: 10 points per second remaining<br />
                      Streak bonus: 2ⁿ×50 points for n consecutive correct answers
                    </p>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-gray-700/30">
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <Zap size={18} />
                      <h5 className="font-bold">Boosters</h5>
                    </div>
                    <p className="text-sm text-gray-300">
                      <span className="text-yellow-400">Hint:</span> Eliminates one wrong answer<br />
                      <span className="text-blue-400">Skip:</span> Pass to next question<br />
                      <span className="text-red-400">+Life:</span> Gain an extra attempt
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-700/50">
              <button
                onClick={() => setShowCurriculum(false)}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
              >
                Close Curriculum
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );



  return (
    <div>
      {/* Only show PreHeader on menu screen for navigation */}
      {gameState === 'menu' && (
        <PreHeader currentPage="Diagnosis Detective" userName="Dr. Detective" />
      )}
      
      <div className={gameState === 'menu' ? 'pt-20' : ''}>
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <MenuScreen />
            </motion.div>
          )}
          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <GameScreen />
            </motion.div>
          )}
          {gameState === 'gameComplete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <GameCompleteScreen />
            </motion.div>
          )}
          {gameState === 'gameOver' && (
            <motion.div
              key="gameover"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <GameOverScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Only show Footer on menu screen */}
      {gameState === 'menu' && <Footer isActive={true} playClickSound={playClick} />}
    </div>
  );
};

export default DiagnosisDetectiveGame;
