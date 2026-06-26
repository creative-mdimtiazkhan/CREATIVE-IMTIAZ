import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ExternalLink, 
  ArrowLeft, 
  Copy, 
  Check, 
  ShoppingBag,
  CreditCard,
  MessageSquare,
  Sparkles,
  Calendar,
  FileBadge
} from 'lucide-react';

export default function OrderSuccess() {
  const { id } = useParams<{ id: string }>();
  const { state } = useAppContext();
  const [copied, setCopied] = React.useState(false);

  // Search for order matching parameters
  const order = state.orders?.find(o => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-850 p-8 rounded-2xl max-w-md w-full text-center shadow-xl">
          <ShoppingBag className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-white mb-2">Order Not Located</h2>
          <p className="text-zinc-400 mb-6 text-sm">
            We couldn't locate any purchase logs corresponding to this order reference. It might take a moment to propagate.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Handle transaction reference copy
  const handleCopyOrder = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Build fast-track WhatsApp link
  const rawAdminWhatsapp = state.contact.whatsapp || '';
  const cleanAdminPhone = rawAdminWhatsapp.replace(/[^0-9]/g, '') || '8801700000000';
  
  const textMessage = `Assalamu Alaikum! My Name is ${order.fullName}. I have successfully placed an order for the product "${order.productName}" (${order.productPrice}) from your agency portfolio website.

Order Reference ID: ${order.id}
Selected Payment: ${order.paymentMethod}
Submitted Transaction ID: ${order.transactionId}
Secure Contact: ${order.phone}

Please verify the transaction and initiate deployment setup. Jazakallahu Khairan.`;

  const finalWhatsappUrl = `https://wa.me/${cleanAdminPhone}?text=${encodeURIComponent(textMessage)}`;

  // Human date representation
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16 px-4 md:px-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        
        {/* Success Header Card */}
        <div className="bg-zinc-900 border border-zinc-850 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden text-center mb-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 animate-pulse" />
          
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={36} className="animate-pulse" />
          </div>

          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-widest inline-block">
            Payment Submitted Successfully
          </span>

          <h1 className="text-2xl mt-3 md:text-3xl font-black text-white tracking-tight">
            Thank You For Your Order!
          </h1>
          <p className="text-zinc-400 mt-2 text-sm max-w-lg mx-auto leading-relaxed">
            Your purchase request has been securely lodged inside our system. Our admin is currently reviewing your {order.paymentMethod} payment reference {order.transactionId}.
          </p>

          {/* Core Order Info Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-850 max-w-md mx-auto">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Order Reference ID</p>
              <p className="font-mono text-base font-black tracking-wider text-emerald-400 mt-0.5">
                {order.id}
              </p>
            </div>
            <button
              onClick={handleCopyOrder}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-xl transition hover:border-zinc-700 active:scale-95"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Detailed Order Breakdown Logs */}
        <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-base font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
            <FileBadge size={16} className="text-[#00aaff]" />
            Order Details Receipt
          </h2>

          <div className="space-y-4 text-sm divide-y divide-zinc-800/40">
            
            <div className="flex justify-between items-center py-3.5 first:pt-0">
              <span className="text-zinc-400 font-medium">Product / Website Solution:</span>
              <span className="text-white font-extrabold text-right truncate max-w-xs">{order.productName}</span>
            </div>

            <div className="flex justify-between items-center py-3.5">
              <span className="text-zinc-400 font-medium">Customer Name:</span>
              <span className="text-white font-semibold">{order.fullName}</span>
            </div>

            <div className="flex justify-between items-center py-3.5">
              <span className="text-zinc-400 font-medium">Contact Details:</span>
              <div className="text-right">
                <p className="text-white">{order.phone}</p>
                <p className="text-zinc-500 text-xs mt-0.5">{order.email}</p>
              </div>
            </div>

            <div className="flex justify-between items-center py-3.5">
              <span className="text-zinc-400 font-medium font-mono">Payment Wallet info:</span>
              <span className="text-white font-bold bg-[#00aaff]/5 border border-[#00aaff]/15 px-2.5 py-1 rounded-lg text-xs">
                {order.paymentMethod} Mobile Transfer
              </span>
            </div>

            <div className="flex justify-between items-center py-3.5">
              <span className="text-zinc-400 font-medium">Transaction ID:</span>
              <span className="text-emerald-400 font-mono font-bold uppercase tracking-wider">{order.transactionId}</span>
            </div>

            <div className="flex justify-between items-center py-3.5">
              <span className="text-zinc-400 font-medium">Price:</span>
              <span className="text-white font-black text-base">{order.productPrice}</span>
            </div>

            <div className="flex justify-between items-center py-3.5">
              <span className="text-zinc-400 font-medium">Order Status:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 animate-pulse">
                ● Pending Review
              </span>
            </div>

            <div className="flex justify-between items-center py-3.5 pb-0">
              <span className="text-zinc-400 font-medium flex items-center gap-1.5">
                <Calendar size={13} className="text-zinc-500" /> Date Placed:
              </span>
              <span className="text-zinc-500 text-xs">{orderDate}</span>
            </div>

          </div>
        </div>

        {/* CTA Actions panel */}
        <div className="flex flex-col sm:flex-row gap-4">
          
          {/* WhatsApp Fast-track support */}
          <a
            href={finalWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-95 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition shadow-lg shadow-emerald-500/10"
          >
            <MessageSquare size={16} />
            <span>Fast-track setup via WhatsApp</span>
            <ExternalLink size={12} className="shrink-0" />
          </a>

          {/* Normal return */}
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 py-4 px-6 bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-zinc-300 hover:text-white border border-zinc-800 rounded-xl transition text-sm font-semibold"
          >
            <span>Return to Portfolio</span>
          </Link>

        </div>

      </div>
    </div>
  );
}
