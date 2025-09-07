import DashboardCard from "@/components/dashboard/dashboard-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CreditCardIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { userCards } from "./financialData";
import CreditCard from "@/components/dashboard/credit-card";

export default function MyCards() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % userCards.length);
  };

  const prevCard = () => {
    setCurrentCardIndex(
      (prev) => (prev - 1 + userCards.length) % userCards.length
    );
  };

  return (
    <DashboardCard title="MEUS CARTÕES" icon={CreditCardIcon}>
      {userCards.length === 0 ? (
        <div className="text-sm text-center text-neutral-400 py-5">
          {" "}
          Nenhum cartão disponível.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div></div>
            <div className="flex items-center justify-between  w-full gap-1">
              <Button
                variant="default"
                size="lg"
                onClick={prevCard}
                className="h-8 w-8 p-0 text-neutral-400 hover:text-amber-300"
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <Button
                variant="default"
                size="lg"
                onClick={nextCard}
                className="h-8 w-8 p-0 text-neutral-400 hover:text-amber-300"
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentCardIndex * 100}%)`,
              }}
            >
              {userCards.map((card) => (
                <div key={card.id} className="w-full flex-shrink-0">
                  <CreditCard card={card} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-1">
            {userCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCardIndex(index)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  index === currentCardIndex ? "bg-amber-300" : "bg-neutral-600"
                }`}
              />
            ))}
          </div>
        </div>
      )}
      <Link href="/cards">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 mt-3"
        >
          {userCards.length === 0 ? "Adicionar cartão" : "Gerenciar Cartões"}
        </Button>
      </Link>
    </DashboardCard>
  );
}
