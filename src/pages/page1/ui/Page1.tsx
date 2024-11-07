import { useState, useRef, useEffect, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import { useTranslation } from "react-i18next";
import DatePicker, { registerLocale } from "react-datepicker";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import { Locale } from "date-fns";
import ru from "date-fns/locale/ru";
import kz from "date-fns/locale/kk";
import en from "date-fns/locale/en-US";

import { generateMockData, MockDataItem } from "../lib/generators";

import "react-datepicker/dist/react-datepicker.css";

dayjs.extend(isBetween);

registerLocale("ru", ru as unknown as Locale);
registerLocale("kz", kz as unknown as Locale);
registerLocale("en", en as unknown as Locale);

export function Page1() {
  const { t } = useTranslation();

  const allData = useRef<MockDataItem[]>([]);

  const [filteredData, setFilteredData] = useState<MockDataItem[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [selectedType, setSelectedType] = useState<"Image" | "Video" | "">("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [listHeight, setListHeight] = useState<number>(400);

  useEffect(() => {
    const mockData = generateMockData(1000);
    allData.current = mockData;
    setFilteredData(mockData);

    const handleResize = () => {
      setListHeight(window.innerHeight - 100);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filterData = useCallback(
    (
      name: string,
      type: "Image" | "Video" | "",
      start: Date | null,
      end: Date | null
    ) => {
      let filtered = allData.current;

      if (name) {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(name.toLowerCase())
        );
      }

      if (type) {
        filtered = filtered.filter((item) => item.type === type);
      }

      if (start && end) {
        filtered = filtered.filter((item) =>
          dayjs(item.createdDate).isBetween(
            dayjs(start),
            dayjs(end),
            "day",
            "[]"
          )
        );
      }

      setFilteredData(filtered);
    },
    []
  );

  const handleNameSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchName(value);
      filterData(value, selectedType, startDate, endDate);
    },
    [selectedType, startDate, endDate, filterData]
  );

  const handleTypeSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value as "Image" | "Video" | "";
      setSelectedType(value);
      filterData(searchName, value, startDate, endDate);
    },
    [searchName, startDate, endDate, filterData]
  );

  const handleStartDateChange = useCallback(
    (date: Date | null) => {
      setStartDate(date);
      filterData(searchName, selectedType, date, endDate);
    },
    [searchName, selectedType, endDate, filterData]
  );

  const handleEndDateChange = useCallback(
    (date: Date | null) => {
      setEndDate(date);
      filterData(searchName, selectedType, startDate, date);
    },
    [searchName, selectedType, startDate, filterData]
  );

  const handleClear = useCallback(() => {
    setSearchName("");
    setSelectedType("");
    setStartDate(null);
    setEndDate(null);
    setFilteredData(allData.current);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <input
          type="text"
          placeholder={t("namePlaceholder")}
          value={searchName}
          onChange={handleNameSearch}
          className="w-full sm:w-1/3 p-2 border rounded-md"
        />

        <select
          value={selectedType}
          onChange={handleTypeSelect}
          className="w-full sm:w-1/3 p-2 border rounded-md"
        >
          <option value="">{t("all")}</option>
          <option value="Image">{t("image")}</option>
          <option value="Video">{t("video")}</option>
        </select>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="dd.MM.yyyy"
            locale={t("locale")}
            className="w-full sm:w-auto p-2 border rounded-md"
          />

          <span className="text-center pt-2">{t("to")}</span>

          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="dd.MM.yyyy"
            locale={t("locale")}
            className="w-full sm:w-auto p-2 border rounded-md"
          />
        </div>

        <button
          onClick={handleClear}
          className="text-gray-500"
          style={{ background: "transparent", border: "none" }}
        >
          ✖
        </button>
      </div>

      <div className="overflow-hidden">
        <List
          height={listHeight}
          itemCount={filteredData.length}
          itemSize={50}
          width="100%"
        >
          {({ index, style }) => (
            <Row style={style} item={filteredData[index]} />
          )}
        </List>
      </div>
    </div>
  );
}

function Row({
  style,
  item,
}: {
  style: React.CSSProperties;
  item: MockDataItem;
}) {
  return (
    <div style={style} className="flex items-center space-x-4 p-2 border-b">
      <div className="truncate w-1/4">{item.name}</div>
      <div className="w-1/4">{item.type}</div>
      <div className="w-1/4">
        {dayjs(item.createdDate).format("DD.MM.YYYY")}
      </div>
      <img src={item.image} alt="icon" className="w-10 h-10" />
    </div>
  );
}
