/*
 * @Author: LinYiHan
 * @Date: 2025-04-03 12:01:36
 * @Description: 
 * @Version: 1.0
 */
import express, { Request, Response } from 'express';
import cors from 'cors';
import { Chat } from './LLMApi';
import { designApiDocument } from './DesignApiDocument';

const app = express();
const port: number = 3001;

// 关键：添加JSON解析中间件
app.use(express.json()); 

// 解决跨域问题
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// 添加MCP服务端路由
app.post('/mcp', (req: Request, res: Response) => {
  const { modelId, context } = req.body;

  // 检查必要的参数是否存在
  // if (!modelId || !context) {
  //   return res.status(400).json({ 
  //     status: 'error', 
  //     message: 'Missing required parameters: modelId and context' 
  //   });
  // }

  // 模拟处理MCP请求
  const response = {
    modelId,
    context,
    status: 'success',
    message: 'MCP request processed successfully',
    timestamp: new Date().toISOString()
  };

  res.json(response);
});

// 添加加法计算接口
app.post('/add', (req: Request, res: Response) => {
  console.log("执行了add方法");
  const { num1, num2 } = req.body;

  // if (typeof num1 !== 'number' || typeof num2 !== 'number') {
  //   return res.status(400).json({ error: 'Invalid input, numbers are required' });
  // }

  const result = num1 + num2;
  res.json({ result });
});

// 添加LLMApi封装接口
// 测试接口：
// curl -X POST "http://localhost:3000/llm-api" -H "Content-Type: application/json" -d "{\"model\":\"deepseek-v3\",\"messages\":[{\"Role\":\"user\",\"Content\":\"你是谁\"}],\"stream\":true}"
app.post('/llm-api', async (req: Request, res: Response) => {
  const { Model, Messages, Stream } = req.body;

  try {
    if (Messages && Messages.length > 0) {
      const q = Messages[0].Content;
      const context = `以下是设计工具的Api文档：
                      ${designApiDocument}
                      我的问题是：
                      ${q}
                      请根据问题输出符合MCP协议的回答，返回结果直接用于调用设计工具的Api。
                      要求返回去掉代码解释，方便我直接调用。
      `;
      console.log(context);
      Messages[0].Content = context;
    }

    const params = {
      Model,
      Messages,
      Stream
    };

    const response = await Chat(params);

    // Assuming the response is not stream-based and directly contains the result
    console.log(response);
    res.json(response);

  } catch (error) {
    console.error('Error calling LLM API:', error);
    res.status(500).json({ error: 'Failed to call LLM API' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://sjtest.yfway.com:${port}`);
});