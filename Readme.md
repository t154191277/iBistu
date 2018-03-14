# 无人机位置查询 作业

------

本程序使用Python3.5进行编写，请在相应Python环境下运行。

> * 输入：
> * _input 无人机运行位置的文本文件 或 文本内容
> * 如：_input = "plane1 1 1 1\nplane1 1 1 1 1 2 3\nplane1 2 3 4 1 1 1" 或者 "plane.txt"
> * _id 查询的序列
> * 输出：
> * 1、若查询成功，返回 [无人机编号] [查询序列_id] [位置1] [位置2] [位置3]
> * 2、若查询成功，但无人机所处记录序列故障 或者 无人机之前序列已经故障，返回 “Error ” [查询序列_id]
> * 3、若查询失败，并且查询的序列不存在，返回 “Cannot find ” [查询序列_id]

------

### 测试方法

> *  getAirPlanePos(_input, _id)


### 测试用例1 

> * plane.txt 内容：
> * plane1 1 1 1
> * plane1 1 1 1 1 2 3
> * plane1 2 3 4 1 1 1

------
> *  输入：
> *  _input = "plane.txt"
> * _id = 2
> * 输出：'plane1 2 3 4 5'

### 测试用例2

> *  输入：
> *  _input = "plane1 1 1 1\nplane1 1 1 1 1 2 3\nplane1 2 3 4 1 1 1"
> * _id = 2
> * 输出：'plane1 2 3 4 5'

### 测试用例3

> *  输入：
> *  _input = "plane1 1 1 1\nplane1 1 1 1 1 2 3\nplane1 2 3 4 1 1 1"
> * _id = 100
> * 输出：'Cannot not find 100'

### 测试用例4

> *  输入：
> *  _input = "plane1 1 1 1\nplane1 1 1 1 1 2 3\nplane1 1 1 1"
> * _id = 2
> * 输出：'Error: 2'

