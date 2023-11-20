##　Aave_Monitor_Demo1 文件

###　介绍

监控 Aave 事件并将数据记录到 CSV 文件的 Node.js 脚本。

功能：使用ether.js，直接与以太坊主链交互，首先监听交易event，根据event获取账户地址，最后返回账户的健康因子HF(health factor)。

连接对象：以太坊主网

效果：返回事件event，账户地址address，交易金额amount，监控因子HF

### 模块组成

1.导入所需的库和模块：代码首先导入了 ethers、fs 和 dotenv 等库和模块。ethers 是一个以太坊开发库，用于与以太坊进行交互。fs 是 Node.js 的文件系统模块，用于读写文件。dotenv 用于加载环境变量。

2.配置以太坊提供者：使用提供的 INFURA_API_KEY，代码配置了以太坊的 JSON-RPC 提供者。这个提供者允许通过指定的 Alchemy API URL 与以太坊进行通信。

3.定义合约地址和 ABI：代码定义了 lendingPoolV2 合约地址和对应的 ABI。ABI 用于与智能合约进行交互，定义了合约的方法和事件等。

4.监听 Aave 事件：代码使用 `contract.on` 方法监听 Deposit、Repay 和 Borrow 事件。当这些事件在 Aave 合约上触发时，相关的用户地址、金额和事件信息将被打印到控制台，并调用 `recordAddress` 函数记录地址和相关数据。

5.记录地址和数据：`recordAddress` 函数用于记录用户地址和相关数据。它使用合约的 `getUserAccountData` 方法获取用户的健康因子（healthFactor），然后将用户地址、事件、金额、健康因子和时间戳写入 CSV 文件中。

6.初始化输出文件：`initOutPut` 函数用于初始化 CSV 输出文件，并创建表头行。writeCSV` 函数用于将数据写入 CSV 文件中。它将数据拼接成一行，并使用 `fs.appendFileSync` 将行追加到输出文件中。

### code

npm init -y

npm install

node index.js

### 备注

![image-20230608164440099](C:\Users\glzhuang\AppData\Roaming\Typora\typora-user-images\image-20230608164440099.png)
