import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserRole } from '../lib/unis';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner'; // Assuming you're using sonner for toast, adjust if needed
import PreHeader from '@/components/PreHeader'; // Added import

type TabKey = UserRole;

interface SignUpFormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    phoneNumber?: string; // Added phoneNumber
    setup2FA?: boolean; // Added for 2FA
    affiliateLink?: string; // Added for MLM affiliate link
    uplineUIN?: string; // Added for upline UIN
}

const SignUpPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<TabKey>('student'); // Changed to lowercase
    const [formData, setFormData] = useState<SignUpFormData>({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        role: 'student', // Changed to lowercase
        phoneNumber: '', // Initialize phoneNumber
        setup2FA: false, // Initialize 2FA option
        affiliateLink: '', // Initialize affiliate link
        uplineUIN: '' // Initialize upline UIN
    });
    
    // Check URL parameters for affiliate link
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const affiliateParam = urlParams.get('affiliate');
        const uinParam = urlParams.get('uin');
        
        if (affiliateParam && uinParam) {
            setFormData(prev => ({
                ...prev,
                affiliateLink: affiliateParam,
                uplineUIN: uinParam
            }));
        }
    }, [location.search]);
    
    // Check if we came from a session that should take us to profile completion
    useEffect(() => {
        const redirectToProfileCompletion = sessionStorage.getItem('redirectToProfileCompletion');
        const roleFromStorage = sessionStorage.getItem('userRole');
        
        if (redirectToProfileCompletion === 'true' && roleFromStorage) {
            // Clear session storage flags
            sessionStorage.removeItem('redirectToProfileCompletion');
            sessionStorage.removeItem('userRole');
            
            // Navigate to profile completion
            navigate('/profile-completion', { 
                state: { 
                    userRole: roleFromStorage as UserRole,
                    isNewUser: true,
                    completionPercentage: 0
                } 
            });
        }
    }, [navigate]);

    const tabs: { key: TabKey; label: string; description: string }[] = [
        {
            key: 'student', // Changed to lowercase
            label: 'Students',
            description: 'Access learning resources and connect with professionals'
        },
        {
            key: 'professional', // Changed to lowercase
            label: 'Professionals',
            description: 'Share your expertise and grow your career'
        },
        {
            key: 'tutor', // Changed to lowercase
            label: 'Tutor/Expert Adviser',
            description: 'Guide and mentor students in their healthcare journey'
        },
        {
            key: 'employer', // Changed to lowercase
            label: 'Employer',
            description: 'Find and hire qualified healthcare professionals'
        },
        {
            key: 'client' as TabKey, // Added Client Tab
            label: 'Client/Patient',
            description: 'Access community, share feedback, and play games'
        }
    ];    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate form data
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        
        // Log for debugging
        console.log("Attempting to create account for role:", formData.role);
        
        // Simulate API call for registration
        try {
            // Show loading state
            toast.loading("Creating your account...");
            
            // Simulate server delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Dismiss loading toast and show success
            toast.dismiss();
            toast.success("Account created successfully!");
            
            // Create state object for navigation
            const profileState = { 
                userRole: formData.role,
                isNewUser: true,
                completionPercentage: 0
            };
            
            console.log("Redirecting to profile completion with state:", profileState);
            
            // Set fallback in session storage in case direct navigation fails
            sessionStorage.setItem('redirectToProfileCompletion', 'true');
            sessionStorage.setItem('userRole', formData.role);
            
            // After successful registration, redirect to profile completion page with state
            // Use a slight delay to ensure toast is visible before navigation
            setTimeout(() => {
                navigate('/profile-completion', { state: profileState });
            }, 300);
        } catch (error) {
            toast.dismiss();
            toast.error("Registration failed. Please try again.");
            console.error('Registration error:', error);
        }
    };

    return (
        <>
            <PreHeader />
            <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto pt-16"> {/* Added pt-16 for PreHeader spacing */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-gray-200"
                    >
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                            Create Your Account
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"> {/* Changed md:grid-cols-4 to md:grid-cols-5 */}
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => {
                                        setActiveTab(tab.key);
                                        setFormData(prev => ({ ...prev, role: tab.key }));
                                    }}
                                    className={`relative p-4 rounded-lg transition-all duration-200 ${
                                        activeTab === tab.key
                                            ? 'bg-primary text-white shadow-lg'
                                            : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <h3 className="text-lg font-semibold mb-1">{tab.label}</h3>
                                    <p className="text-sm opacity-80">{tab.description}</p>
                                    {activeTab === tab.key && (
                                        <motion.div
                                            layoutId="active-tab"
                                            className="absolute inset-0 bg-primary opacity-10 rounded-lg"
                                            initial={false}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.form
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.firstName}
                                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.lastName}
                                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone Number (Required for MLM verification)
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="+1234567890"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        A unique phone number is required for our MLM verification system
                                    </p>
                                </div>

                                {/* Affiliate Link Field - Only for professionals */}
                                {activeTab === 'professional' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Affiliate Link (Required for Professionals)
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.uplineUIN}
                                            onChange={(e) => setFormData(prev => ({ ...prev, uplineUIN: e.target.value }))}
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                            placeholder="Enter UIN of referring professional (e.g., 1A2)"
                                            readOnly={!!formData.affiliateLink} // Make readonly if populated from URL
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            You can only sign up as a professional using the affiliate link of an existing professional. 
                                            {formData.affiliateLink && ' (Auto-populated from affiliate link)'}
                                        </p>
                                    </div>
                                )}

                                <div className="flex items-center space-x-2 mt-6 mb-2">
                                    <input
                                        type="checkbox"
                                        id="setup-2fa"
                                        checked={formData.setup2FA}
                                        onChange={(e) => setFormData(prev => ({ ...prev, setup2FA: e.target.checked }))}
                                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                    <label htmlFor="setup-2fa" className="text-sm text-gray-700">
                                        Set up Two-Factor Authentication (Recommended)
                                    </label>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    Sign Up as {tabs.find(t => t.key === activeTab)?.label}
                                </motion.button>
                            </motion.form>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;
