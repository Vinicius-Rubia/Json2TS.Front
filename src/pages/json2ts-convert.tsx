import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import JsonToTypescriptConverter from "@/utils/json-to-typescript-converter";
import Editor, { Monaco } from "@monaco-editor/react";
import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

const defaultJsonValue = `{
  "projectName": "Json2TS",
  "version": "1.0.0",
  "description": "Uma ferramenta que converte JSON em tipos TypeScript, simplificando a documentação e a integração.",
  "features": [
    "Conversão automática de JSON para tipos TypeScript",
    "Facilidade de uso com uma interface amigável",
    "Suporte para copiar e colar tipos diretamente no seu código"
  ],
  "config": {
    "defaultTheme": "dark",
    "outputFormat": "typescript",
    "includeExamples": true
  },
  "observations": [
    "No caso de um array onde um índice não tem as mesmas propriedades que os outros indíces, o código por padrão ira gerar a tipagem apenas para o primeiro índice identificado."
  ],
  "examples": [
    {
      "name": "Exemplo 01",
      "json": {
        "product": "Laptop",
        "price": 999.99,
        "inStock": true,
        "tags": ["electronics", "computers"],
        "manufacturer": {
          "name": "TechCorp",
          "address": {
            "street": "456 Tech Rd",
            "city": "Tech City",
            "country": "Countryland"
          }
        }
      }
    }
  ]
}
`;

