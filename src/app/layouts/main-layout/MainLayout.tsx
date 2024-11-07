import { useCallback } from "react";
import { Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function MainLayout() {
  return (
    <div id="main-layout">
      <Header />

      <div id="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export function Header() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      i18n.changeLanguage(e.target.value);
    },
    []
  );

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-center items-center space-x-8">
        <div className="flex space-x-8">
          <Link
            to="/page1"
            className="text-xl hover:text-gray-400 transition-colors"
          >
            {t("page1")}
          </Link>
          <Link
            to="/page2"
            className="text-xl hover:text-gray-400 transition-colors"
          >
            {t("page2")}
          </Link>
        </div>
        <div className="ml-auto">
          <select
            value={i18n.language}
            onChange={toggleLanguage}
            className="text-xl bg-gray-800 text-white border border-gray-600 p-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            <option value="en">EN</option>
            <option value="ru">РУ</option>
            <option value="kz">ҚЗ</option>
          </select>
        </div>
      </nav>
    </header>
  );
}
