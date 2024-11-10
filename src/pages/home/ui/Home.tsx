import { useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ForwardedBingoCard, BingoCardRef } from "./bingo-card";
import { GenerateButton } from "./generate-button";

import { generateBingoCard } from "../lib/generators";

export function Home() {
  const { t } = useTranslation();

  const [cardNumbers, setCardNumbers] = useState<number[][]>(() =>
    generateBingoCard()
  );
  const bingoCardRef = useRef<HTMLDivElement & BingoCardRef>(null);

  const handleGenerateNewCard = useCallback(() => {
    setCardNumbers(generateBingoCard());

    bingoCardRef.current?.sayHello();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen space-y-4 bg-gray-100">
      <h1 className="text-3xl font-bold mt-24 mb-24">{t("home")}</h1>

      <GenerateButton onGenerate={handleGenerateNewCard} />
      <ForwardedBingoCard ref={bingoCardRef} numbers={cardNumbers} />
    </div>
  );
}
