import React, { forwardRef, useImperativeHandle } from "react";

export type BingoCardRef = {
  sayHello: () => void;
};
type BingoCardProps = {
  numbers: number[][];
};

function BingoCard({ numbers }: BingoCardProps, ref: React.Ref<BingoCardRef>) {
  useImperativeHandle(ref, () => ({
    sayHello() {
      console.log("Hello from BingoCard");
    },
  }));

  return (
    <div className="bingo-card bg-white p-4 rounded-lg shadow-xl w-full max-w-2xl mx-auto">
      <table className="w-full table-auto border-separate border-spacing-2">
        <tbody>
          {numbers.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((num, colIndex) => (
                <td
                  key={colIndex}
                  className="text-center text-lg font-bold min-w-11 max-w-11 py-3 px-4 border border-gray-300 rounded-md 
                             transition-colors hover:bg-blue-100"
                >
                  {num >= 0 ? num : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const ForwardedBingoCard = forwardRef(BingoCard);