export const Json2TSConvert: React.FC = () => {
  const [jsonValue, setJsonValue] = useState<string | undefined>(defaultJsonValue);
  const [typescriptCode, setTypescriptCode] = useState<string | undefined>(`// Clique em "Convert Json2TS para gerar a tipagem do JSON`);
  const [copyCode, setCopyCode] = useState<boolean>(false);
  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(typescriptCode!);
    setCopyCode(true);
    setTimeout(() => {
      setCopyCode(false);
    }, 1000);
  }
  

  function handleEditorChange(value: string | undefined) {
    if (value !== undefined) {
      setJsonValue(value);
    }
  }

  function handleConvertJson2Ts() {
    try {
      const tsCode = JsonToTypescriptConverter.convert(jsonValue!);
      setTypescriptCode(tsCode);
    } catch (error) {
      console.error('Invalid JSON', error);
    }
  }

  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    monaco.editor.defineTheme("CustomTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        {
          background: "200020",
          token: "",
        },
        {
          foreground: "404080",
          background: "200020",
          fontStyle: "italic",
          token: "comment.block",
        },
        {
          foreground: "999999",
          token: "string",
        },
        {
          foreground: "707090",
          token: "constant.language",
        },
        {
          foreground: "7090b0",
          token: "constant.numeric",
        },
        {
          fontStyle: "bold",
          token: "constant.numeric.integer.int32",
        },
        {
          fontStyle: "italic",
          token: "constant.numeric.integer.int64",
        },
        {
          fontStyle: "bold italic",
          token: "constant.numeric.integer.nativeint",
        },
        {
          fontStyle: "underline",
          token: "constant.numeric.floating-point.ocaml",
        },
        {
          foreground: "666666",
          token: "constant.character",
        },
        {
          foreground: "8080a0",
          token: "constant.language.boolean",
        },
        {
          foreground: "008080",
          token: "variable.language",
        },
        {
          foreground: "008080",
          token: "variable.other",
        },
        {
          foreground: "a080ff",
          token: "keyword",
        },
        {
          foreground: "a0a0ff",
          token: "keyword.operator",
        },
        {
          foreground: "d0d0ff",
          token: "keyword.other.decorator",
        },
        {
          fontStyle: "underline",
          token: "keyword.operator.infix.floating-point.ocaml",
        },
        {
          fontStyle: "underline",
          token: "keyword.operator.prefix.floating-point.ocaml",
        },
        {
          foreground: "c080c0",
          token: "keyword.other.directive",
        },
        {
          foreground: "c080c0",
          fontStyle: "underline",
          token: "keyword.other.directive.line-number",
        },
        {
          foreground: "80a0ff",
          token: "keyword.control",
        },
        {
          foreground: "b0fff0",
          token: "storage",
        },
        {
          foreground: "60b0ff",
          token: "entity.name.type.variant",
        },
        {
          foreground: "60b0ff",
          fontStyle: "italic",
          token: "storage.type.variant.polymorphic",
        },
        {
          foreground: "60b0ff",
          fontStyle: "italic",
          token: "entity.name.type.variant.polymorphic",
        },
        {
          foreground: "b000b0",
          token: "entity.name.type.module",
        },
        {
          foreground: "b000b0",
          fontStyle: "underline",
          token: "entity.name.type.module-type.ocaml",
        },
        {
          foreground: "a00050",
          token: "support.other",
        },
        {
          foreground: "70e080",
          token: "entity.name.type.class",
        },
        {
          foreground: "70e0a0",
          token: "entity.name.type.class-type",
        },
        {
          foreground: "50a0a0",
          token: "entity.name.function",
        },
        {
          foreground: "80b0b0",
          token: "variable.parameter",
        },
        {
          foreground: "3080a0",
          token: "entity.name.type.token",
        },
        {
          foreground: "3cb0d0",
          token: "entity.name.type.token.reference",
        },
        {
          foreground: "90e0e0",
          token: "entity.name.function.non-terminal",
        },
        {
          foreground: "c0f0f0",
          token: "entity.name.function.non-terminal.reference",
        },
        {
          foreground: "009090",
          token: "entity.name.tag",
        },
        {
          background: "200020",
          token: "support.constant",
        },
        {
          foreground: "400080",
          background: "ffff00",
          fontStyle: "bold",
          token: "invalid.illegal",
        },
        {
          foreground: "200020",
          background: "cc66ff",
          token: "invalid.deprecated",
        },
        {
          background: "40008054",
          token: "source.camlp4.embedded",
        },
        {
          foreground: "805080",
          token: "punctuation",
        },
      ],
      colors: {
        "editor.foreground": "#D0D0FF",
        "editor.background": "#00000000",
        "editor.selectionBackground": "#80000080",
        "editor.lineHighlightBackground": "#80000040",
        "editorCursor.foreground": "#7070FF",
        "editorWhitespace.foreground": "#BFBFBF",
      },
    });
  };

  return (
    <div>
      <header className="flex items-center justify-between h-20 bg-primary-foreground px-4">
        <h1 className="font-semibold text-xl">Json2TS</h1>
        <Button
          variant="outline"
          className="text-emerald-400 hover:bg-emerald-600"
          onClick={handleConvertJson2Ts}
        >
          Convert Json2TS
        </Button>
        <ModeToggle />
      </header>
      <div className="grid grid-cols-2">
        <div>
          <Editor
            defaultLanguage="json"
            defaultValue={defaultJsonValue}
            className="h-[calc(100vh-80px)]"
            theme="CustomTheme"
            beforeMount={handleEditorDidMount}
            onChange={handleEditorChange}
            options={{
              fontSize: 16,
              wordWrap: "on",
              tabSize: 2,
              formatOnPaste: true,
              minimap: {
                enabled: false,
              },
            }}
          />
        </div>
        <div className="relative">
          <Button
            variant="secondary"
            className="absolute right-10 top-4 z-10 size-8 p-2"
            onClick={copyTextToClipboard}
          >
            {copyCode ? <Check className="text-emerald-400" /> : <Copy /> }
          </Button>
          <Editor
            defaultLanguage="typescript"
            value={typescriptCode}
            className="h-[calc(100vh-80px)]"
            theme="CustomTheme"
            beforeMount={handleEditorDidMount}
            options={{
              fontSize: 16,
              wordWrap: "on",
              tabSize: 2,
              minimap: {
                enabled: false,
              },
              readOnly: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};
