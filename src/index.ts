import z from "zod";
import { McpServer } from "../node_modules/@modelcontextprotocol/sdk/dist/esm/server/mcp.js";
import { StdioServerTransport } from "../node_modules/@modelcontextprotocol/sdk/dist/esm/server/stdio.js";

const server = new McpServer({
  name: "weather-server",
  version: "1.0.0",
});

const getWeatherSchema = z.object({
  city: z.string().describe("날씨를 조회할 도시 이름"),
})

server.registerTool(
  "getWeather",
  {
    title: "날씨 조회",
    description: "지정된 도시의 현재 날씨 정보를 가져옴",
    inputSchema: getWeatherSchema,
  },
  async ({ city }) => {
    const weatherData = {
      temperature: "25",
      condition: "맑음"
    };
    console.log(`[getWeather TOOL] 입력: city = ${city}`);
    const responseText = `${city}의 현재 날씨는 ${weatherData.temperature}이며, ${weatherData.condition}입니다.`;
    console.log(`[getWeather TOOL] 응답: ${responseText}`);
    return {
      content: [{ type: "text", text: responseText }]
    };
  }
)
const transport = new StdioServerTransport();
await server.connect(transport);
console.log("McpServer ready:", server);
