import React, { useState, useRef } from 'react';
import { Button, message,  Form, Input, Radio } from 'antd';
import $api from '../../http';  

const Formula = () => {
  const [formulaName, SetFormulaName] = useState('')
  const [formulaSrc, SetFormulaSrc] = useState('')
  const [usecondition, SetUsecondition] = useState('')
  const [useDesc, SetUseDesc] = useState('')
  const [materialYear, SetMaterialYear] = useState('')
  const [startEndYear, SetStartEndYear] = useState('')
  const [sampleMethod, SetSampleMethod] = useState('')
  const [theoryDistribute, SetTheoryDistribute] = useState('')
  const [sampleSite, SetSampleSite] = useState('')
  const [sourceFile, SetSourceFile] = useState('')
  const [sourceLink, SetSourceLink] = useState('')
  const [formatUnit, SetFormatUnit] = useState('')
  const [replayTime, SetReplayTime] = useState('')
  const [comment, SetComment] = useState('')
  const [status, setStatus] = useState('1');
  const formRef = useRef();

  // const { getCityList } = useModel('city'); // useModel 是umi 提供的一个全局状态管理的方式
  const addFormula = async (params) => {
    let res = await $api.post('/formula/add',  params);
    const { success, data, info } = res.data;
    if (success) {
      // tableRef.current.reload(); // 调用tableRef.current会得到这个protable实例  reload就是重新加载表格内容
      message.success('添加成功');
      // getCityList(true);  // 需要去通知更新 全局状态的城市信息
    } else {
      message.warning(info);
    }
  };

    const onFinish = (values) => {
      formRef.current.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onMaintainStatusChange = (e) => {
      setStatus(e.target.value)
    }

    const saveFormula = () => {
       const data = {
        formulaName,
        formulaSrc,
        usecondition,
        useDesc,
        materialYear,
        startEndYear,
        sampleMethod,
        theoryDistribute,
        sampleSite,
        sourceFile,
        sourceLink,
        formatUnit,
        replayTime,
        comment,
        status
       }
       addFormula(data)
    }
  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          formulaName:'',
          formulaSrc:'',
          usecondition:'',
          useDesc:'',
          materialYear:'',
          startEndYear:'',
          sampleMethod:'',
          theoryDistribute:'',
          sampleSite:'',
          sourceFile:'',
          sourceLink:'',
          formatUnit:'',
          replayTime:'',
          comment:'',
          status:''
        }}
        onFinish={onFinish}
        ref={formRef}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
    <Form.Item
        label="公式名称"
        name="formulaName"
        rules={[
          {
            required: true,
            message: 'Please input your target area!',
          },
        ]}
      >
        <Input onChange={(e) => SetFormulaName(e.target.value)} />
    </Form.Item>
    <Form.Item
      label="公式图片"
      name="formulaSrc"
      rules={[
        {
          required: true,
          message: 'Please input your areaRange!',
        },
      ]}
    >
      <Input  onChange={(e) => SetFormulaSrc(e.target.value)} />
    </Form.Item>

    <Form.Item
      label="使用条件"
      name="usecondition"
      rules={[
        {
          required: false,
          message: 'Please input your areaRange!',
        },
      ]}
    >
      <Input.TextArea rows={4} onChange={(e) => SetUsecondition(e.target.value)} />
    </Form.Item>

    <Form.Item label="公式说明" name="useDesc">
      <Input.TextArea rows={4} onChange={(e) => SetUseDesc(e.target.value)} />
    </Form.Item>
    
    <Form.Item label="资料年数" name="materialYear">
      <Input  onChange={(e) => SetMaterialYear(e.target.value)} />
    </Form.Item>

    <Form.Item label="起止年份" name="startEndYear">
      <Input  onChange={(e) => SetStartEndYear(e.target.value)} />
    </Form.Item>

    <Form.Item label="选样方法" name="sampleMethod">
      <Input  onChange={(e) => SetSampleMethod(e.target.value)} />
    </Form.Item>

    <Form.Item label="理论分布" name="theoryDistribute">
      <Input  onChange={(e) => SetTheoryDistribute(e.target.value)} />
    </Form.Item>

    <Form.Item label="取样站点" name="sampleSite">
    <Input  onChange={(e) => SetSampleSite(e.target.value)} />
    </Form.Item>

    <Form.Item label="来源文件" name="sourceFile">
      <Input  onChange={(e) => SetSourceFile(e.target.value)} />
    </Form.Item>

    <Form.Item label="来源链接" name="sourceLink">
      <Input  onChange={(e) => SetSourceLink(e.target.value)} />
    </Form.Item>

    <Form.Item label="编制单位" name="formatUnit">
      <Input  onChange={(e) => SetFormatUnit(e.target.value)} />
    </Form.Item>

    <Form.Item label="批复说明时间" name="replayTime">
      <Input  onChange={(e) => SetReplayTime(e.target.value)} />
    </Form.Item>

    <Form.Item label="备注" name="comment">
      <Input  onChange={(e) => SetComment(e.target.value)} />
    </Form.Item>

    <Form.Item label="维护状态" name="status"
      rules={[
        {
          required: true,
        }
      ]}
    >
      <Radio.Group onChange={onMaintainStatusChange} >
        <Radio value="1"> 已维护 </Radio>
        <Radio value="2"> 待维护 </Radio>
      </Radio.Group>
    </Form.Item>

    <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={() => saveFormula()}>
          保存
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};


export default Formula;
 