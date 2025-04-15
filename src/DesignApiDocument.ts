/*
 * @Author: LinYiHan
 * @Date: 2025-04-10 14:45:29
 * @Description: 
 * @Version: 1.0
 */
export const designApiDocument = `
接口调用
    入口类
        Api

    初始化
        Api.init(配置)
        例子
            Api.init({
                view3dId: canvas3D.value.canvas3d.id,
                view2dId: canvas2D.value.canvas2dCanvas.id
            });

    命令调用
        executeCommand(命令名, 命令传参)
        例子
            Api.executeCommand("createRectangularRoom", {}); // 只调用创建矩形房间命令

开发指引
    坐标系：采用右手坐标系（X: 水平右，Y: 垂直上，Z: 深度）
    单位体系：长度单位统一为毫米（mm）
    材质引用：使用预定义材质键值（参见MaterialNameList枚举）

命令集
    户型操作命令集
        矩形房间创建
            {
              "command": "createRectangularRoom",
              "parameters": {
              }
            }

        单墙体创建
            {
            "command": "createOneWall",
              "parameters": {
              }
            }

        地面生成指令
            {
              "command": "createGround",
              "parameters": {
              }
            }

        创建单开门
            {
              "command": "createSingleDoor",
              "parameters": {
                "type": number,// 门窗类型 0-单开门 1-双开门 2-子母门 3-推拉门 4-阳台门 5-平开窗 6-飘窗
                "width": number,// 宽度
                "height": number,// 高度
                "thickness": number,// 厚度
                "elevation": number,// 离地高
                "position": {
                  x: number,// x坐标
                  y: number,// y坐标
                  z: number// z坐标
                },
                }
              }
            }

    AI协同命令集
        智能建模对话
            {
            "command": "AIChat",
              "parameters": {
                "Context": string,// 提问内容
              }
            }

    文件操作命令集
        打开场景
            {
            "command": "openScene",
              "parameters": {
                "sceneData": string,// 场景信息
              }
            }

        新建场景
            {
            "command": "openScene",
              "parameters": {
                "sceneData": string,// 场景信息
              }
            }
        回退
            {
            "command": "undo",
              "parameters": {
                }
              }
            }
        撤销
            {
            "command": "redo",
              "parameters": {
                }
              }
            }

    编辑命令集合
        获取当前选中物体的信息
            {
            "command": "getSelectedObjectInfo",
              "parameters": {
              }
              "return": {
                "uuid": string,// 物体id
                "name": string,// 物体名称
              }
            }
        删除当前选中物体
            {
            "command": "deleteSelectedObject",
              "parameters": {
              }
            }
`;

// export const designApiDocument1 = `
// 接口调用
//     入口类
//         Api

//     初始化
//         Api.init(配置)
//         例子
//             Api.init({
//                 view3dId: canvas3D.value.canvas3d.id,
//                 view2dId: canvas2D.value.canvas2dCanvas.id
//             });

//     命令调用
//         executeCommand(命令名, 命令传参)
//         例子
//             Api.executeCommand("createRectangularRoom", {}); // 只调用创建矩形房间命令

// 开发指引
//     坐标系：采用右手坐标系（X: 水平右，Y: 垂直上，Z: 深度）
//     单位体系：长度单位统一为毫米（mm）
//     材质引用：使用预定义材质键值（参见MaterialNameList枚举）

// 命令集
//     户型操作命令集
//         矩形房间创建
//             {
//               "command": "createRectangularRoom",
//               "parameters": {
//               }
//             }

//         单墙体创建
//             {
//             "command": "createOneWall",
//               "parameters": {
//               }
//             }

//         地面生成指令
//             {
//               "command": "createGround",
//               "parameters": {
//               }
//             }

//         创建单开门
//             {
//               "command": "createSingleDoor",
//               "parameters": {
//               }
//             }

//     AI协同命令集
//         智能建模对话
//             {
//             "command": "AIChat",
//               "parameters": {
//                 "Context": string,// 提问内容
//               }
//             }

//     文件操作命令集
//         打开场景
//             {
//             "command": "openScene",
//               "parameters": {
//                 "sceneData": string,// 场景信息
//               }
//             }

//         新建场景
//             {
//             "command": "openScene",
//               "parameters": {
//                 "sceneData": string,// 场景信息
//               }
//             }
// `;