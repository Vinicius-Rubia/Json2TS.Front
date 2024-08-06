import JsonToTypescriptConverter from "@/utils/json-to-typescript-converter";
import React from 'react';
import { Button } from './ui/button';

interface HeaderPops {
  setTypescriptCode: (tsCode: string) => void;
  jsonValue: string;
}

export const Header: React.FC<HeaderPops> = ({ setTypescriptCode, jsonValue }) => {

  function handleConvertJson2Ts() {
    try {
      const tsCode = JsonToTypescriptConverter.convert(jsonValue);
      setTypescriptCode(tsCode);
    } catch (error) {
      console.error('Invalid JSON', error);
    }
  }

  return (
    <header className="flex justify-center items-center relative h-20 bg-primary-foreground px-4">
        <h1 className="font-semibold text-xl absolute left-4">Json2TS</h1>
        <Button
          variant="outline"
          className="text-emerald-400 hover:bg-emerald-600"
          onClick={handleConvertJson2Ts}
        >
          Convert Json2TS
        </Button>
      </header>
  )
}
