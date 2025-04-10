/*
 * @Author: LinYiHan
 * @Date: 2025-04-03 15:25:35
 * @Description: 
 * @Version: 1.0
 */
// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
import * as tencentcloud from "tencentcloud-sdk-nodejs-lkeap";
import dotenv from 'dotenv';
dotenv.config();

const secretId = process.env.TENCENT_CLOUD_SECRET_ID;
const secretKey = process.env.TENCENT_CLOUD_SECRET_KEY;

const LkeapClient = tencentcloud.lkeap.v20240522.Client;

// 实例化一个认证对象，入参需要传入腾讯云账户 SecretId 和 SecretKey，此处还需注意密钥对的保密
// 代码泄露可能会导致 SecretId 和 SecretKey 泄露，并威胁账号下所有资源的安全性
// 以下代码示例仅供参考，建议采用更安全的方式来使用密钥
// 请参见：https://cloud.tencent.com/document/product/1278/85305
// 密钥可前往官网控制台 https://console.cloud.tencent.com/cam/capi 进行获取
const clientConfig = {
  credential: {
    secretId,
    secretKey,
  },
  region: "ap-guangzhou",
  profile: {
    httpProfile: {
      endpoint: "lkeap.tencentcloudapi.com",
    },
  },
};

// 实例化要请求产品的client对象,clientProfile是可选的
const client = new LkeapClient(clientConfig);
// const params = {
//     "Model": "deepseek-v3",
//     "Messages": [
//         {
//             "Role": "user",
//             "Content": "100*200/23等于多少"
//         }
//     ],
//     "Stream": true
// };

export function Chat(params: {Model: string, Messages: {Role: string, Content: string}[], Stream: boolean}) {
  return new Promise((resolve, reject) => {
    client.ChatCompletions(params).then(
      async (res: any) => {
        console.log('Received response from LLM API');
        if (typeof res.on === "function") {
          // 流式响应
          let streamContent = '';
          res.on("message", (message: any) => {
            const data = message.data;
            if (!data) {
              return;
            }
            if (data === "[DONE]") {
              const result = streamContent.replace(/```json\n/g, "").replace(/\n```/g, "");
              resolve(result); // 返回所有收集到的内容
              return;
            }
            const json = JSON.parse(data);
            if (!json || !json.Choices || !(json.Choices instanceof Array) || json.Choices.length === 0) {
              return;
            }
            const delta = json.Choices[0].Delta;
            if (!delta) {
              return;
            }
            const content = delta.Content;
            if (!content) {
              return;
            }
            // console.log('Stream message received:', content);
            streamContent += content; // 收集流式输出的内容
          });
        } else {
          // 非流式响应
          console.log('Non-stream response:', res);
          resolve(res);
        }
      },
      (err: Error) => {
        console.error('Error occurred while calling LLM API:', err);
        reject(err);
      }
    );
  });
}