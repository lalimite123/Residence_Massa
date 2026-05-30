"use client"

import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

const WHATSAPP_NUMBERS = {
  primary: "237676961949",
  secondary: "237698217257"
}

interface WhatsAppButtonProps {
  message?: string
}

export function WhatsAppButton({ message }: WhatsAppButtonProps) {
  const defaultMessage = encodeURIComponent(
    "Bonjour Massa Residence, je suis interesse(e) par vos logements de luxe a Yaounde."
  )
  const encodedMessage = message ? encodeURIComponent(message) : defaultMessage

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBERS.primary}?text=${encodedMessage}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      aria-label="Contact on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
    >
      <MessageCircle className="w-6 h-6" fill="currentColor" />
    </motion.a>
  )
}

export function WhatsAppLink({
  children,
  message,
  className,
  useSecondary = false,
}: {
  children: React.ReactNode
  message?: string
  className?: string
  useSecondary?: boolean
}) {
  const defaultMessage = encodeURIComponent(
    "Bonjour Massa Residence, je suis interesse(e) par vos logements de luxe a Yaounde."
  )
  const encodedMessage = message ? encodeURIComponent(message) : defaultMessage
  const number = useSecondary ? WHATSAPP_NUMBERS.secondary : WHATSAPP_NUMBERS.primary
  const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}

export { WHATSAPP_NUMBERS }
