import { useTranslation } from "react-i18next";

type GenerateButtonProps = {
  onGenerate: () => void;
};

export function GenerateButton({ onGenerate }: GenerateButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      onClick={onGenerate}
    >
      {t("generateButton")}
    </button>
  );
}
