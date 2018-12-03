import React, { PureComponent, Fragment } from 'react';

import {
  Form,
  Input,
  Select,
  Modal,
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

//`新建` form
const CreateForm = Form.create()((props) => {
  const {
    modalVisible, form, handleAdd, handleModalVisible
  } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});



export default CreateForm;
