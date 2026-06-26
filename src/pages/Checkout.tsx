import React, { useState } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  CreditCard, 
  Globe, 
  Server, 
  Sparkles, 
  Info, 
  ShoppingBag,
  User,
  Mail,
  Phone,
  MessageSquare,
  Building,
  Smartphone
} from 'lucide-react';

export default function Checkout() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { state, addOrder } = useAppContext();

  // Find the selected featured project
  const project = state.featuredProjects?.find(p => p.id === id);

  // Retrieve dynamic package plan query state if set (?plan=PRO)
  const requestedPlanName = searchParams.get('plan') || '';
  const selectedPlan = project?.plans?.find(
    p => p.name.toLowerCase() === requestedPlanName.toLowerCase()
  );

  // Dynamic price and name parameters
  const finalPrice = selectedPlan ? selectedPlan.price : (project?.price || '৳4,999');
  const finalProductName = selectedPlan ? `${project?.name} (${selectedPlan.name} Plan)` : (project?.name || '');

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [transactionId, setTransactionId] = useState('');
  
  // Optional/conditional fields
  const [companyName, setCompanyName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  // Website/script specific fields (only visible if the category implies a website solution, or generally available)
  const [domainName, setDomainName] = useState('');
  const [hostingInfo, setHostingInfo] = useState('');
  const [desiredFeatures, setDesiredFeatures] = useState('');

  // UI state
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-850 p-8 rounded-2xl max-w-md w-full text-center shadow-xl">
          <ShoppingBag className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
          <p className="text-zinc-400 mb-6 text-sm">
            The website product or package you are looking for does not exist or has been removed.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Get dynamic payment wallet number from contact details
  const rawContactPhone = state.contact.phone || '';
  const walletNumber = rawContactPhone || '01700-000000'; // fallback in case phone not defined

  const handleCopy = () => {
    navigator.clipboard.writeText(walletNumber.replace(/[^0-9]/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Field validations
    if (!fullName.trim()) return setFormError('Please enter your full name.');
    if (!email.trim() || !email.includes('@')) return setFormError('Please enter a valid email address.');
    if (!phone.trim()) return setFormError('Please provide a secure contact phone number.');
    if (!transactionId.trim()) return setFormError(`Please complete payment and submit your ${paymentMethod} Transaction ID.`);

    setIsSubmitting(true);

    try {
      // Build notes that combine website specs
      let aggregatedNotes = additionalNotes;
      if (domainName.trim()) {
        aggregatedNotes += `\n\n[Domain: ${domainName.trim()}]`;
      }
      if (hostingInfo.trim()) {
        aggregatedNotes += `\n[Hosting Spec: ${hostingInfo.trim()}]`;
      }
      if (desiredFeatures.trim()) {
        aggregatedNotes += `\n[Desired Features: ${desiredFeatures.trim()}]`;
      }

      const orderId = addOrder({
        productId: project.id,
        productName: finalProductName,
        productPrice: finalPrice,
        productScreenshot: project.screenshot,
        fullName,
        email,
        phone,
        paymentMethod,
        transactionId,
        companyName: companyName.trim() || undefined,
        whatsappNumber: whatsappNumber.trim() || undefined,
        additionalNotes: aggregatedNotes.trim() || undefined
      });

      // Stagger slightly for premium high-fidelity transition
      setTimeout(() => {
        setIsSubmitting(false);
        navigate(`/checkout/success/${orderId}`);
      }, 1500);
    } catch (err) {
      console.error(err);
      setFormError('An unexpected error occurred while placing your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors text-sm font-medium group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to templates
        </Link>

        {/* Title Header */}
        <div className="mb-12">
          <span className="text-xs text-[#00aaff] font-extrabold uppercase tracking-widest bg-[#00aaff]/10 border border-[#00aaff]/20 px-3 py-1 rounded-full">
            🔒 Secure Digital Checkout
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
            Order Your Website Solution
          </h1>
          <p className="text-zinc-400 mt-2 text-sm max-w-2xl">
            Complete your purchase of our custom digital solution. Fill in your implementation requirements below to dispatch deployment immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Checkout Form Column */}
          <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-850 p-6 md:p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2.5 border-b border-zinc-800 pb-4">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
              1. Customer Information
            </h2>

            {formError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-sm flex items-start gap-2">
                <Info size={16} className="shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleOrderSubmit} className="space-y-6">
              
              {/* Core Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                    <User size={13} className="text-blue-400" />
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition text-sm text-white"
                    placeholder="E.g. Imtiaz Khan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                    <Mail size={13} className="text-blue-400" />
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition text-sm text-white"
                    placeholder="E.g. imtiaz@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                    <Phone size={13} className="text-blue-400" />
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition text-sm text-white"
                    placeholder="E.g. +880 1712-345678"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                    <Building size={13} className="text-blue-400" />
                    Company Name <span className="text-zinc-500 text-[10px]">(Optional)</span>
                  </label>
                  <input 
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition text-sm text-white\"
                    placeholder="E.g. Tech Solutions Ltd."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                    <Smartphone size={13} className="text-blue-400" />
                    WhatsApp Number <span className="text-zinc-500 text-[10px]">(Optional)</span>
                  </label>
                  <input 
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition text-sm text-white"
                    placeholder="E.g. Same as phone or $+880..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                    <Globe size={13} className="text-blue-400" />
                    Domain Name <span className="text-zinc-500 text-[10px]">(If you already own one)</span>
                  </label>
                  <input 
                    type="text"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition text-sm text-white"
                    placeholder="E.g. mybusiness.com"
                  />
                </div>
              </div>

              {/* Website specific criteria */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                    <Server size={13} className="text-blue-400" />
                    Hosting Information <span className="text-zinc-500 text-[10px]">(Optional, CPanel/VPS detail)</span>
                  </label>
                  <input 
                    type="text"
                    value={hostingInfo}
                    onChange={(e) => setHostingInfo(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition text-sm text-white"
                    placeholder="E.g. Need fresh hosting / Shared hosting / cPanel details"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-blue-400" />
                    Specific Feature Customizations <span className="text-zinc-500 text-[10px]">(Optional)</span>
                  </label>
                  <textarea 
                    value={desiredFeatures}
                    onChange={(e) => setDesiredFeatures(e.target.value)}
                    rows={2}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition text-sm text-white"
                    placeholder="E.g. I need dark mode option, Bengali language support, etc."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                    <MessageSquare size={13} className="text-blue-400" />
                    Additional Notes / Project Requirements <span className="text-zinc-500 text-[10px]">(Optional)</span>
                  </label>
                  <textarea 
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition text-sm text-white"
                    placeholder="State any specific requests, logo links, preferred colors, or content guidelines here."
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className="pt-4 border-t border-zinc-800">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2.5">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                  2. Payment Section
                </h2>

                <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-850 mb-6">
                  <p className="text-xs text-zinc-400 uppercase tracking-widest font-extrabold mb-3">
                    STEP 1: Send Money
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                    Please use the "Send Money" or cash-in option to transfer <span className="font-extrabold text-emerald-400">{project.price || '৳4,999'}</span> to the mobile wallet number below:
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-555/20 text-emerald-400 flex items-center justify-center rounded-lg font-bold text-lg shrink-0">
                        ৳
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Mobile Wallet (Personal)</p>
                        <p className="font-mono text-base font-extrabold tracking-wider text-white">
                          {walletNumber.replace(/[^0-9]/g, '')}
                        </p>
                      </div>
                    </div>

                    <button 
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-xs text-zinc-300 hover:text-white px-4 py-2.5 rounded-lg border border-zinc-700 transition"
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-emerald-500" />
                          <span>Copied Number</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Number</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-zinc-400 uppercase tracking-widest font-extrabold mb-2">
                    STEP 2: Select Method & Enter Transaction ID
                  </p>

                  {/* Payment Method Selector Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { name: 'bKash', color: 'bg-pink-600/10 border-pink-500/30 text-pink-400', active: 'border-pink-500 bg-pink-500/15' },
                      { name: 'Nagad', color: 'bg-orange-600/10 border-orange-500/30 text-orange-400', active: 'border-orange-500 bg-orange-500/15' },
                      { name: 'Rocket', color: 'bg-purple-600/10 border-purple-500/30 text-purple-400', active: 'border-purple-500 bg-purple-500/15' },
                    ].map((method) => {
                      const isSelected = paymentMethod === method.name;
                      return (
                        <button
                          key={method.name}
                          type="button"
                          onClick={() => setPaymentMethod(method.name as any)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition ${
                            isSelected ? method.active + ' ring-1' : 'border-zinc-800 bg-zinc-950 hover:bg-zinc-900/60'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full mb-1 bg-white/5 flex items-center justify-center font-bold text-xs ${isSelected ? method.color.split(' ')[2] : 'text-zinc-400'}`}>
                            {method.name[0]}
                          </div>
                          <span className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-white' : 'text-zinc-500'}`}>
                            {method.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Transaction ID input */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                      <CreditCard size={13} className="text-emerald-400" />
                      {paymentMethod} Transaction ID <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      required
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition text-sm text-white uppercase font-mono tracking-wider"
                      placeholder="E.g. 9H8KFL8N92"
                    />
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Enter the 10-character code received from {paymentMethod} message. Avoid sharing other digits.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-zinc-800">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-widest text-white tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 transition duration-300 ${
                    isSubmitting
                      ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-95 cursor-pointer'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Confirming Transaction...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Secure Order</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Checkout Right Side - Order Summary */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-6 shadow-xl">
              <h3 className="text-md font-bold mb-4 uppercase tracking-widest text-[#00aaff] text-xs">
                🛒 Selected Package
              </h3>

              {/* Product Info Card representation */}
              <div className="flex gap-4 mb-6 border-b border-zinc-800 pb-5">
                <div className="w-20 h-20 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shrink-0">
                  <img 
                    src={project.screenshot} 
                    alt={project.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  {project.category && (
                    <span className="text-[9px] text-[#00aaff] bg-[#00aaff]/10 border border-[#00aaff]/20 px-1.5 py-0.2 rounded font-extrabold uppercase tracking-wider mb-1 inline-block">
                      {project.category}
                    </span>
                  )}
                  <h4 className="font-extrabold text-base text-white truncate leading-tight">
                    {finalProductName}
                  </h4>
                  <p className="text-zinc-500 text-xs line-clamp-2 mt-1">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3.5 text-sm border-b border-zinc-800 pb-5 mb-5">
                <div className="flex justify-between text-zinc-400">
                  <span>Template Price:</span>
                  <span className="text-white font-medium">{finalPrice}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Installation Setup:</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    Free / ৳0
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Order Processing Charge:</span>
                  <span className="text-zinc-500">৳0</span>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white text-base">Total Amount:</span>
                <span className="text-2xl font-extrabold text-emerald-400">
                  {finalPrice}
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 text-right">
                All taxes and server setup scripts are fully covered.
              </p>
            </div>

            {/* Satisfaction / Guarantee Panel */}
            <div className="bg-zinc-900/40 border border-zinc-850 p-5 rounded-2xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <Sparkles size={16} />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                  Post-Purchase Setup Policy
                </h4>
                <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                  Upon verifying the Transaction ID, our developers will reach out to you within 2-4 hours to begin file deployment, host setup, and required content updating.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
