import React, { useState, useCallback, useEffect } from "react";
import { Form, Input, Button, DatePicker, Space, InputNumber, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import moment from "moment";


function Home() {
  
  const [photograph, setPhoto] = useState("");
  const [error, setError] = useState({});
  const [form] = Form.useForm();

const onFinish = (values) => {
  const formData = {...values, dateOfBirth: moment(values.dateOfBirth).format(), photograph}
console.log(formData)
// const options = {
//   url: `http://localhost:5000/user/create`,
//   headers: {
//     "content-type": "application/json",
//     "cache-control": "no-cache",
//   },
//   method: "POST",
//   data: formData,
// };

// try {
//   const res = await axios.request(options);
//   console.log(res.data);
// } catch (error) {
//   console.log(error);
// }
}
const props = {
  onRemove: file => {
      const index = photograph.indexOf(file);
      const newFileList = photograph.slice();
      newFileList.splice(index, 1);
    setPhoto(newFileList)
  },
  beforeUpload: file => {
    setPhoto([...photograph, file])
    return false;
  },
  photograph,
};

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 center m-auto">
          {Object.keys(error).length !== 0 && (
            <div className="alert alert-primary">{error.message}</div>
          )}

<Form
      form={form}
      layout="vertical"
      // initialValues={{ requiredMark }}
      // onValuesChange={onRequiredTypeChange}
      initialValues={{ family: [""] }}
      onFinish={onFinish}
      requiredMark={false}
    >
       <Form.Item label="Full Name" name='name' rules={[{ required: true, message: 'Missing Name' }]}>
        <Input placeholder="John Doe" />
      </Form.Item>
      <Form.Item label="Email" name='email' rules={[{ required: true, message: 'not a valid email', type: 'email' }]}>
        <Input placeholder="test@example.com" />
      </Form.Item>
      <Space style={{ display: 'flex'}} align="start">

      <Form.Item label="Date of Birth" name='dateOfBirth'>
      <DatePicker  format={'DD/MM/YYYY'} />
      </Form.Item>
      <Form.Item
                    
                    name='age'
                    label='Age'
                    rules={[{ required: true, message: 'Missing age' }]}
                  >
                    <InputNumber placeholder="Age" />
                  </Form.Item>
                  </Space>
                  <Form.Item
                    
                    name='photograph'
                    label='Photograph'
                    rules={[{ required: true, message: 'Missing Photograph' }]}
                  >
      <Upload {...props}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
</Form.Item>

        <Form.List name="family">
       
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map(field => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item
                    {...field}
                    name={[field.name, 'name']}
                    fieldKey={[field.fieldKey, 'name']}
                    rules={[{ required: true, message: 'Missing name' }]}
                  >
                    <Input placeholder="Full Name" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'relationship']}
                    fieldKey={[field.fieldKey, 'relationship']}
                    rules={[{ required: true, message: 'Relationship' }]}
                  >
                    <Input placeholder="Relationship" />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    name={[field.name, 'age']}
                    fieldKey={[field.fieldKey, 'age']}
                    rules={[{ required: true, message: 'Missing age' }]}
                  >
                    <InputNumber placeholder="Age" />
                  </Form.Item>

                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Space>
              ))}
   
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> Add family
                </Button>
              </Form.Item>
            </div>
          );
        }}
      
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
      </Form>
        </div>
      </div>
    </div>
  );
}

export default Home;
