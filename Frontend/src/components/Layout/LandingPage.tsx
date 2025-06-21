import React from 'react';
import { Users, Zap, BarChart2, ShieldCheck, Globe } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export interface LandingPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

const blobVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 0.2, scale: 1.2, transition: { duration: 3, yoyo: Infinity, ease: 'easeInOut' } },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.3, duration: 0.6, ease: 'easeOut' } }),
};

export default function LandingPage({ onLogin, onSignup }: LandingPageProps) {
  return (
    <div className="relative overflow-hidden text-gray-900">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl"
        variants={blobVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"
        variants={blobVariants}
        initial="hidden"
        animate="visible"
      />

      {/* NAVBAR */}
      <motion.nav
        className="fixed w-full bg-white/70 backdrop-blur-md shadow-lg z-20"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-3xl font-bold text-indigo-600">
            Boblink
          </a>
          <div className="space-x-6">
            <motion.button whileHover={{ scale: 1.1 }} onClick={onLogin}>
              Log In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold shadow-lg"
              onClick={onSignup}
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <header className="min-h-screen flex items-center justify-center pt-24">
        <div className="container mx-auto px-6 lg:flex lg:items-center lg:justify-between">
          <motion.div
            className="lg:w-1/2 space-y-6"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <motion.h1
              className="text-5xl lg:text-6xl font-bold text-indigo-800 leading-tight"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Transformă proiectele în experiențe de succes
            </motion.h1>
            <motion.p
              className="text-lg lg:text-xl text-gray-700 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Colaborați cu alocare AI, analytics live și micro-animări de feedback în timp real.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={onSignup}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Începe Gratuit
              </motion.button>
              <motion.button
                onClick={onLogin}
                className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-full font-semibold"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(99,102,241,0.1)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Află Mai Mult
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 mt-10 lg:mt-0 relative"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="/assets/boblink-hero-3.png"
              alt="Boblink Dashboard Preview"
              className="w-full rounded-3xl shadow-2xl"
            />
            {/* Floating Icon */}
            <motion.div
              className="absolute top-5 left-5"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Zap size={32} className="text-indigo-500" />
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Caracteristici Principale
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Colaborare Eficientă', desc: 'Urmărește și discută task-urile în timp real.' },
              { icon: Zap, title: 'Alocare AI', desc: 'Taskuri inteligente adaptate echipei tale.' },
              { icon: BarChart2, title: 'Analytics Live', desc: 'Grafice animate și rapoarte instant.' },
              { icon: ShieldCheck, title: 'Securitate Enterprise', desc: 'Date protejate și GDPR ready.' },
              { icon: Globe, title: 'Acces Global', desc: 'Lucrează sincronizat de oriunde.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="text-center p-8 bg-indigo-50 rounded-2xl shadow-lg"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
              >
                <feature.icon className="mx-auto mb-4 text-indigo-600" size={48} />
                <h3 className="text-2xl font-semibold mb-2 text-indigo-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center text-indigo-700 mb-12"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Ce spun utilizatorii
          </motion.h2>
          <div className="relative">
            <motion.div
              className="flex space-x-8 overflow-x-auto pb-4"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {[
                { quote: 'Boblink ne-a schimbat complet modul de lucru.', author: 'Maria Popescu' },
                { quote: 'Economisim zeci de ore cu alocarea AI.', author: 'Andrei Ionescu' },
                { quote: 'Analytics instantaneu ne menține în siguranță.', author: 'Ioana Dobrescu' },
              ].map((t, idx) => (
                <motion.blockquote
                  key={idx}
                  className="min-w-[300px] p-8 bg-white rounded-2xl shadow-lg italic text-gray-800"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  “{t.quote}”
                  <footer className="mt-4 font-semibold text-indigo-600">— {t.author}</footer>
                </motion.blockquote>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section className="py-20 bg-indigo-600 text-white text-center">
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ești gata să începi?
        </motion.h2>
        <motion.button
          onClick={onSignup}
          className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Înscrie-te acum
        </motion.button>
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        className="bg-white border-t py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Boblink. Toate drepturile rezervate.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-indigo-600 transition">
              Privacy
            </a>
            <a href="#terms" className="hover:text-indigo-600 transition">
              Terms
            </a>
            <a href="#contact" className="hover:text-indigo-600 transition">
              Contact
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
