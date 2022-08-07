import React, { useState, useRef, useEffect } from 'react';
import { Button, message, Radio, Select, Form, Cascader, Input } from 'antd';
import { options } from '../../static/area';
import $api from '../../http'; 
 
const TargetArea = () => {
  const formRef = useRef(); // 创建一个转发  关联protable组件实例
  const [targetArea, setTargetArea]= useState('');
  const [areaRange, setAreaRange]= useState('');
  const [relatedFormula, setRelatedFormula]= useState([]);
  const [region, setRegion]= useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [publicStatus, setPublicStatus] = useState('1');

  const addTargetArea = async (params) => {
    let res = await $api.post('/targetArea/add',  params);
    const { success, data, info } = res.data;
    if (success) {
      message.success('添加成功');
    } else {
      message.warning(info);
    }
  };


  const formatFormulaList = async () => {
    let res = await $api.get('/formula/getAll');
    let arr = [];
    let formulaList = res.data.data;
    for(let i=0; i < formulaList.length; i++) {
      arr.push({
        value: formulaList[i].id,
        label: formulaList[i].formulaName
      })
    }
    setSelectOptions(arr);
  }
 
    const onChange = (value) => {
      setRegion(value)
    };
 
    const onFinish = (values) => {
      formRef.current.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
     
    };

    const onChange1 = (e) => {
      setPublicStatus(e.target.value);
    };

    const handleChange = (value) => {
      setRelatedFormula(value.join(','));
    };

    const saveTargetArea = () => {
       const data = {
        targetAreaName: targetArea,
        areaRangeDesc: areaRange,
        province: region[0],
        city: region[1],
        district: region[2],
        relatedFormulas: relatedFormula,
        publicStatus,
       }
       addTargetArea(data)
    }

    useEffect(() => {
      formatFormulaList()
    },[])
    
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
      initialValues ={{
        targetArea:'',
        areaRange: '',
        region: [],
        relatedFormula: []
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      ref={formRef}
    >
      <Form.Item
        label="目标地区"
        name="targetArea"
        rules={[
          {
            required: true,
            message: 'Please input your target area!',
          },
        ]}
      >
        <Input value={targetArea} onChange={(e) => setTargetArea(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="地区范围"
        name="areaRange"
        rules={[
          {
            required: false,
            message: 'Please input your areaRange!',
          },
        ]}
      >
        <Input value={areaRange} onChange={(e) => setAreaRange(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="三级行政"
        name="region"
        rules={[
          {
            required: true,
            message: 'Please input your areaRange!',
          },
        ]}
      >
        <Cascader value={region} dropdownMenuColumnStyle={{width: '300px'}} options={options} onChange={onChange} placeholder="Please select" />
      </Form.Item>

      <Form.Item label="关联公式" name="relatedFormula">
        <Select 
          mode="multiple"
          allowClear 
          value={relatedFormula}
          onChange={handleChange} options={selectOptions}>
        </Select>
      </Form.Item>

      <Form.Item label="发布状态" name="publicStatus"
        rules={[
          {
            required: true,
          }
        ]}
      >
        <Radio.Group onChange={onChange1} value={publicStatus}>
          <Radio value="1"> 未发布 </Radio>
          <Radio value="2"> 已发布 </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={() => saveTargetArea()}>
          保存
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default TargetArea;