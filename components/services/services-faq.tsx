"use client"

import { useState } from "react"
import { RiArrowDownSLine } from "@remixicon/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

type FaqItem = {
  question: string
  answer: string
}

type ServicesFaqProps = {
  title: string
  items: FaqItem[]
}

export function ServicesFaq({ title, items }: ServicesFaqProps) {
  const [openValue, setOpenValue] = useState<string>("")

  return (
    <section aria-labelledby="services-faq-heading">
      <h2
        id="services-faq-heading"
        className="font-heading mb-6 text-center text-2xl font-bold tracking-tight sm:text-3xl"
      >
        {title}
      </h2>

      <Accordion
        type="single"
        collapsible
        value={openValue}
        onValueChange={setOpenValue}
        className="w-full gap-4"
      >
        {items.map((item, index) => {
          const value = `faq-${index}`
          const isOpen = openValue === value

          return (
            <AccordionItem
              key={item.question}
              value={value}
              className={cn(
                "overflow-hidden rounded-lg border border-border/40 bg-card/40 transition-all duration-300 ease-out",
                isOpen &&
                  "border-primary shadow-[0_0_20px_rgba(149,247,2,0.12)]"
              )}
            >
              <div className="flex items-center justify-between gap-4 py-[5px] pr-2.5">
                <div className="flex min-w-0 flex-1 items-center gap-3 pl-[10px]">
                  <span
                    aria-hidden
                    className="size-2.5 shrink-0 rounded-full bg-primary"
                  />
                  <dt className="font-heading text-base font-medium tracking-tight text-foreground sm:text-lg">
                    {item.question}
                  </dt>
                </div>
                <AccordionTrigger className="group/trigger p-2 focus-visible:ring-0">
                  <span
                    aria-hidden
                    className="inline-flex motion-reduce:transition-none"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 300ms ease-out",
                    }}
                  >
                    <RiArrowDownSLine className="size-6 text-primary transition-[filter] duration-300 ease-out group-hover/trigger:drop-shadow-[0_0_6px_#95f702,0_0_14px_rgba(149,247,2,0.75)]" />
                  </span>
                </AccordionTrigger>
              </div>
              <AccordionContent>
                <dd className="pl-[10px] pr-2.5 pt-2 pb-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.answer}
                </dd>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </section>
  )
}
