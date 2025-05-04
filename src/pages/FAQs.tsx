
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock FAQ data
const faqCategories = [
  {
    id: "general",
    name: "General Information",
    faqs: [
      {
        id: "faq-1",
        question: "Who can use the CSN bus service?",
        answer: "The CSN bus service is available to all CSN students, faculty, and staff with a valid CSN ID card. Visitors with a temporary pass can also use the service."
      },
      {
        id: "faq-2",
        question: "Is there a fee to use the bus service?",
        answer: "No, the bus service is free for all CSN students, faculty, and staff with a valid CSN ID card. This service is funded through student fees and college resources."
      },
      {
        id: "faq-3",
        question: "Do I need to show my student ID to ride the bus?",
        answer: "Yes, you must present a valid CSN ID card when boarding the bus. Faculty and staff must also show their ID cards. This helps ensure the service is used only by the CSN community."
      }
    ]
  },
  {
    id: "routes",
    name: "Routes & Schedules",
    faqs: [
      {
        id: "faq-4",
        question: "How often do the buses run?",
        answer: "Buses run every 30 minutes on the Blue and Green Lines and every 45 minutes on the Orange Line during regular service hours. Hours vary by route, so please check the specific route schedules for details."
      },
      {
        id: "faq-5",
        question: "Do buses operate on weekends?",
        answer: "Yes, buses operate on Saturdays with reduced frequency. There is no service on Sundays or college-observed holidays."
      },
      {
        id: "faq-6",
        question: "Are there reduced schedules during breaks?",
        answer: "Yes, during semester breaks and summer sessions, buses operate on a reduced schedule. Check the website or mobile app for the current schedule during these periods."
      }
    ]
  },
  {
    id: "policies",
    name: "Policies & Rules",
    faqs: [
      {
        id: "faq-7",
        question: "Can I bring food and drinks on the bus?",
        answer: "Sealed food and drinks are permitted on buses, but consumption is prohibited. We ask that you wait until you reach your destination before eating or drinking to help keep our buses clean."
      },
      {
        id: "faq-8",
        question: "Are pets allowed on CSN buses?",
        answer: "Only service animals as defined by the ADA are permitted on CSN buses. Emotional support animals and pets are not allowed for the safety and comfort of all passengers."
      },
      {
        id: "faq-9",
        question: "What items are prohibited on buses?",
        answer: "Prohibited items include: weapons of any kind, flammable materials, large items that block aisles or seats, bicycles (except foldable bikes that can be stored safely), and any items that may pose a safety hazard."
      }
    ]
  },
  {
    id: "accessibility",
    name: "Accessibility",
    faqs: [
      {
        id: "faq-10",
        question: "Are CSN buses wheelchair accessible?",
        answer: "Yes, all CSN buses are equipped with wheelchair ramps and designated spaces for wheelchair users. Drivers are trained to assist passengers who need help boarding and exiting the bus."
      },
      {
        id: "faq-11",
        question: "How do I request special accommodations?",
        answer: "For special accommodations beyond standard wheelchair accessibility, please contact the Disability Resource Center at (702) 555-1234 at least 48 hours in advance of your trip."
      }
    ]
  }
];

export default function FAQs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Filter FAQs based on search query and active category
  const filteredFAQs = faqCategories.flatMap(category => {
    if (activeCategory !== "all" && activeCategory !== category.id) {
      return [];
    }
    
    return category.faqs.filter(faq => 
      searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(faq => ({
      ...faq,
      category: category.name
    }));
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-csn-blue text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
            <p className="opacity-90">Find answers to common questions about CSN bus services</p>
          </div>
        </div>
        
        {/* Search and Categories Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for questions or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant={activeCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory("all")}
                  className={activeCategory === "all" ? "bg-csn-blue" : ""}
                >
                  All
                </Button>
                
                {faqCategories.map(category => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                    className={activeCategory === category.id ? "bg-csn-blue" : ""}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQs Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFAQs.map(faq => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 px-6"
                    >
                      <AccordionTrigger className="text-left font-medium py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-1 text-gray-600">
                        <p>{faq.answer}</p>
                        {activeCategory === "all" && (
                          <p className="text-sm text-gray-400 mt-3">
                            Category: {faq.category}
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any FAQs matching your search criteria.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                  >
                    Reset Search
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-xl font-semibold text-csn-blue mb-2">Still Have Questions?</h3>
            <p className="text-gray-600 mb-4">
              If you couldn't find the answer you're looking for, please contact our transportation services team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="tel:+17025551234" 
                className="inline-flex items-center px-4 py-2 bg-csn-blue text-white rounded-md hover:bg-csn-darkblue transition-colors"
              >
                Call: (702) 555-1234
              </a>
              <a 
                href="mailto:transportation@csn.edu" 
                className="inline-flex items-center px-4 py-2 border border-csn-blue text-csn-blue rounded-md hover:bg-csn-blue hover:text-white transition-colors"
              >
                Email Transportation Services
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
