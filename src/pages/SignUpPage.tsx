import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserRole } from '../lib/unis';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import PreHeader from '@/components/PreHeader';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

type TabKey = UserRole;

interface SignUpFormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    phoneNumber?: string;
    setup2FA?: boolean;
    affiliateLink?: string;
    uplineUIN?: string;
}

const SignUpPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signUp, loading, user } = useAuth(); // Added useAuth hook
    const { isDark, theme } = useTheme(); // Added theme context
    const [activeTab, setActiveTab] = useState<TabKey>('student');
    const [formData, setFormData] = useState<SignUpFormData>({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        role: 'student',
        phoneNumber: '',
        setup2FA: false,
        affiliateLink: '',
        uplineUIN: ''
    });

    // Redirect if already authenticated
    useEffect(() => {
        if (user) {
            const userRole = user.user_metadata?.user_type || 'student';
            navigate(`/dashboard/${userRole}`);
        }
    }, [user, navigate]);

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
            sessionStorage.removeItem('redirectToProfileCompletion');
            sessionStorage.removeItem('userRole');

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
            key: 'student',
            label: 'Students',
            description: 'Access learning resources and connect with professionals'
        },
        {
            key: 'professional',
            label: 'Professionals',
            description: 'Share your expertise and grow your career'
        },
        {
            key: 'tutor',
            label: 'Tutor/Expert Adviser',
            description: 'Guide and mentor students in their healthcare journey'
        },
        {
            key: 'employer',
            label: 'Employer',
            description: 'Find and hire qualified healthcare professionals'
        },
        {
            key: 'client' as TabKey,
            label: 'Client/Patient',
            description: 'Access community, share feedback, and play games'
        }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form data
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        // Validate professional requirements
        if (formData.role === 'professional' && !formData.uplineUIN) {
            toast.error("Affiliate link (UIN) is required for professionals");
            return;
        }

        if (!formData.phoneNumber) {
            toast.error("Phone number is required for MLM verification");
            return;
        }

        console.log("Attempting to create account for role:", formData.role);

        try {
            toast.loading("Creating your account...");

            // Prepare user metadata
            const userMetadata = {
                full_name: `${formData.firstName} ${formData.lastName}`,
                first_name: formData.firstName,
                last_name: formData.lastName,
                user_type: formData.role,
                phone_number: formData.phoneNumber,
                setup_2fa: formData.setup2FA,
                affiliate_link: formData.affiliateLink,
                upline_uin: formData.uplineUIN,
                registration_date: new Date().toISOString()
            };

            // Sign up with Supabase
            const { user: newUser, error } = await signUp({
                email: formData.email,
                password: formData.password,
                fullName: `${formData.firstName} ${formData.lastName}`,
                firstName: formData.firstName,
                lastName: formData.lastName,
                userType: formData.role,
                PhoneNumber: formData.phoneNumber,
                setup2FA: formData.setup2FA,
                affiliateLink: formData.affiliateLink,
                uplineUIN: formData.uplineUIN,
                profession: formData.role,
                institution: '',

            });

            toast.dismiss();

            if (error) {
                toast.error(error.message || "Registration failed. Please try again.");
                return;
            }

            if (newUser) {
                toast.success("Account created successfully! Please check your email to verify your account.");

                // Create state object for navigation
                const profileState = {
                    userRole: formData.role,
                    isNewUser: true,
                    completionPercentage: 0
                };

                console.log("Redirecting to profile completion with state:", profileState);

                // Set fallback in session storage
                sessionStorage.setItem('redirectToProfileCompletion', 'true');
                sessionStorage.setItem('userRole', formData.role);

                // Navigate to profile completion after short delay
                setTimeout(() => {
                    navigate('/profile-completion', { state: profileState });
                }, 1000);
            }
        } catch (error) {
            toast.dismiss();
            toast.error("Registration failed. Please try again.");
            console.error('Registration error:', error);
        }
    };

    return (
        <>
            <PreHeader />
            <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
                isDark 
                    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
                    : 'bg-gradient-to-br from-white via-gray-50 to-gray-100'
            }`}>
                <div className="max-w-4xl mx-auto pt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`rounded-xl shadow-xl p-8 border transition-all duration-300 ${
                            isDark 
                                ? 'bg-gray-800/90 backdrop-blur-sm border-gray-700' 
                                : 'bg-white/80 backdrop-blur-sm border-gray-200'
                        }`}
                    >
                        <h2 className={`text-3xl font-bold text-center mb-8 transition-colors duration-300 ${
                            isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                            Create Your Account
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => {
                                        setActiveTab(tab.key);
                                        setFormData(prev => ({ ...prev, role: tab.key }));
                                    }}
                                    className={`group relative p-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                                        activeTab === tab.key
                                            ? `shadow-lg ${isDark ? 'bg-white text-black ring-primary/50' : 'bg-primary text-primary-foreground ring-primary/30'}`
                                            : `transition-colors duration-200 ${
                                                isDark 
                                                    ? 'bg-gray-700 text-gray-200 hover:bg-amber-500 hover:!text-black' 
                                                    : 'bg-gray-100 text-gray-600 hover:bg-black hover:text-white'
                                              }`
                                    }`}
                                    style={{ 
                                        backgroundColor: activeTab === tab.key && isDark ? '#FFFFFF' : undefined,
                                     }}
                                    disabled={loading}
                                >
                                    <h3 className={`text-lg font-semibold mb-1 transition-colors duration-200 ${
                                        activeTab === tab.key 
                                            ? isDark ? 'text-black' : 'text-primary-foreground'
                                            : isDark 
                                                ? 'text-gray-200 group-hover:!text-black' 
                                                : 'text-gray-800 group-hover:text-white'
                                    }`}>{tab.label}</h3>
                                    <p className={`text-sm transition-colors duration-200 ${
                                        activeTab === tab.key 
                                            ? isDark ? 'text-black/80' : 'text-primary-foreground/90'
                                            : isDark 
                                                ? 'text-gray-400 group-hover:!text-black' 
                                                : 'text-gray-600 group-hover:text-gray-300'
                                    }`}>{tab.description}</p>
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
                                        <label className={`block text-sm font-medium transition-colors duration-300 ${
                                            isDark ? 'text-gray-200' : 'text-gray-700'
                                        }`}>
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.firstName}
                                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                                            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                                                isDark 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 hover:bg-gray-600 hover:border-gray-500' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400 hover:shadow-md'
                                            }`}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium transition-colors duration-300 ${
                                            isDark ? 'text-gray-200' : 'text-gray-700'
                                        }`}>
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.lastName}
                                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                                            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                                                isDark 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 hover:bg-gray-600 hover:border-gray-500' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400 hover:shadow-md'
                                            }`}
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium transition-colors duration-300 ${
                                        isDark ? 'text-gray-200' : 'text-gray-700'
                                    }`}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                                            isDark 
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 hover:bg-gray-600 hover:border-gray-500' 
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400 hover:shadow-md'
                                        }`}
                                        disabled={loading}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium transition-colors duration-300 ${
                                        isDark ? 'text-gray-200' : 'text-gray-700'
                                    }`}>
                                        Password (minimum 6 characters)
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        minLength={6}
                                        value={formData.password}
                                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                        className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                                            isDark 
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 hover:bg-gray-600 hover:border-gray-500' 
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400 hover:shadow-md'
                                        }`}
                                        disabled={loading}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium transition-colors duration-300 ${
                                        isDark ? 'text-gray-200' : 'text-gray-700'
                                    }`}>
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                                            isDark 
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 hover:bg-gray-600 hover:border-gray-500' 
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400 hover:shadow-md'
                                        }`}
                                        disabled={loading}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium transition-colors duration-300 ${
                                        isDark ? 'text-gray-200' : 'text-gray-700'
                                    }`}>
                                        Phone Number (Required for MLM verification)
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                        className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                                            isDark 
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 hover:bg-gray-600 hover:border-gray-500' 
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400 hover:shadow-md'
                                        }`}
                                        placeholder="+1234567890"
                                        disabled={loading}
                                    />
                                    <p className={`mt-1 text-xs transition-colors duration-300 ${
                                        isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                        A unique phone number is required for our MLM verification system
                                    </p>
                                </div>

                                {/* Affiliate Link Field - Only for professionals */}
                                {activeTab === 'professional' && (
                                    <div>
                                        <label className={`block text-sm font-medium transition-colors duration-300 ${
                                            isDark ? 'text-gray-200' : 'text-gray-700'
                                        }`}>
                                            Affiliate Link (Required for Professionals)
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.uplineUIN}
                                            onChange={(e) => setFormData(prev => ({ ...prev, uplineUIN: e.target.value }))}
                                            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                                                isDark 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 hover:bg-gray-600 hover:border-gray-500' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400 hover:shadow-md'
                                            }`}
                                            placeholder="Enter UIN of referring professional (e.g., 1A2)"
                                            readOnly={!!formData.affiliateLink}
                                            disabled={loading}
                                        />
                                        <p className={`mt-1 text-xs transition-colors duration-300 ${
                                            isDark ? 'text-gray-400' : 'text-gray-500'
                                        }`}>
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
                                        className={`h-4 w-4 text-primary border rounded focus:ring-primary transition-colors duration-300 ${
                                            isDark 
                                                ? 'bg-gray-700 border-gray-600 checked:bg-primary checked:border-primary' 
                                                : 'bg-white border-gray-300 checked:bg-primary checked:border-primary'
                                        }`}
                                        disabled={loading}
                                    />
                                    <label htmlFor="setup-2fa" className={`text-sm transition-colors duration-300 ${
                                        isDark ? 'text-gray-200' : 'text-gray-700'
                                    }`}>
                                        Set up Two-Factor Authentication (Recommended)
                                    </label>
                                </div>

                                <motion.button
                                    whileHover={{ scale: loading ? 1 : 1.02 }}
                                    whileTap={{ scale: loading ? 1 : 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                                        loading
                                            ? 'bg-gray-400 cursor-not-allowed text-white'
                                            : `bg-primary hover:bg-primary/90 hover:shadow-lg transform hover:-translate-y-0.5 text-primary-foreground ${isDark ? 'hover:bg-white hover:!text-black' : ''}`
                                    } ${isDark ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}`}
                                >
                                    {loading
                                        ? 'Creating Account...'
                                        : `Sign Up as ${tabs.find(t => t.key === activeTab)?.label}`
                                    }
                                </motion.button>

                                <div className="text-center mt-6">
                                    <p className={`text-sm transition-colors duration-300 ${
                                        isDark ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                        Already have an account?{' '}
                                        <button
                                            type="button"
                                            onClick={() => navigate('/signin')}
                                            className={`font-medium transition-all duration-300 hover:underline focus:outline-none focus:underline focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1 py-0.5 ${
                                                isDark 
                                                    ? 'text-primary hover:text-white hover:bg-primary focus:ring-offset-gray-800' 
                                                    : 'text-primary hover:text-white hover:bg-primary focus:ring-offset-white'
                                            }`}
                                            disabled={loading}
                                        >
                                            Sign in here
                                        </button>
                                    </p>
                                </div>
                            </motion.form>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;
