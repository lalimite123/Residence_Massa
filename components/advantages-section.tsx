"use client"

import { Shield, Sparkles, HeartHandshake, Clock } from "lucide-react"
import { motion } from "framer-motion"
import type { Dictionary } from "@/lib/i18n"

interface AdvantagesSectionProps {
  dict: Dictionary
}

export function AdvantagesSection({ dict }: AdvantagesSectionProps) {
  const advantages = [
    {
      icon: Sparkles,
      title: dict.advantages.items.quality.title,
      description: dict.advantages.items.quality.description,
    },
    {
      icon: Shield,
      title: dict.advantages.items.security.title,
      description: dict.advantages.items.security.description,
    },
    {
      icon: HeartHandshake,
      title: dict.advantages.items.service.title,
      description: dict.advantages.items.service.description,
    },
    {
      icon: Clock,
      title: dict.advantages.items.flexibility.title,
      description: dict.advantages.items.flexibility.description,
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
            Nos avantages
          </span>
          <h2 className="text-2xl md:text-3xl font-medium text-foreground tracking-tight">
            {dict.advantages.title}
          </h2>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-border/50">
                {/* Icon */}
                <div className="w-12 h-12 mb-4 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                  <advantage.icon className="w-5 h-5 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {advantage.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
