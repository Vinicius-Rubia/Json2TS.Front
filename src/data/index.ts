export const defaultJsonValue = `{
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
