import React from 'react';
import { motion } from 'framer-motion';
import { useState,useEffect } from 'react';
const customEase = [0.19, 1, 0.22, 1]; 
const transitionProps = { duration: 1.8, ease: customEase,};
const defaultViewport = { once: true, amount: 0.3 };
const DESKTOP_BREAKPOINT = 1024;

const backgroundWipeVariants = {
    hidden: {  opacity: 0.5,  scaleX: 0.9,   transformOrigin: 'top',},
    visible: {  opacity: 1,  scaleX: 1,  transition: {  duration: 2, ease: customEase,}
    },
};

export const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(false); 

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const checkIsDesktop = () => {
            setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT); 
        };

        checkIsDesktop(); 
        window.addEventListener('resize', checkIsDesktop);
        return () => window.removeEventListener('resize', checkIsDesktop);
    }, []); 

    return isDesktop;
};

// aniamsi untuk header 
const textPopVariants = {
    hidden: {  y: 20, opacity: 0,},
    visible: { y: 0, opacity: 1, transition: { 
            duration: 1, 
            ease: customEase, 
            delay: 0.9,
        },
    },
};

export const ProfessionalHeaderReveal = ({ children, className = "", once = true, amount = 0.3 ,...props }) => {
    return (
        <motion.div className={className} variants={backgroundWipeVariants} initial="hidden" whileInView="visible"  animate="visible" {...props}>
            <motion.div variants={textPopVariants} initial="hidden" whileInView="visible"  animate="visible" className="w-full h-full">
                {children}
            </motion.div>
        </motion.div>
    );
};
//end animasi header

//animasi untuk card grid dan elemen umum lainnya
const revealVariants = {
    hidden: {  y: 20, opacity: 0,  scale: 0.98,},
    visible: { y: 0, opacity: 1, scale: 1, transition: transitionProps,},
};

export const UniversalReveal = ({  children,  delay = 0,  className = "",  once = true,  amount = 0.3, ...props }) => {
    return (
        <motion.div variants={revealVariants} initial="hidden"  whileInView="visible"  viewport={{ once: once, amount: amount }} transition={{ ...transitionProps,  delay: delay, }} className={className} {...props} > 
            {children}
        </motion.div>
    );
};

//end animasi card grid dan elemen umum lainnya

//animasi untuk tabel dengan row yang di stagger
const rowItemVariants = {
    hidden: { opacity: 0, y: 20, },
    visible: { opacity: 1,  y: 0,
    transition: { duration: 1.8, ease: customEase, },
  },
};

const tableContainer = {
  hidden: {}, 
  visible: {
    transition: { staggerChildren: 0.2,  delayChildren: 0.1,},
  },
};


export const StaggerContainer = ({ children, once = true, amount = 0.1, tag: Tag = motion.tbody, ...props }) => {
    return (
        <Tag variants={tableContainer} initial="hidden" whileInView="visible" viewport={{ once: once, amount: amount }} {...props}>
            {children}
        </Tag>
    );
};

export const RowStaggerItem = ({ children, tag: Tag = motion.tr, ...props }) => {
    return (
        <Tag variants={rowItemVariants} {...props}>
            {children}
        </Tag>
    );
};
//end animasi tabel dengan row yang di stagger

//animasi untuk Header yang memeiliki 2 element
export const ImmediateReveal = ({  children,  delay = 0,  className = "",  ...props }) => {
    return (
        <motion.div variants={revealVariants} initial="hidden" animate="visible" transition={{  ...transitionProps,  delay: delay,}} className={className} {...props} > 
            {children}
        </motion.div>
    );
};
//end animasi header dengan 2 element

// Animasi untuk memecah teks menjadi huruf-huruf dan menganimasikannya satu per satu
const containerVariants = {
    visible: { 
        transition: { staggerChildren: 0.05, delayChildren: 0.1,}
    }
};

const charVariants = {
    hidden: {  y: 20,  opacity: 0,},
    visible: { y: 0,  opacity: 1, transition: { duration: 0.8, ease: customEase}
    }
};

export const CharReveal = ({ text, className = "", delay = 0, ...props }) => {
    const characters = Array.from(text); 
    return (
        <motion.div style={{ overflow: 'hidden', display: 'flex' }} variants={containerVariants} initial="hidden" animate="visible" transition={{ delay: delay }} className={className} {...props}>
            {characters.map((char, index) => (
                <motion.span key={index} variants={charVariants} style={{ whiteSpace: 'pre' }} >
                    {char}
                </motion.span>
            ))}
        </motion.div>
    );
};
//end animasi teks per huruf

//animasi untuk tombol dengan efek tekan
const subtleButtonVariants = {
    rest: {  scale: 1,  transition: { duration: 0.15, ease: "easeOut" } },
    hover: { scale: 1.02, transition: { duration: 0.15, ease: "easeOut" }
    },
    tap: { scale: 0.98,}
};

export const SubtleShadowButton = ({ children, className = "", ...props }) => {
    return (
        <motion.button variants={subtleButtonVariants} initial="rest" whileHover="hover" whileTap="tap" className={className} {...props}>
            {children}
        </motion.button>
    );
};
//end animasi tombol dengan efek tekan

// animasi dropdow biar keren broo kalau mau
const dropdownVariants = {
    hidden: { opacity: 0, scaleY: 0.8,originY: 0,transition: { duration: 0.25, ease: "easeIn" }},
    visible: { opacity: 1, scaleY: 1, transition: { duration: 0.3, ease: "easeOut" }},
};

export const SubMenuCollapse = ({ children, isOpen, ...props }) => {
    return (
        <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0,transition: {  duration: 0.3,  ease: "easeInOut", when: isOpen ? "beforeChildren" : "afterChildren" } }}style={{ overflow: 'hidden' }} {...props}>
            {children}
        </motion.div>
    );
};


export const AnimatedDropdown = ({ children, className = "", ...props }) => {
    return (
        <motion.div  variants={dropdownVariants} initial="hidden" animate="visible" exit="hidden" className={className} {...props}>
            {children}
        </motion.div>
    );
};
// end animasi dropdown biar keren broo kalau mau


const sidebarContainer = {
    hidden: {}, 
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2,},
    },
};

const sidebarItemVariants = {
    hidden: { opacity: 0, x: -20, },
    visible: {  opacity: 1,  x: 0,  transition: { duration: 0.5, ease: customEase,},
    },
};

export const SidebarStaggerContainer = ({ children, className = "", ...props }) => {
    return (
        <motion.div variants={sidebarContainer} initial="hidden" animate="visible" className={className} {...props}>
            {children}
        </motion.div>
    );
};

export const SidebarItemReveal = ({ children, className = "", ...props }) => {
    return (
        <motion.div variants={sidebarItemVariants} className={className} {...props}>
            {children}
        </motion.div>
    );
};