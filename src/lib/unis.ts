
// List of universities in Nigeria
export const nigerianUniversities = [
  "Abia State University",
  "Ahmadu Bello University",
  "Ambrose Alli University",
  "Bayero University Kano",
  "Covenant University",
  "Delta State University",
  "Ebonyi State University",
  "Federal University of Technology, Akure",
  "Federal University of Technology, Minna",
  "Federal University of Technology, Owerri",
  "Federal University, Oye-Ekiti",
  "Lagos State University",
  "Michael Okpara University of Agriculture",
  "Nnamdi Azikiwe University",
  "Obafemi Awolowo University",
  "Olabisi Onabanjo University",
  "Pan-Atlantic University",
  "River State University",
  "University of Abuja",
  "University of Benin",
  "University of Calabar",
  "University of Ibadan",
  "University of Ilorin",
  "University of Jos",
  "University of Lagos",
  "University of Maiduguri",
  "University of Nigeria, Nsukka",
  "University of Port Harcourt",
  "University of Uyo"
];

// List of international universities
export const internationalUniversities = [
  "Harvard University",
  "Massachusetts Institute of Technology",
  "Stanford University",
  "University of Cambridge",
  "University of Oxford",
  "Yale University",
  "Princeton University",
  "Columbia University",
  "University of Toronto",
  "McGill University",
  "University of Melbourne",
  "University of Sydney",
  "University of Cape Town",
  "University of Tokyo",
  "Peking University"
];

// List of medical schools
export const medicalSchools = [
  "College of Medicine, University of Ibadan",
  "College of Medicine, University of Lagos",
  "College of Health Sciences, Obafemi Awolowo University",
  "College of Medical Sciences, University of Maiduguri",
  "College of Medical Sciences, University of Benin",
  "College of Medicine, University of Nigeria",
  "Faculty of Clinical Sciences, Bayero University Kano",
  "College of Health Sciences, Nnamdi Azikiwe University",
  "College of Medicine, Ahmadu Bello University",
  "College of Health Sciences, University of Ilorin",
  "College of Medicine, Ambrose Alli University",
  "College of Medical Sciences, Abia State University",
  "College of Medical Sciences, Rivers State University",
  "Johns Hopkins School of Medicine",
  "Harvard Medical School",
  "Yale School of Medicine",
  "Stanford University School of Medicine",
  "Oxford University Medical School",
  "Imperial College London Faculty of Medicine"
];

// User role type definition
export type UserRole = 'professional' | 'student' | 'employer' | 'tutor' | 'client';

// The main function to be exported for using in the app
export const getUniversityLists = () => {
  return {
    nigeria: nigerianUniversities,
    international: internationalUniversities,
    medical: medicalSchools
  };
};

export default getUniversityLists;
