import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/01719188777"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 w-12 h-12 flex items-center justify-center bg-emerald-500 rounded-full text-white shadow-lg z-50 hover:bg-emerald-600 transition"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
    >
      <MessageCircle size={24} />
    </motion.a>
  );
}
