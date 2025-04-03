/*
 * @Author: LinYiHan
 * @Date: 2025-04-03 12:01:36
 * @Description: 
 * @Version: 1.0
 */
import express, { Request, Response } from 'express';
const app = express();
const port: number = 3000;

// 关键：添加JSON解析中间件
app.use(express.json()); 

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// 添加MCP服务端路由
app.post('/mcp', (req: Request, res: Response) => {
  const { modelId, context } = req.body;
  
  // 模拟处理MCP请求
  const response = {
    modelId,
    context,
    status: 'success',
    message: 'MCP request processed successfully'
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});